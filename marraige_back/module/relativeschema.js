const mongoose=require('mongoose')

const relativeschema=new mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
     },  
    password:{
        type:String,
        required:true
     },
})

const Relative=mongoose.model("relative",relativeschema)

module.exports=Relative


// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const Joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");

// const relativeSchema = new mongoose.Schema({
// 	firstName: { type: String, required: true },
// 	lastName: { type: String, required: true },
// 	email: { type: String, required: true },
// 	password: { type: String, required: true },
// 	verified: { type: Boolean, default: false },
// });

// relativeSchema.methods.generateAuthToken = function () {
// 	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
// 		expiresIn: "7d",
// 	});
// 	return token;
// };

// const Relative = mongoose.model("relative", relativeSchema);

// const validate = (data) => {
// 	const schema = Joi.object({
// 		firstName: Joi.string().required().label("First Name"),
// 		lastName: Joi.string().required().label("Last Name"),
// 		email: Joi.string().email().required().label("Email"),
// 		password: passwordComplexity().required().label("Password"),
// 	});
// 	return schema.validate(data);
// };

// module.exports = { Relative, validate };