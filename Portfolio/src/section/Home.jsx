import { useEffect, useMemo, useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import {motion} from "framer-motion";
import {FaGithub,FaLinkedin} from "react-icons/fa6"
import avator3 from "../assets/avator3.png";


const socials =[
  {Icon : FaLinkedin,label: "LinkedIn",href:"https://www.linkedin.com/in/saqlain-ali-095aa0329/"},
  {Icon : FaGithub ,label: "Github",href:"https://github.com/SaqlainAliSajid"},
]

const glowVariants={
  initial : { scale: 1 , y:0 , filter:"drop-shadow(0 0 0 rgba(0,0,0,0))"},
  hover : { scale : 1.2 , y:-3 , filter:"drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))" ,transition : { type: "spring" ,stiffness:300,damping:15}}, 
  tap : { scale:0.95 , y:0 ,transition : {duration:0.08}}
}

export default function Home(){
  const roles = useMemo(()=>["Full Stack Developer","FrontEnd Developer","BackEnd Developer"],[])

  const [index,setindex]=useState(0);
  const [subIndex,setSubIndex]=useState(0);
  const [deleting,setDeleting]=useState(false);
  
  useEffect(()=>{
    const current =roles[index];
    const timeout = setTimeout(() => {
      if(!deleting && subIndex < current.length) setSubIndex(v => v + 1);
      else if(!deleting && subIndex === current.length) setTimeout(()=>setDeleting(true),800);
      else if(deleting && subIndex > 0) setSubIndex(v => v - 1);
      else if(deleting && subIndex === 0) {setDeleting(false);setindex((p)=>(p+1) % roles.length)}
    },deleting ? 40 : 60)
  return ()=> clearTimeout(timeout);
  },[deleting,subIndex,index,roles])
  
  
  
  return(
    <section id="home" className="w-full h-screen bg-black relative overflow-hidden">
      <ParticlesBackground />
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32
        w-[70vw] sm:w-[z-500vw] md:w-[40vw]
        h-[70vw] sm:h-[50vw] md:h-[40vw]
        max-w-500 max-h-500
        rounded-full 
        bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
        opacity-30 sm:opacity-20 md:opacity-10
        blur-[100px] sm:blur-[130px] md:blur-[150px]
        animate-pulse
        "></div>
        {/* <div className="absolute bottom-0 right-0
        w-[70vw] sm:w-[z-500vw] md:w-[40vw]
        h-[70vh] sm:h-[50vw] md:h-[40vw]
        max-w-500 max-h-500
        rounded-full 
         bg-linear-to-r  from-[#1A1540]  via-[#006B5A]  to-[#0E8E8A]
        opacity-30 sm:opacity-20 md:opacity-10
        blur-[100px] sm:blur-[130px] md:blur-[150px]
        animate-pulse delay-500
        "></div> */}
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center h-full text-center lg:text-left relative">
          <div className="w-full lg:pr-24 mx-auto max-w-3xl">
            <motion.div className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]" 
            initial={{opacity:0 ,y:12}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.6}}
            >
              <span>
                {roles[index].substring(0,subIndex)}
              </span>
              <span className="inline-block w-0.5 ml-1 bg-white animate-pulse align-middle" style={{height:"1em"}}></span>
            </motion.div>
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text
            bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:1}}>
              Hello, I'm
              <br />
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">Saqlain Ali</span>
            </motion.h1>
            <motion.p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{delay:0.4,duration:0.8}}
            >I build modern digital experiences with clean architecture, strong performance, and thoughtful design, turning complex ideas into scalable, efficient, and engaging web applications.</motion.p>
          <motion.div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:0.8 , duration:0.8}}
          >
            <a href="#projects"
            className="px-6 py-3 rounded-full font-medium text-lg text-white
            bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]
            hover:scale-105 shadow-lg transition-all"
            >View My Work</a>
            <a href="/Saqlain_Ali_Sajid_Resume.pdf"
            className="px-6 py-3 rounded-full font-medium text-lg text-black bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
            >My Resume</a>
          </motion.div>

          <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
            {socials.map(({Icon,label,href})=>(
            <motion.a 
            href={href}
            key={label}
            target="_blank"
            aria-label={label}
            rel="noopener noreferrer"
            variants={glowVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="text-gray-300"
            >
            <Icon/>
            </motion.a>
            ))}
          </div>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "-42px",
              width: "min(50vw, 860px)",
              height: "min(82vh, 860px)",
            }}
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.85 }}
          >
            <div
              className="absolute inset-0 rounded-[3.5rem]"
              style={{
                background:
                  "radial-gradient(circle at 55% 38%, rgba(28,216,210,0.34), rgba(0,0,0,0) 52%), radial-gradient(circle at 48% 58%, rgba(0,191,143,0.18), rgba(0,0,0,0) 68%)",
                filter: "blur(18px)",
              }}
            />
            <div
              className="absolute inset-0 overflow-hidden rounded-[3.5rem] border border-white/5 bg-black/25 shadow-[0_30px_140px_rgba(0,0,0,0.72)]"
              style={{
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 14%, rgba(0,0,0,0.95) 38%, rgba(0,0,0,0.72) 70%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 8%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0.75) 92%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 14%, rgba(0,0,0,0.95) 38%, rgba(0,0,0,0.72) 70%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 8%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0.75) 92%, rgba(0,0,0,0) 100%)",
              }}
            >
              <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/45 to-transparent z-10" />
              <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black via-black/90 to-transparent z-20" />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-black via-black/88 to-transparent z-20" />
              <div className="absolute inset-y-0 left-0 w-28 bg-linear-to-r from-black via-black/75 to-transparent z-20" />
              <div className="absolute inset-y-0 right-0 w-28 bg-linear-to-l from-black via-black/75 to-transparent z-20" />
              <div className="absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-[#1cd8d2]/8 mix-blend-screen" />
              <motion.img
                src={avator3}
                alt="Avator"
                className="absolute inset-0 h-full w-full object-cover object-top select-none"
                style={{
                  transform: "scale(1.12)",
                  filter: "contrast(1.02) saturate(0.98) brightness(0.86)",
                  objectPosition: "center top",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

