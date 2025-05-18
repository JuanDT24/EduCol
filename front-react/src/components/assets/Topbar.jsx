import "./Topbar.css"
import {useNavigate} from "react-router-dom"
export default function Topbar() {
    const navigate = useNavigate()
    const registerUser = () => {
        navigate("/login")
    }
    const scrollToSection = (sectionId) =>{
        const section = document.getElementById(sectionId);
        if(section){
            section.scrollIntoView({behavior:'smooth'})
        } 
    }
    return(
    <div className="topbar-container">
        <div className="short-border"></div>
        <button className="topbar-item">Inicio</button>
        <button className="topbar-item" onClick={()=> scrollToSection("about-us")}>About us</button>
        <button className="topbar-item" onClick={() => registerUser()}>Registrate</button>
    </div>
    )
}

