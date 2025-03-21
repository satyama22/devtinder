const express = require("express");
//console.log("server creation");
const app=express();
const { adminAuth, userAuth}=require("./middlewares/auth.js")

app.use("/admin",adminAuth)
app.get("/user/data",userAuth,(req,res)=>{
    res.send("data sent");
})
app.post("/user/loginData",(req,res)=>{
    res.send("user log in successful");
})
app.get("/admin/getAllDAta",(req,res)=>{
    res.send("all data is requested");
})
app.get("/admin/deleteAllDAta",(req,res)=>{
    res.send("all data is deleted");
})
app.listen(3000 , () => {
    console.log("server is created successfully on port number 3000 ");
});