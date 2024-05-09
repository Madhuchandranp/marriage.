const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // images: [
    //     {
    //         imageId: {
    //             type: String,
    //             required:true
    //         },
    //         imageData: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ]
        image:[],

})

const User = mongoose.model("user", userSchema)

module.exports = User