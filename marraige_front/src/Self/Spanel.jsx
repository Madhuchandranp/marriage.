
    import{Link} from "react-router-dom"
import "../Self/css/Spanel.css";
    import Snavbar from "./Snavbar";
    
export default function Spanel(){    
        return(
            <div>
                <Snavbar/>
                <h2>hello admin</h2>
    
                <div className="addpro" >
                    <Link className="link1" to={"/Shome"}>All images</Link>
                </div>
    
                <div className="addpro">
                    <Link className="link1" to={"/Suser"}>users</Link>
                </div>
                <div className="addpro" >
                    <Link className="link1" to={"/Rhome"}>Rhome</Link>
                </div>
    
                <div className="addpro">
                    <Link className="link1" to={"/Fhome"}> Fhome</Link>
                </div>
                
            </div>
        )
    }