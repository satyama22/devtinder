const express = require("express");
//console.log("server creation");
const app=express();

app.get("/user",(req,res)=>{
    console.log("user data accessed successfully");
    res.send({firstname:"akshaysaini",lastname:"kumar"});
})
app.post("/user",(req,res)=>{
    console.log(req.body);
    res.send("data saved successfully to database");
})
app.delete("/user",(req,res)=>{
    
    res.end("data deleted successfully");
})
app.delete("/test",(req,res)=>{
    console.log("deleted ");
    res.end("data deleted successfully");
})
app.use("/use" ,(req,res) => {
    res.send("hello everyone hii students");
})
app.listen(3000 , () => {
    console.log("server is created successfully on port number 3000 ");
});