// import { Box, Button, FormControl, FormLabel, Input, useColorScheme } from "@mui/material";
// import { useState } from "react";
// import { json } from "react-router-dom";


// export default function Mailsend() {

//     const [email, setEmail] = useState("");
//     const [subject, setSubject] = useState("");
//     const [message, setMessage] = useState("");

//     const baseUrl = "http://localhost:1000";

//     const sendEmail = async () => {
//         let dataSend = {
//             email: email,
//             subject: subject,
//             message: message,
//         };

//         const res = await fetch(`${baseUrl}/email/sendEmail`, {
//             method: "POST",
//             body: json.stringify(dataSend),
//             header: {
//                 Accept: "application/json",
//                 "Contact-type": "application/json",
//             },
//         })
//             .then((res) => {
//                 console.log(res);
//                 if (res.status > 199 && res.status < 300) {
//                     alert("send successfully !");
//                 }
//             });
//     };
//     return (
//         <div>
//             <div minH={"100vh"} align={"center"} justify={"center"} >
//                 <div spacing={8} mx={"auto"} maxw={"lg"} py={12} px={6}>
//                     <div align={"center"}>
//                         <h1 fontSize={"4"}>Invitation form </h1>
//                         <h2 fontSize={"lg"} color={"gray.600"}>welcome </h2>
//                     </div>
//                     <Box rounded={"lg"} bg={("white", "gray.700")}
//                         boxShadow={"lg"} p={8}>

//                         <div className="box" spacing={4}>
//                             <FormControl id="email">
//                                 <FormLabel>Email address</FormLabel>
//                                 <Input type="email"
//                                     placeholder="email address"
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </FormControl>
//                             <FormControl id="email">
//                                 <FormLabel>Subject</FormLabel>
//                                 <Input
//                                     type="text"
//                                     placeholder="enter the message"
//                                     onChange={(e) => setSubject(e.target.value)}
//                                 />
//                             </FormControl>
//                             <FormControl id="text">
//                                 <FormLabel>Message</FormLabel>
//                                 <Input
//                                     type="text"
//                                     placeholder="text the  message"
//                                     onChange={(e) => setMessage(e.target.value)}
//                                 />
//                             </FormControl>

//                             <div spacing={10}>
//                                 <Button bg={"blue.400"} color={"white"} _hover={{ bg: "blue.500", }}
//                                     onClick={() => sendEmail()}>Invitation Send</Button>
//                             </div>
//                         </div>
//                     </Box>
//                 </div>
//             </div>
//         </div>
//     )
// }

import React, { useState } from 'react';
import axios from 'axios';

const Mailsend = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5500/api/marraige/user/sendmail`,  {recipientEmail} );
      setMessage('Invitation email sent successfully');
    } catch (error) {
      console.error('Error sending invitation email: ', error);
      setMessage('Failed to send invitation email');
    }
  };

  return (
    <div>
      <h2>Send Invitation</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email Address:</label>
        <input
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          required
        />
        <button type="submit">Send Invitation</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Mailsend;
