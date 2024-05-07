



import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { mycontext } from "../Relatives/Context";
import "../Relatives/css/Home.css";
import axios from "axios";
import Snavbar from "./Snavbar";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CommentForm from '../Relatives/CommentForm';

export default function Shome() {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const { image ,currentUser} = useContext(mycontext);
    const [imgData, setImgData] = useState([])
    console.log("image", image);
    const [imageUrl,] = useState(`http://localhost:5500/uploads`);
    // const [reverse, setReverse] = useState(false)    
    const [comments, setComments] = useState([]);
    const [activeCard, setActiveCard] = useState(null); // State to track the active card




    useEffect(() => {
        getImages()
    }, [])

    const getImages = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/marraige/image/get")
            setImgData(response.data)
        } catch (error) {
            console.log((error));
        }
    }
    console.log("img", imgData);

    const fetchComments = async () => {
        try {
            const response = await axios.get('http://localhost:5500/api/marraige/getcomment');

            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }
    console.log(comments);
    const confirmDelete = (id) => {
        if (
            window.confirm(
                `are yopu sure want to delete this image,"${id}"?`
            )
        ) {
            deleteImage(id);
        }
    };

    const deleteImage = async (id) => {
        try {
            await axios.delete(`http://localhost:5500/api/marraige/image/delete/${id}`);
            getImages();
        } catch (error) {
            console.error("Error deleting product:", error);

        }
    }


    const handleSetActive = async (index) => {
        await fetchComments();
        setActiveCard(index === activeCard ? null : index); // Toggle active card
    };


    const handleReply = async (parentid, replyText) => {
        try {
            await axios.post('http://localhost:5500/api/marraige/postreply', { parentid, replyText });
        } catch (error) {
            console.error('Error replying to comment:', error);
        }
    };
    const commentData = imgData.map((img, index) => comments.filter(comment => comment.imageId === img._id
        // && comment.user === currentUser
    ))
    console.log("imgData", imgData);

    console.log("commentD", commentData);

    return (
        <div>
            <Snavbar />
            <div className="upload">
                <div className="mainimg">
                    <img src="https://images.pexels.com/photos/18881689/pexels-photo-18881689/free-photo-of-bride-and-groom-during-traditional-weeding-ceremony.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style={{ height: "17cm", width: "37cm" }} alt="img" />

                    <div className="mainhome"
                        style={{ position: "absolute", zIndex: "2", top: "250px", left: "22%", color: "wheat" }} >
                        <h1 style={{ font: "bold", fontSize: "80px " }}>Best 𝐌oments in Life</h1>
                    </div>

                </div>
                {/* <FileUploadForm/> */}


                <div className="cards">
                    {imgData.map((img,index) => (
                        <div key={img}>
                            {/* <Card className="adl_img" style={{ width: "19rem", height: "16rem", }}>

                                <Card.Text style={{ position: "absolute", zIndex: 2, color: "white", marginLeft: "12%", fontSize: "35px", marginTop: "10%", }} />
                                <Card.Img style={{ filter: 'brightness(0.8)', height: "25rem", }} variant="top"
                                    src={`${imageUrl}/${img.image}`} alt={img} /> */}
                            {/* </Card> */}

                            <Card className="adl_img" style={{ width: "17rem", height: "20rem", backgroundColor: "#FAFAFA" }}>

                                <Card.Text style={{ position: "absolute", zIndex: 2, marginLeft: "12%", fontSize: "35px", marginTop: "10%", borderColor: 'black' }} />
                                <Card.Img style={{ filter: 'brightness(0.8)', height: "25rem" }} variant="top"
                                    src={`${imageUrl}/${img.image}`} alt={img} />

                                <div className="dele" style={{ width: "100%", display: "flex", justifyContent: "space-around", alignItems: "center" }}>

                                    <Checkbox size="50px" style={{ fontSize: "30px", color: "gray" }} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: "red" }} />} />
                                    <Button className='chat' style={{ position: "absolute", zIndex: 2, }} onClick={() => { fetchComments(); handleSetActive(index); }}><ChatBubbleOutlineIcon /></Button>

                                    <NavDropdown title={<MoreVertIcon />} >
                                        <NavDropdown.Item className='bg-light' style={{}} onClick={() => confirmDelete(img._id)} >Delete</NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                                <div>
                                    {/* {activeCard === index && <CommentForm postComment={(text) => postComment(img._id, text, currentUser)} />} */}
                                    {activeCard === index && <CommentForm postComment={img} />}

                                </div>
                                <div>
                                    <ul style={{ display: "flex", flexDirection: "column", gap: "2px", textAlign: "left", width: "18.5rem", height: "auto", maxHeight: "150px", paddingLeft: "5px", overflowY: "scroll" }}>

                                        {comments.filter(comment => comment.imageId === img._id && comment.user === currentUser)
                                            .map(comment => (
                                                <div style={{ backgroundColor: "#EEEEEE", borderRadius: "4px" }} key={comment._id}>{comment.text}
                                                    <div style={{ display: "flex", left: "5px", top: "2px" }}>
                                                        <Button style={{ fontSize: "10px", color: "black" }} onClick={() => handleReply(comment._id, 'Your reply text')}>Reply</Button>
                                                        {/* <Button style={{ fontSize: "10px", color: "black" }} onClick={() => handleDelete(comment._id)}>Delete</Button> */}
                                                    </div>
                                                </div>
                                            ))}
                                        {/* {img.comments.map(comment => (
      <li key={comment._id}>{comment.text}</li>
    ))} */}
                                    </ul>
                                </div>
                                <div className="favo">
                                </div>
                            </Card>
                            {/* <button class="btn " style={{ height: "2rem", marginLeft: "3px" }} onClick={() => confirmDelete(img._id)}>Delete </button> */}

                        </div>

                    ))}

                </div>
            </div>
        </div>
    )
}