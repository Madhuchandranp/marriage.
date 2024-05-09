const User = require("../module/userschema")
const jwtSecretKey = 'nandhu013'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Relative = require("../module/relativeschema")
const Image = require("../module/imageschema")
const createUser = async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 10)
  try {
    await User.create({
      name: req.body.name,
      location: req.body.location,
      password: hashedPassword,
      email: req.body.email
    })
    await res.json({ success: true })
  } catch (error) {
    console.log(error);
    res.json({ success: false })
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const comparePwd = await bcrypt.compare(req.body.password, user.password)
      if (comparePwd) {
        const authToken = jwt.sign({ email: user.email },
          jwtSecretKey, { expiresIn: '1d' })
        res.json({ success: true, authToken, userId: user._id, user })
        console.log(authToken);
      } else {
        res.status(400).json({ error: "incorrect password !", success: false })
      }
    } else {
      res.status(404).json({ error: "user not found", success: false })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'an error occured' })
  }
};
const findAllRelative = async (req, res) => {
  try {
    const relative = await Relative.find();
    res.json(relative);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
// const addImage = async (req, res) => {
//   try {
//     const { userEmail } = req.body; // Get userEmail from request body
//     const { filename, path } = req.file;
//     await Image.create({ userEmail, image: filename, path }); // Include userEmail when creating the image record
//     res.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Image upload failed' });
//   }
// };
const addImage = async (req, res) => {
  try {
    const { userEmail } = req.body; // Get userEmail from request body
    const filename = req.file;
    

    console.log(userEmail,filename.filename);
    // await Image.create({ userEmail, image: filename, path }); // Include userEmail when creating the image record
    const user = await User.findOne({ email: userEmail })
    if (!user) {
      res.status(400).send("User Not found!")
    }
    user.image.push(filename.filename)
    await user.save()
    res.status(200).send({ user, message: "success" })

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Image upload failed' });
  }
};
//   try {
//     const {userEmail,image} = req.body;
//     console.log(req.body);
//     console.log(userEmail);

//     const photos = new Image({ userEmail,image });
//     await photos.save();
//     res.status(200).json(photos);
//   } catch (error) {
//     console.log(error);
//   }
// };
//   const getAllImage=async(req,res)=>{
//     try {
//         const image=await Image.find();
//         res.json(image)
//     } catch (error) {
//         res.status(500).json({ error: err.message });

//     }
//   };

const getAllImage = async (req, res) => {
  const userId = req.body.userId
  const imageId = req.body.imageId
  const userEmail = req.body.userEmail
  console.log("req", userEmail);
  try {
    const user = await User.findOne({ email: userEmail });

    console.log("get",req.body,user);
    if (!user) {
      return res.status(404).send("user not found")
    }
    const imageItem = user.image
    res.status(202).send({ success: true, imageItem });

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!")

  }

};
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received id:", id);
    await Image.findByIdAndDelete(id)
    res.json({ message: "image delete successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = {
  createUser,
  loginUser,
  findAllRelative,
  addImage,
  deleteImage,
  getAllImage,
}