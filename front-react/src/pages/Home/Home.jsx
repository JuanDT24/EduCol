import React from "react";
import Topbar from "../../components/assets/Topbar";
import "./Home.css";
import student from './estudiante.png'

const Home = () => {
  return (
    <>
        <div className = "image-background">
          <Topbar/>
          <div className="title">
            <h1 style={{fontWeight:"bold", color: 'white', fontSize:'100px', textShadow:"10px"}}>Aprende con nosotros!</h1>
          </div>
        </div>
        <section className="about-us" id='about-us'>
          <h2 className="about-us-title">Sobre Nosotros</h2>
          <div className="section-info"> 
           <div className="text-block">
               <p style={{fontSize:"25px"}}>En Educol, creemos que la educación es la llave que abre las puertas del futuro. Somos una plataforma comprometida con ofrecer recursos de aprendizaje de alta calidad, accesibles a toda la comunidad hispanohablante. Nuestro equipo está formado por docentes, diseñadores instruccionales y expertos en tecnología educativa, unidos por la pasión de transformar la forma en que las personas adquieren conocimientos. </p>
            </div>
          </div>
        </section>
    </>
  )
}

export default Home