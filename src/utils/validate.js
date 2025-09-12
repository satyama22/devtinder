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

const validateEditData=(body)=>{
    if (!body || typeof body !== 'object') {
        throw new Error("Request body must be a valid JSON object.");
      }
    const allowedEditFields=["firstName","lastName","age","gender","about","skills","photoUrl","password"];

    const isEditAllowed=Object.keys(
        body).every((field)=>allowedEditFields.includes(field)
    );
    return isEditAllowed;

}



module.exports={
    validateUserData,
    validateEditData,
}