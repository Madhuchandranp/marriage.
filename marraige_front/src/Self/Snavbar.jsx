import { Link } from "react-router-dom";
import "../Self/css/Snavbar.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { mycontext } from "../Relatives/Context";
export default function Snavbar() {
  const nav = useNavigate();
  const { setLogUser } = useContext(mycontext);
 
  
  function logout() {
    setLogUser(null);
    alert("Logout successful !!!");
    nav("/Userlogin");
  }

  return (
    <div className="navbar" >
      <p className="ic"><i class="bi bi-watch" ></i> </p><h1>Marriage</h1>
      <div className="left"></div>
      <div className="all">
    
        <div class="dropdown">
        <Link to="/Contactmail" className="link">
         Contactmail
        </Link>
          <div className="link"><i class="bi bi-caret-down-fill"></i>
            More
            </div> 
          <div class="dropdownlist">
            <Link to={"/Shome"} className="link"><i class="bi bi-person-add"></i>
             Home
            </Link>
            <Link to={"/Spanel"} className="link"><i class="bi bi-person-add"></i>
             Adminpanel
            </Link>
            <Link to={"/Mailform"} className="link"><i class="bi bi-person-add"></i>
             mailform
            </Link>
            <button onClick={logout}>logout</button>
          </div>
        </div>
        <Link to="/like" className="link">
         Like
        </Link>
        <Link to="/Addtocart" className="link" ><i class="bi bi-briefcase-fill"></i>
  Addtocart
        </Link>
        
      </div>
    </div>
  );
}
