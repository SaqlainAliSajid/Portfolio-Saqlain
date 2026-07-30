import Navbar from "./components/Navbar"
import Home from "./section/Home"
import About from "./section/About"
import Skills from "./section/Skills"
import Projects from "./section/Projects"
import Testimonials from "./section/Testimonials"
import Contact from "./section/Contact"
import Footer from "./section/Footer"
import Experience from "./section/Experience"
// import ParticlesBackground from "./components/ParticlesBackground"
import CustomCusor from "./components/CustomCusor"
import IntroAnimation from "./components/IntroAnimation"
import React from "react"

export default function App(){
 const [introDone,setIntroDone] = React.useState(false);
 
  return(
   <>

   {!introDone && <IntroAnimation onFinish={()=> setIntroDone(true)}/>}
    {introDone && (
  <div className="relative gradient">
    {/* <ParticlesBackground/> */}
    <CustomCusor/>
    <Navbar/>
    <Home/>
    <About/>
    <Skills/>
    <Projects/>
    <Experience/>
    <Testimonials/>
    <Contact/>
    <Footer/>
  </div>
  )}
  </>
  )
}
