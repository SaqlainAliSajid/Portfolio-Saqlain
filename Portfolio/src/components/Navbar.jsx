import { useEffect, useRef, useState } from "react"
import OverlayMenu from "./OverlayMenu"
import Logo from "../assets/Logo.png"
import { FiMenu } from "react-icons/fi";

export default function Navbar(){
  const [menuOpen,setmenuOpen]=useState(false);
  const [visible,setvisible]=useState(true);
  const [forcevisible,setforcevisible]=useState(false);

  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  useEffect(()=>{
    const homeSection =  document.querySelector("#home");
    const observer = new IntersectionObserver(
      ([entry])=>{
        if(entry.isIntersecting){
          setforcevisible(true);
          setvisible(true);
        }else{
          setforcevisible(false);
        }
      },{threshold:0.1}
    )
    if(homeSection) observer.observe(homeSection);
    return ()=>{
      if(homeSection) observer.unobserve(homeSection);
    }
  

  },[])

  useEffect(()=>{
    const handleScroll =()=>{
      if(forcevisible){
        setvisible(true);
        return
      }
      const currentScrollY= window.scrollY;
      if(currentScrollY>lastScrollY.current){
        setvisible(false);
      }else{
        setvisible(true);
      

      if(timerId.current) clearTimeout(timerId.current);

        timerId.current=setTimeout(()=>{
          setvisible(false)
        },3000)
    }
    lastScrollY.current=currentScrollY;
  }
  window.addEventListener("scroll",handleScroll,{passive:true})


  return ()=>{
    window.removeEventListener("scroll",handleScroll)
    if(timerId.current) clearTimeout(timerId.current)
  }
},[forcevisible])


  return(
    <>
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? "translate-y-0":"-translate-y-full"}`}>
    <div className="flex items-center space-x-2">
    <img src={Logo} alt="Logo" className="w-10 h-10" />
    <div className="text-2xl font-bold text-white hidden-sm-block">Saqlain</div>  
    </div>       

    <div className="block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
    <button onClick={()=>setmenuOpen(true)} className="text-white text-3xl focus:outline-none" aria-label="open Menu">
      <FiMenu />
    </button>
    </div>

    <div className="hidden lg:block">
      <a href="#contact" className="bg-linear-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300">
        Reach Out
      </a>
    </div>
    </nav>

    <OverlayMenu isOpen={menuOpen} onClose={()=>setmenuOpen(false)}/>
    </>
  )
}
