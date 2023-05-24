const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('./../db/conn');
const User = require('./../model/UserSchema');

router.post('/register', (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        res.status(422).json({ "message": "All fields are required" })
    } else {
        User.findOne({ email }).then((userExist) => {

            if (!userExist) {
                const user = new User({ name, email, phone, work, password, cpassword })
                user.save().then(() => {
                    return res.status(200).json({ "message": "success" })
                }).catch((err) => {
                    return res.status(400).json({ "message": "database error" })
                })
            } else {
                return res.status(400).json({ "message": "already exist" })
            }
        })
    }
})

// loginroute

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(500).json({ "message": "please enter your email and password" })
    } else {
        const findUser = await User.findOne({ email });
        if (!findUser) {
            res.status(500).json({ "message": "please enter valid email address" })
        } else {
            const compare = await bcrypt.compare(password, findUser.password);
            if (compare) {
                res.status(200).json({ "message": "user log in successfully" });
            } else {
                res.status(500).json({ "message": "please enter valid email and password" });
            }
        }
    }

})



module.exports = router;