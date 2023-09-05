const express = require("express");
const router = express.Router();
const userdb = require('../models/user');
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const keysecret = process.env.SECRET_KEY

//email config 
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


// for user registration

router.post('/register', async (req, res) => {
    const { fname, email, password, cpassword } = req.body

    if (!fname || !email || !password || !cpassword) {
        return res.status(422).json({ error: "fill all the details" })
    }
    try {
        const preuser = await userdb.findOne({ email: email })
        if (preuser) {
            return res.status(422).json({ error: "This Email Already register" })
        } else if (password !== cpassword) {
            return res.status(422).json({ error: "Password and Confirm Password not Match" })

        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword
            });
            //here password hashing
            const storeData = await finalUser.save();

            return res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        return res.status(422).json(error)
        console.log("catch block error");


    }
})

//user Login
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "Fill all the details " })
    }
    try {
        const userValid = await userdb.findOne({ email: email })

        if (userValid) {
            const isMatch = await bcrypt.compare(password, userValid.password)
            if (!isMatch) {
                return res.status(422).json({ error: "Invalid User" })
            } else {

                //togen genrate
                const token = await userValid.generateAuthtoken();

                //cookiegenerate
                res.cookie("usercookie", token, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true
                });
                const result = {
                    userValid,
                    token
                }
                res.status(201).json({ status: 201, result })
            }
        } else {
            res.status(401).json({ status: 401, message: "Invalid details" });
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
})

//user  valid 
router.get("/valiuser", authenticate, async (req, res) => {
    try {
        const validUserOne = await userdb.findOne({ _id: req.userId });
        return res.status(201).json({ status: 201, validUserOne });
    } catch (error) {
        return res.status(401).json({ status: 401, error });

    }
});

//user Logout
router.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        })
        await req.rootUser.save();

        res.clearCookie("usercookie", { path: "/" });



        return res.status(201).json({ status: 201 })
    }
    catch (error) {
        return res.status(201).json({ status: 401, error })
    }
})

// send email Link For reset Password

router.post("/sendpasswordlink", async (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.status(401).json({ status: 401, message: "Enter Your Email" })

    }
    try {
        const userfind = await userdb.findOne({ email: email });

        //token generate for reset password
        const token = jwt.sign({ _id: userfind._id }, keysecret, {
            expiresIn: "300s"
        })

        //token generate for reset password
        const setusertoken = await userdb.findByIdAndUpdate({ _id: userfind._id }, { verifytoken: token }, { new: true });
        if (setusertoken) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Sending Email For Password Reset",
                text: `This Link Valid For 5 MINUTES https://everyday-finance-solution-crm-frontend-h0iz.onrender.com/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('error:->', error);
                    return res
                        .status(401)
                        .json({ status: 401, message: "email not send" })
                } else {
                    console.log("Email sent", info.response);
                    return res
                        .status(201)
                        .json({ status: 201, message: "Email Sent Successfully" })
                }
            })
        }
    }
    catch (error) {
        return res.status(401).json({ status: 401, message: "Invalid user" });
    }
});
//Send Registration link
router.post("/registerationlink", async (req, res) => {
    const { email } = req.body;

    //Create email data
    const mailOptions = {
        from: process.env.Email,
        to: email,
        subject: 'Your Registration Link from EveyDay Finance Solution to access admin page',
        text: `Use this link to Registration: https://everyday-finance-solution-crm-frontend-h0iz.onrender.com/register please dont share this link`

    }
    try {
        //Send the email
        await transporter.sendMail(mailOptions);
        console.log('Resigtration email sent Successfully');
        res.status(200).json({ message: 'Registration Link sent success fully' })

    } catch (error) {
        console.error(`Error sending registration email:${error}`);
        res.status(500).json(error)
    }

})
//verify user for forgot password time

router.get('/forgotpassword/:id/:token', async (req, res) => {
    const { id, token } = req.params;

    try {
        const validuser = await userdb.findOne({ _id: id, verifytoken: token });

        const verifyToken = jwt.verify(token, keysecret);

        console.log(verifyToken);

        if (validuser && verifyToken._id) {
            return res
                .status(201)
                .json({ status: 201, validuser })
        } else {
            return res
                .status(401)
                .json({ status: 401, message: "user not exist" })
        }
    }
    catch (error) {
        return res
            .status(401)
            .json({ status: 401, error })
    }
});

// change password

router.post("/:id/:token", async (req, res) => {
    const { id, token } = req.params;

    const { password } = req.body;

    try {
        const validuser = await userdb.findOne({ _id: id, verifytoken: token });

        const verifyToken = jwt.verify(token, keysecret);

        if (validuser && verifyToken._id) {
            const newpassword = await bcrypt.hash(password, 12);

            const setnewuserpass = await userdb.findByIdAndUpdate({ _id: id }, { password: newpassword })

            setnewuserpass.save();
            return res
                .status(201)
                .json({ status: 201, setnewuserpass })
        } else {

            return res
                .status(401)
                .json({ status: 401, message: "user not exist" })
        }
    }
    catch (error) {
        return res
            .status(401)
            .json({ status: 401, error })
    }
})

module.exports = router;