const validator=require("validator");

const validateUserData=(req)=> {
    const {firstName,lastName,emailId,password,age,photoUrl,about}=req.body;
    if(firstName===null || lastName===null){
        throw new Error(" name is not valid");
    }
    if(!validator.isEmail(emailId)){
        throw new Error(" email is not valid");

    }
    if(!validator.isStrongPassword(password)){
        throw new Error(" Enter a strong password");
    }

};

module.exports={
    validateUserData,
}