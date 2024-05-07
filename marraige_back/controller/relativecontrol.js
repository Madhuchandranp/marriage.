const jwtSecretKey ='nandhu015'
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const Relative = require("../module/relativeschema")

const regrelative= async(req,res)=>{
    let hashedPassword=await bcrypt.hash(req.body.password,10)
    try {
        await Relative.create({
            author:req.body.name,
            location:req.body.location,
            password:hashedPassword,
            email:req.body.email
        })
        await res.json({success:true})
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
}

const loginrelative=async(req,res)=>{
    try {
        const  relative=await Relative.findOne({email:req.body.email})
    if (relative) {
        const comparePwd=await bcrypt.compare(req.body.password,relative.password)
    if(comparePwd){
        const authToken=jwt.sign({email:relative.email},
        jwtSecretKey,{expiresIn:'1d'})
res.json({success:true,authToken,relativeId:relative._id})
console.log(authToken);    
}else{
    res.status(400).json({error:"incorrect password !",success:false})
}
    }else{
        res.status(404).json({error:"user not found",success:false})
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:'an error occured'})
    }
};


module.exports={
    regrelative,
    loginrelative,
}


