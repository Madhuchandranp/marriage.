const mongoose=require('mongoose')

const commentSchema = new mongoose.Schema({
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
    text: String,
    replies: [
      {
        text: String
      }
    ],
    date: { type: Date, default: Date.now }

  });
  
  const Comment = mongoose.model('Comment', commentSchema);

  module.exports=Comment
  