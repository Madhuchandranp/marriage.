
import { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { mycontext } from "../Relatives/Context";
import "../Relatives/css/Home.css";
import axios from "axios";
import Snavbar from "./Snavbar";

export default function Suser() {


    const { image } = useContext(mycontext);
    const [userData, setUserdata] = useState([])
    console.log("image", image);
   


    useEffect(() => {
    

    const getuser = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/marraige/Allusers")
            setUserdata(response.data)
        } catch (error) {
            console.log((error));
        }
    }
    console.log("img", userData);
    getuser()
    }, [])

    const confirmDelete = (id) => {
        if (
            window.confirm(
                `are yopu sure want to delete this image,"${id}"?`
            )
        ) {
            deleteUser(id);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5500/api/marraige/deleteUser/${id}`);
            getuser();
        } catch (error) {
            console.error("Error deleting product:", error);

        }
    }






    return (
        <div>
            <Snavbar />
           
                <div className="cards">
                    <h2>users</h2>
                    {userData.map((udata,index) => (
                        <div key={udata._id}>
                          
                          <p>
                            name:{udata.name}<br/>
                            email:{udata.email}
                            </p>
                            <button onClick={()=>confirmDelete(udata._id)}>delete</button>

                        </div>

                    ))}

                </div>
            </div>
    )
}