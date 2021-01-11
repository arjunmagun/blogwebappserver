require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cookieParser = require('cookie-parser');
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");
const Blog = require("./models/blogs");
const User = require("./models/user");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: "https://naughty-colden-9776b0.netlify.app/",
    credentials: true
}));

app.use(cookieParser(process.env.SECRET_KEY));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DATABASEURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>console.log("Database is connected"));

require('./Config/passportConfig')(passport);

app.get("/userData", (req, res)=>{
    if(!req.user){
        res.send("Nothing")
    } else{
        res.send(req.user)
    }
})
app.use("/", indexRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res)=> {
    res.send("hello to BlogAPP Api");
})


app.listen(process.env.PORT || 5000, ()=> {
    console.log("server has started");
});