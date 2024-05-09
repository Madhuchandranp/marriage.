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
    const { index } = req.params;

    const userEmail = req.body.userEmail;

    const user = await User.findOne({ email: userEmail });
    const deleteData=user.image[parseInt(index)]
    console.log("Received index:", typeof(index),deleteData);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (index < 0 || index >= user.image.length) {
      return res.status(400).json({ error: "Invalid image index" });
    }
    // Remove the image from the user's image array using splice

    user.image.splice(index, 1);
    await user.save();

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//     const image = await Image.findOne({ img_id: id, userEmail: email });
//     if (!image) {
//       return res.status(404).json({ error: "Image not found or does not belong to the user" });
//     }
//     await Image.findByIdAndDelete(id)
//     res.json({ message: "image delete successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
module.exports = {
  createUser,
  loginUser,
  findAllRelative,
  addImage,
  deleteImage,
  getAllImage,
}