const express = require("express");
//console.log("server creation");
const app=express();
const connectDB = require("./config/database");
const User= require("./models/user.js");
const { model } = require("mongoose");
app.use(express.json());
app.post("/signup",async (req,res)=>{

    const user = new User(req.body);
    
 try{
    await user.save();
    res.send("data added successfully");
   }catch(err){
    res.status(400).send("some error occured"+err.message);
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