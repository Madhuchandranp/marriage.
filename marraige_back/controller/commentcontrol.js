

 const Comment = require("../module/commentschema");

 const postcomment = async (req, res) => {
  try {
    const { imageId,text,user } = req.body;
    console.log(req.body);
    const newComment= new Comment({ user,imageId,text });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    // Delete the comment document
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const postReply = async (req, res) => {
  try {
    const { parentCommentId, replyText } = req.body;
    // Find the parent comment and add a reply
    const parentComment = await Comment.findById(parentCommentId);
    parentComment.replies.push({ text: replyText });
    await parentComment.save();
    res.status(201).json(parentComment);
  } catch (error) {
    console.error('Error replying to comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getcomment= async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



module.exports={
       postcomment,
       postReply,
       deleteComment,
       getcomment,
    }



  