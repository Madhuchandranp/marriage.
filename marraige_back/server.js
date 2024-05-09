const express =require('express')
const bodyparser=require('body-parser')
const connectDB =require('./config/db')
const fileuploadRoute = require("./Routes/fileUpload");
const userRouter=require('./Routes/userroutes')
// const commentRouter=require('./Routes/commentroutes')

const cors = require('cors')


const PORT=5500

const app = express()

app.use(cors({
origin:"http://localhost:3000"

}))
app.use(express.static("./public"));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


connectDB()

// app.use("/api/uploadimage", fileuploadRoute);
app.use('/api/marraige',userRouter);



app.listen(PORT,()=>{
    console.log(`server is running on port,${PORT}`);
})