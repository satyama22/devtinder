const adminAuth =(req,res,next)=>{
    console.log("admin authorization is getting checked");
    const token="xyz";
    const isAdminAuthorized = token==="xyz";
    if (!isAdminAuthorized){
        res.status(401).send("unAuthorized admin");
    }else{
        next();
    }
}

const userAuth =(req,res,next)=>{
    console.log("user authorization is getting checked");
    const token="xyz";
    const isUserAuthorized = token==="xyz";
    if (!isUserAuthorized){
        res.status(401).send("unAuthorized user");
    }else{
        next();
    }
}
module.exports={
    adminAuth,
    userAuth
}