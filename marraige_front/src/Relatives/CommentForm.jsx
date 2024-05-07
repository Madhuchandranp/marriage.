// // Frontend (React.js)
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useEffect } from 'react';
// import SendIcon from '@mui/icons-material/Send';
// import Button from '@mui/material/Button';
// function CommentForm() {
//   const [text, setText] = useState('');
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get('http://localhost:5500/api/marraige/getcomment');
//         setComments(response.data);
//         alert(`Image uploaded successfully!`)
//       } catch (error) {
//         console.error('Error fetching comments:', error);

//       }
//     };

//     fetchComments();
//   }, []);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5500/api/marraige/postcomment', { text });
//       setText('');
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   return (
//     <div>
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Enter your comment..."
//       />
//       <Button type="submit"><SendIcon/></Button>
//     </form>
//     <h2>Comments</h2>
//     <ul>
//       {comments.map(comment => (
//         <li key={comment._id}>{comment.text}</li>
//       ))}
//     </ul>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

function CommentForm({postComment}) {
  console.log("imgid",postComment._id);
  const imageId=postComment._id
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/api/marraige/getcomment/${imageId}`);
        setComments(response.data);
      } catch (error) {

        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [imageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5500/api/marraige/postcomment', { imageId, text });
      setText('');
      // Refresh comments after posting
      // fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
    alert('comment added successfully!');

  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/api/marraige/deletecomment/${id}`);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleReply = async (parentid, replyText) => {
    try {
      await axios.post('http://localhost:5500/api/marraige/postreply', { parentid, replyText });
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your comment..."/>
          <Button type="submit"><SendIcon/></Button>
      
      </form>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>{comment.text}
           <Button onClick={() => handleDelete(comment._id)}>Delete</Button>
            <Button onClick={() => handleReply(comment._id, 'Your reply text')}>Reply</Button>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentForm;
