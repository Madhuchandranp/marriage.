const jwt =require ('jsonwebtoken');
const jwtSecretKey = "nandhu012";

 const Adminmidleware=async(req,res,next)=>{
    const authToken=req.headers.authorization;

    if(authToken){
        return res.status(401).json({success:false,message:"unauthorized"});
    }
    try {
        const Token=authToken.split('')(1);
        const decoded=jwt.verify(Token,jwtSecretKey);
        req.admin=decoded.admin;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({success:false,message:'invalid token'});

    }
 };

 module.exports=Adminmidleware