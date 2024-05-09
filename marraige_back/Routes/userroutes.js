const express=require('express')
const router=express.Router()
const usercontrol=require('../controller/usercontrol')
const admincontrol=require('../controller/admincontrol')
const uploadImage=require('../config/multerConfig')
const emailController=require("../controller/mailcontrol")
const commentcontroller=require("../controller/commentcontrol")
const Relativecontroller = require('../controller/relativecontrol')

router.post('/create',usercontrol.createUser);
router.post('/login',usercontrol.loginUser);

router.post('/admin/create',admincontrol.createAdmin);
router.post('/admin/login',admincontrol.loginAdmin);

router.post('/relative/create',Relativecontroller.regrelative);
router.post('/relative/login',Relativecontroller.loginrelative);

// router.get('/image/get',uploadImage,admincontrol.getAllImage);
// router.post('/image/add',uploadImage,admincontrol.addImage);
router.post('/image/add',uploadImage,usercontrol.addImage);
router.post('/image/get',usercontrol.getAllImage);

// router.delete('/image/delete/:id',admincontrol.deleteImage);
router.delete('/image/delete/:index',usercontrol.deleteImage);

router.get('/Allusers',admincontrol.findAllUsers);
router.get('/deleteUser/:id',admincontrol.deleteUser);
router.get('/deleteRelative/:id',admincontrol.deleteRelative);

router.post("/user/sendmail",emailController.postEmail)



router.post("/postcomment",commentcontroller.postcomment);
router.get("/getcomment",commentcontroller.getcomment);
router.post("/postreply",commentcontroller.postReply);
router.get("/deletecomment/:id",commentcontroller.deleteComment);

module.exports=router