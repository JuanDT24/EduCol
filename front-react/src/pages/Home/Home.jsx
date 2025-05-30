import React, { useEffect } from "react";
import Topbar from "../../components/assets/Topbar";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    // Add floating class to motto after component mounts
    const motto = document.querySelector('.motto');
    if (motto) {
      motto.classList.add('floating');
    }
  }, []);

  return (
    <>
      <div className="image-background">
        <Topbar topbarItems={[
          { label: "Inicio", action: "scroll", target: "home" },
          { label: "Sobre Nosotros", action: "scroll", target: "about-us" },
          { label: "Registrate", action: "navigate", target: "/login" }
        ]}/>
        <div className="header-content">
          <h1 className="main-title">EduCol</h1>
          <h2 className="motto">Aprende con nosotros!</h2>
        </div>
      </div>
      <section className="about-us" id='about-us'>
        <h2 className="about-us-title">Sobre Nosotros</h2>
        <div className="section-info"> 
          <div className="text-block">
            <p>En Educol, creemos que la educación es la llave que abre las puertas del futuro. Somos una plataforma comprometida con ofrecer recursos de aprendizaje de alta calidad, accesibles a toda la comunidad hispanohablante. Nuestro equipo está formado por docentes, diseñadores instruccionales y expertos en tecnología educativa, unidos por la pasión de transformar la forma en que las personas adquieren conocimientos.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;