const express = require("express");
//console.log("server creation");
const app=express();

app.get("/user",
    (req,res,next)=>{
       console.log("route handler1");
        //res.send("response1");
        next();
    },[
    (req,res,next)=>{
    console.log("route handler2");
      //res.send("response1")
      next();
    },
    (req,res)=>{
     console.log("route handler3");
     res.send("response5");
    }]
);


app.listen(3000 , () => {
    console.log("server is created successfully on port number 3000 ");
});