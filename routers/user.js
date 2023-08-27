const express = require("express");
const router = express.Router();
const userdb = require('../models/user');
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const keysecret = process.env.SECRET_KEY

//email config 
const transporter = nodemailer.createTransport({
    service: "gamil",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


// for user registration

router.post('/register', async (req, res) => {
    const { fname, email, password, cpassword } = req.body

    if (!fname || !email || !password || cpassword) {
        res.status(422).json({ error: "fill all the details" })
    }
    try {
        const preuser = await userdb.findOne({ email: email })
        if (preuser) {
            res.status(422).json({ error: "This Email Already register" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password not Match" })

        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword
            });
            //here password hashing
            const storeData = await finalUser.save();

            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(422).json(error)
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
                res.status(422).json({ error: "Invalid User" })
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
        res.status(201).json({ status: 201, validUserOne });
    } catch (error) {
        res.status(401).json({ status: 401, error });

    }
});

//user Logout
router.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        })
        res.clearCookie("usercookie", { path: "/" });

        req.rootUser.save();

        res.status(201).json({ status: 201 })
    }
    catch (error) {
        res.status(201).json({ status: 401, error })
    }
})

// send email Link For reset Password

router.post("/sendpasswordlink", async (req, res) => {

    const { email } = req.body;

    if (!email) {
        res.status(401).json({ status: 401, message: "Enter Your Email" })

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
                text: `This Link Valid For 5 MINUTES/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }
            transporte.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('error:->', error);
                    res.status(401).json({ status: 401, message: "email not send" })
                } else {
                    console.log("Email sent", info.resonse);
                    res.status(201).json({ status: 201, message: "Email Sent Successfully" })
                }
            })
        }
    }
    catch (error) {
        res.status(401).json({ status: 401, message: "Invalid user" });
    }
})