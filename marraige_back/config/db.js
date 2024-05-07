


const mongoose = require("mongoose")

const connectDB=async()=>{
    try{
        const dbURI = 'mongodb+srv://multer123:multer123@cluster0.ycvopqn.mongodb.net/multersample?retryWrites=true&w=majority';
        await mongoose.connect('mongodb://127.0.0.1:27017/marraige')

        .then(()=>{
        console.log('DB connected')
    });
    }catch(console){
        console.log('DB connnection error')
        process.exit(1); // Exit with failure

    }
};

module.exports=connectDB