import { Link } from "react-router-dom";
// import "../Relatives/css/Navbar.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { mycontext } from "./Context";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';



export default function Rnavbar() {
  const nav = useNavigate();
  const { setData,loguser } = useContext(mycontext);
 
  const authToken=localStorage.getItem('authToken');
  
  const handleLogout=()=> {
    localStorage.removeItem("authToken")
     localStorage.removeItem("userEmail")
     localStorage.removeItem("userId")
     setData([])
    alert("Logout successful !!!");
    nav("/");
  }

 
  return (
    <div className='navbar' style={{backgroundColor:"lightblue"}}>
    <Navbar expand="lg" className=" #000000" >
      <Container>
        <Navbar.Brand href="#home" >𝑀arriage</Navbar.Brand>   
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link ><Link to="/Rhome">Home</Link></Nav.Link>
          

     
          </Nav>
          <Nav.Link ><Link to="/Mailsend">invitation </Link></Nav.Link>

          <NavDropdown title="other" id="basic-nav-dropdown" >
              <NavDropdown.Item > <Link to={"/Rsignup"} className="link"><i class="bi bi-person-circle"></i> signup</Link> </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item ></NavDropdown.Item>
            </NavDropdown>
            <button onClick={handleLogout}>logout</button> 

        </Navbar.Collapse>
      
      </Container>
    </Navbar>
    <div>
       
        
      </div>
    </div>
  );
}

