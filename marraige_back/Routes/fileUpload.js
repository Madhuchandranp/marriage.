const express = require('express');
const router = express.Router();
const uploadImage=require('../config/multerConfig.js')
const Image =require('../module/imageschema')

router.post('/', uploadImage, async (req, res) => {
  const userEmail=req.body

  console.log();
  if (req.file) {
    // Save file information to the database
    const image = new Image({ image: req.file.filename });
    await image.save();

    return res.status(200).json({
      success: true,
      message: 'Image uploaded!',
    });
  }

  return res.status(400).json({
    success: false,
    error: 'Image upload failed!',
  });
});

module.exports = router;
