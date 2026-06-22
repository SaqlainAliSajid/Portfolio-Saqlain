import Navbar from "./components/Navbar"
import Home from "./section/Home"
import About from "./section/About"
import Skills from "./section/Skills"
import Projects from "./section/Projects"
import Testimonials from "./section/Testimonials"
import Contact from "./section/Contact"
import Footer from "./section/Footer"
import Experience from "./section/Experience"
import ParticlesBackground from "./components/ParticlesBackground"
import CustomCusor from "./components/CustomCusor"

export default function App(){
  return(
  <div className="relative gradient">
    <ParticlesBackground/>
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
  )
}
