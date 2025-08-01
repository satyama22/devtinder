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

app.post("/signup",async (req,res)=>{
    try{
     //validate the user
       validateUserData(req);

       const { firstName,lastName,password,emailId }=req.body;
     //encryption of password
             const passwordHash= await bcrypt.hash(password,10)
    //creating a user instance

    const user = new User({firstName,lastName,password:passwordHash,emailId});
    
 
    await user.save();
    res.send("data added successfully");
   }catch(err){
    res.status(400).send("ERROR: "+err.message);
   }

})
app.post("/login",async(req,res)=>{
  try{
        const {emailId,password}=req.body;
        const user=await User.findOne( {emailId : emailId});
        if(!user){
           throw new Error("invalid credentials");
        }
        const isValidPassword =await bcrypt.compare(password, user.password);
        if(isValidPassword){

            //creating jwt token
            const token = await jwt.sign({_id: user._id},"Devtinder@123",{expiresIn:"1d"});
            //console.log(token);
            //
            res.cookie("token",token,{ maxAge: 900000 });
            res.send("login was successful");
        }else{
            throw new Error("invalid credentials");
        }
    }catch(err){
    res.status(404).send("ERROR: "+err.message);
   }
})
app.get("/user",async(req,res)=>{
    const userName=req.body.firstName;
    try{ 
        const users=await User.findOne({firstName:userName});
        if(users.length===0){
            console.log("user not found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(404).send("something went wrong"+err.message);
    }
   
})

app.get("/profile",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.send(user);
      }catch(err){
        res.status(404).send("something went wrong"+err.message);
    }
});
     
app.post("/sendConnectionRequest",userAuth,async(req,res)=>{

    const user=req.user;
    console.log("sending connection request ");
    res.send("connection request sent by "+user.firstName);
})


connectDB().then(()=>{
    console.log("database connection established");
     app.listen(3000 , () => {
         console.log("server is created successfully on port number 3000 ");
     });
}).catch((err)=>{
    console.log("database connection couldnt established");
})