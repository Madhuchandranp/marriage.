import React  from "react";
// import { mycontext } from "./context";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function Flogin(){
    
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const navigate=useNavigate()

    axios.default.withCredential=true;
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:5500/api/marraige/auth",
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

                navigate("/Rhome")
            }
            if(!res.data.success){
                alert("Enter valiod credential...!")
            }
        }).catch(err=>console.log(err))
    }   
    

    return(
     <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25"></div>
        <div className=" p-2 rounded w-15"> 
  <div>
           <div>
           <h2>Login</h2>

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
            <p>not registered..? please<Link to="/Fsignup"
            style={{textDecoration:"none",fontWeight:'bold',color:'black'}}>signup</Link>  </p>
            </div>
        </div></div>
        </div>      
    )
}

