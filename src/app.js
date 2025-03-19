const express = require("express");
//console.log("server creation");
const app=express();
app.use( "/hello",(req,res) => {
    res.send("hello helllloooooo");
})
app.use( "/test",(req,res) => {
    res.send("hello im test");
})
app.use( (req,res) => {
    res.send("hello everyone hii students");
})
app.listen(3000 , () => {
    console.log("server is created succesfully on port number 3000 ");
});