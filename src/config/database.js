const mongoose = require("mongoose");

const connectDB = async()=>{
      await mongoose.connect("mongodb://localhost:27017/devtinder",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      });
      console.log("mongodb connected successfully");
    };


module.exports =connectDB;