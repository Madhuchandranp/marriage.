const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtSecretKey = "nandhu012";
const admin = require('../module/adminschema')
const Image =require('../module/imageschema')
const User =require( "../module/userschema");
const Relative = require("../module/relativeschema");

const createAdmin = async (req,res)=>{
    let hashedPassword = await bcrypt.hash(req.body.password,10);
try {
    const adm = new admin({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
      });
      await adm.save();
      res.send({ success: true,adm });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  };
  const loginAdmin = async (req, res) => {
    try {
      const adm = await admin.findOne({ email: req.body.email });
      if (adm) {
        const comparePwd = await bcrypt.compare(
          req.body.password,
          adm.password
        );
        if (comparePwd) {
          const authToken = jwt.sign({ email: adm.email }, jwtSecretKey, {
            expiresIn: "1d",
          });
          res.json({ success: true, authToken,adm, adminId: adm._id });
          console.log(authToken);
        } else {
          res.status(400).json({ error: "incorrrect password!", success: false });
        }
      } else {
        res.status(404).json({ error: "User not found", success: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "an error occured" });
    }
  };

  // const getAllImage=async(req,res)=>{
  //   try {
  //       const image=await Image.find();
  //       res.json(image)
  //   } catch (error) {
  //       res.status(500).json({ error: err.message });

  //   }
  // }

  //
  const deleteImage=async(req,res)=>{
    try {
        const {id}=req.params;
        console.log("Received id:",id);
     await Image.findByIdAndDelete(id)
        res.json({message:"image delete successfully"});
    } catch (err) {
        res.status(400).json({error:err.message});
    }
  };
  const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params;
        console.log("Received id:",id);
     await User.findByIdAndDelete(id)
        res.json({message:"image delete successfully"});
    } catch (err) {
        res.status(400).json({error:err.message});
    }
  };
  const deleteRelative=async(req,res)=>{
    try {
        const {id}=req.params;
        console.log("Received id:",id);
     await Relative.findByIdAndDelete(id)
        res.json({message:"image delete successfully"});
    } catch (err) {
        res.status(400).json({error:err.message});
    }
  };
  const findAllUsers= async (req, res) => {
    try {
      const user = await User.find();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  };
 
  const findAllRelative= async (req, res) => {
    try {
      const relative = await Relative.find();
      res.json(relative);
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports={
    createAdmin,
    loginAdmin,
    // addImage,
    deleteImage,
    deleteRelative,
    deleteUser,
    // getAllImage,
    findAllUsers,
    findAllRelative,
  }