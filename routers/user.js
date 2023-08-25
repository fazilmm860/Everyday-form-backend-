const express = require("express");
const { User, validate } = require('../models/user')
const bcrypt = require('bcrypt');


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message })

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with given email already exist" })

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await new User({

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword,
        })
        newUser.save();


        res.status(201).send({ message: "User Created" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
        console.log(error);
    }
})

module.exports = router;



