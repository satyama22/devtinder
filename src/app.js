const express = require("express");
//console.log("server creation");
const app=express();
const connectDB = require("./config/database");
const User= require("./models/user.js");
const { model } = require("mongoose");
const {validateUserData} = require("./utils/validate.js");
app.use(express.json());
const bcrypt = require("bcrypt");
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
app.get("/feed",async (req,res)=>{
    try{ 
        const users=await User.find({});
        if(users.length===0){
            console.log("user not found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(404).send("something went wrong"+err.message);
    }
})

app.delete("/delete",async(req,res)=>{
        const userId=req.body.userId;
        try{
            //const user= await User.findByIdAndDelete(userId);
            const user= await User.findByIdAndDelete({_id:userId});
            res.send("user deleted successfully");
        }catch(err){
            res.status(404).send("somethng went wrong"+err.message);
        }
})

app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body

    try{
        const ALLOWED_UPDATES=["age","gender","about","photoUrl","userId","skills"];
        const isUpdateAllowed=Object.keys(data).every((k)=>
             ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed){
            throw new Error("update is not allowed");
        }
        if(data?.skills.length > 10){
            throw new Error("more than 10 skills are not allowed")
        }
        const user=await User.findByIdAndUpdate({_id:userId},data,
            {returnDocument:"before",
             runValidators:true,
            });
        res.send("user updated successfully");
        console.log(data);
    }catch(err){
        res.status(404).send("something wrong"+err.message);
    }
})
connectDB().then(()=>{
    console.log("database connection established");

     app.listen(3000 , () => {
         console.log("server is created successfully on port number 3000 ");
     });
}).catch((err)=>{
    console.log("database connection couldnt established");
})