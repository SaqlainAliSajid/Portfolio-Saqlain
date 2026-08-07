import { useEffect, useMemo, useRef, useState } from "react"
import img1 from "../assets/img1.PNG"
import img2 from "../assets/img2.PNG"
import img3 from "../assets/img3.PNG"
import photo1 from "../assets/photo1.JPG"
import photo2 from "../assets/photo2.PNG"
import photo3 from "../assets/photo3.png"
import { motion,useScroll,useMotionValueEvent,AnimatePresence,useTransform } from "framer-motion"


const useIsMobile = (query = "(max-width : 639px)")=>{
  const [IsMobile,setIsMobile]=useState(
    typeof window !="undefined" && window.matchMedia(query).matches
  )

  useEffect(()=>{
    if(typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler =  (e)=> setIsMobile(e.matches);

    mql.addEventListener("change" , handler);
    setIsMobile(mql.matches);
    return ()=> mql.removeEventListener("change",handler);
  },[query])
  return IsMobile;
}


export default function Projects(){

  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        title: "Micasa",
        link: "https://frontend.micasa.saqlainali.tech/",
        bgColor: "#06261f",
        image: isMobile ? photo1 : img1, // use mobile or desktop image
      },
      {
        title: "Medi-Care",
        link: "https://gamilyapp.com/",
        bgColor: "#083d3a",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "LearnX",
        link: "https://learnx-webtech.netlify.app/",
        bgColor: "#11224f",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile] // re-run only when `isMobile` changes
  );

const {scrollYProgress} = useScroll({
  target : sceneRef,
  offset : ["start start","end end"]
})

const thresholds = projects.map((_,i)=> (i+1)/projects.length);
const [activeIndex,setActiveIndex] = useState(0);
const lineHeight = useTransform(scrollYProgress, (v) => `${Math.max(8, v * 100)}%`);

useMotionValueEvent(scrollYProgress , "change" , (v) => {
  const idx = thresholds.findIndex((t)=> v<=t);
  setActiveIndex(idx === -1 ? thresholds.length -1 : idx)
});

const activeProject = projects[activeIndex];

  return (
    <section id="projects" className="relative text-white" ref={sceneRef}
    style={{
      height:`${100*projects.length}vh`,
      backgroundColor:activeProject.bgColor,
      transition:"background-color 400ms ease"
    }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2 className={`text-3xl font-semibold z-10 text-center ${
          isMobile ? "mt-4" : "mt-8"
        }`}>My Work</h2>
      <div className="pointer-events-none absolute left-4 top-1/2 hidden h-[72vh] w-1.5 -translate-y-1/2 rounded-full bg-white/10 lg:block">
        <motion.div
          className="absolute inset-x-0 top-0 rounded-full bg-linear-to-b from-[#1cd8d2] via-[#00bf8f] to-[#7c3aed] shadow-[0_0_24px_rgba(28,216,210,0.55)]"
          style={{ height: lineHeight }}
        />
      </div>
      <div className="pointer-events-none absolute left-4 top-1/2 hidden h-[72vh] w-px -translate-y-1/2 rounded-full bg-white/10 lg:block" />
      <div className={`relative w-full flex-1 flex items-center justify-center ${
        isMobile ? "-mt-4" : ""
      }`}>
        {projects.map((project,idx)=>(
          <div key={project.title}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
            activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"
          }`}
          style={{width:"85%" , maxWidth : "1200px"}}
          >
            <AnimatePresence mode="wait">
              {activeIndex === idx && (
                <motion.h3 key={project.title}
                initial = {{opacity : 0 , y : -30}}
                animate = {{opacity : 1 , y : 0}}
                exit = {{opacity : 0 , y : 30}}
                transition = {{duration : 0.5 , ease: "easeOut"}}
                className = {`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-20 sm:left-[-35%] lg:left-[-5%] sm:mb-0
                  italic font-semibold ${
                    isMobile ? "-mt-24" : ""
                  }
                  `}
                  style ={{
                    zIndex:5,
                    textAlign : isMobile ? "center" : "left",
                  }}
                >{project.title}</motion.h3>
              )}
            </AnimatePresence>
              
              <div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl
                md:shadow-[0_35px_65px_-15px_rgba(0,0,0,0.7)] ${
                  isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl" 
                }
                h-[62vh] sm:h-[66vh]`}
                style={{zIndex:10 , transition: "box-shadow 250ms ease"}}
                
                >
                  <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-black/60 via-black/10 to-black/60" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-linear-to-b from-black/65 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-linear-to-t from-black/70 to-transparent" />
                  <img src={project.image} alt={project.title} 
                  className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
                  style = {{
                    position : "relative",
                    zIndex : 10,
                    filter : "drop-shadow(0,16px 40px rgba(0,0,0,0.75)) brightness(0.88) contrast(1.03) saturate(0.95)",
                    transition : "filter 200ms ease"
                  }}
                  loading = "lazy"
                  />
                  <div className="pointer-events-none absolute inset-0"
                  style={{
                    zIndex : 11,
                    background : "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 40%)"
                  }}></div>
              </div>
          </div>
        ))}
      </div>
      
      <div className={`absolute z-20 pointer-events-auto ${
        isMobile ? "bottom-8" : "bottom-4"
      }`}>
        <a href={activeProject?.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
        aria-label={`View ${activeProject?.title}`}
        >View Project</a>
      </div>
      </div>
    </section>
  )
}