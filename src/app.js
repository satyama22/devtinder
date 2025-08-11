const express = require("express");
//console.log("server creation");
const app=express();

const connectDB = require("./config/database");
const User= require("./models/user.js");
const { model } = require("mongoose");
const {validateUserData} = require("./utils/validate.js");
const bcrypt = require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth.js");

app.use(express.json());
app.use(cookieParser());






     



connectDB().then(()=>{
    console.log("database connection established");
     app.listen(3000 , () => {
         console.log("server is created successfully on port number 3000 ");
     });
}).catch((err)=>{
    console.log("database connection couldnt established");
})