const express = require("express");
//console.log("server creation");
const app=express();
const connectDB = require("./config/database");
const User= require("./models/user.js");
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



connectDB().then(()=>{
    console.log("database connection established");

     app.listen(3000 , () => {
         console.log("server is created successfully on port number 3000 ");
     });
}).catch((err)=>{
    console.log("database connection couldnt established");
})