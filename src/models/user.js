const mongoose =require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minlength:2,
        maxlength:15,
        trim:true,
    },
    lastName:{
        type:String,
        minlength:2,
        maxlength:15,
        trim:true,
    },
    age:{
        type:Number,
        min:18,
        max:60,
    },
    gender:{
        type:String,
        validate:function(value){
            if(!["male","female","other"].includes(value)){
                throw new error("invalid gender"+err.message);
            }
        }
    },
    emailId:{
        type:String,
        required: true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
               if(!validator.isEmail(value)){
                throw new Error("invalid email address"+err.message);
               }
        }

    },
    password:{
        type:String,
        minlength:7,
        maxlength:100,
        validate(value){
            if(!validator.isStrongPassword(value)){
             throw new Error("invalid email address"+err.message);
            }
     }
    },
    skills:{
        type:[String],
        default:[],
    },
    about:{
        type:String,
        default:"this about is given by default by devTinder",
        minlength:20,
        maxlength:60,
    },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
             throw new Error("invalid photourl"+err.message);
            }
     }
    }
    },
    {
        timestamps:true,
    }
);

 userSchema.methods.getJWT=async function(){
    const user=this;

    const token=await jwt.sign({_id:this._id},"Devtinder@123",{expiresIn:"1d"});
    return token;
}

userSchema.methods.validatePassword=async function(passwordByUser){
    const user=this;
    const passwordHash=user.password;

    const isPasswordValid= await bcrypt.compare(
        passwordByUser,passwordHash
    )
    return isPasswordValid;
}



const User = new mongoose.model("User",userSchema);
module.exports=User;