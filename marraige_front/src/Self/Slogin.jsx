import React, { useState } from 'react'
// import { Col, Form, Row } from "react-bootstrap"
import {Col,Row,Form} from"react-bootstrap"
import { Button, formControlClasses } from "@mui/material"
import axios from "axios"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox'
import { useNavigate,Link } from 'react-router-dom';

export default function Slogin() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowpassword] = useState(false)
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const navigate=useNavigate()

    
    axios.default.withCredential=true;
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:5500/api/marraige/admin/login",
        {email,password})
        .then(res=>{
            console.log("login:"+JSON.stringify(res.data))
            if(res.data.success){
                console.log("resdata","res.data");
                localStorage.setItem("authToken",res.data.authToken)
                localStorage.setItem("userEmail",email)
                localStorage.setItem("userId",res.data.userId)

                console.log("authToken",localStorage.getItem("authToken"))
                console.log("res",res.data.userId);

                navigate("/Spanel")
            }
            if(!res.data.success){
                alert("Enter valiod credential...!")
            }
        }).catch(err=>console.log(err))
    }   
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-60" >
    <div className=" p-2 rounded w-15"> 

                <div>
           <div>
           <h2>Admin Login</h2>

           <form onSubmit={handleSubmit}>

           <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong> 
               </label> 
            <input
            type="email"
            placeholder="Enter email"
            autoComplete="on"
            name="email"
            className="form-control rounted-0"
            onChange={(e)=>setEmail(e.target.value)}
            />
            </div>
            <div className="mb-3">
                <label htmlFor="email">
                    <strong>password</strong>
                </label>
                <input
                type="password"
                placeholder="Enter password"
                name="password"
                className="form-control rounted-0"
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>

            <button type="submit">
                login
            </button>
            </form>
 </div>
</div>
            </div>
        </div>
    )
}