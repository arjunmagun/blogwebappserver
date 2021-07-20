const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const bcrypt = require('bcryptjs');

router.get("/logged", (req, res) => {
    if (!req.user) {
        res.status(404).send("no user logged in");
    } else {
        res.status(200).send(req.user);
    }
})

router.post("/register", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ username: username, email: email }, async (err, user) => {
        if (err) throw err;
        if (user) res.status(404).send("User already Exist");
        else {
            const hashedPassword = await bcrypt.hash(password, 12);
            const newuser = new User({
                username: username,
                email: email,
                password: hashedPassword,
                profileImgUri: profileImgUri
            })
            newuser.save();
            res.send("User Registered")
        }
    })
});

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, result) => {
        if (err) throw err;
        if (!user) res.status(409).send("No user exists")
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send({
                    username: req.user.username,
                    email: req.user.email,
                    id: req.user._id
                })
            })
        }
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout();
    res.send("user logged out " + req.user)
})

module.exports = router;