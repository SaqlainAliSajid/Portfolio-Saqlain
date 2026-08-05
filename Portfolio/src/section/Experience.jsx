import { motion , useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "FreeLancing",
    duration: "2024-2026",
    description: "Built high-performance apps, integrated AI features, improved engagement by 10%.",
  },
  {
    role: "Frontend Developer Intern",
    company: "Teyzix-core",
    duration: "June 2026 - July 2026",
    description: "Gained hands-on web development experience.",
  },
  {
    role: "Full Stack Developer Intern",
    company: "CodeCelix",
    duration: "June 2026 - Sep 2026",
    description: "Built scalable MERN stack web applications in a 3-month internship.",
  },
  {
    role: "Web Developer Intern",
    company: "CDA",
    duration: "July 2026 - Sep 2026",
    description: "Contributed to a company's software during a 2-month internship, delivering scalable MERN-based solutions",
  },
];

function ExperienceItem({exp,idx,start,end,scrollYProgress,layout}){
  const opacity = useTransform(
  scrollYProgress,
  [start, end,1],
  [0, 1,1]
);
const scale = useTransform(scrollYProgress,[start,end,1],[0,1,1],{clamp:true});
  const y = useTransform(scrollYProgress,[start,end],[idx%2 === 0 ? 30 : -30 ,0])
  const x = useTransform(scrollYProgress,[start,end],[-24,0])

  if(layout==="desktop"){
    return(
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div className="z-10 w-7 h-7 rounded-full bg-white shadow[0_0_0_8px_rgba(255,255,255,0.1)]"
        style={{scale,opacity}}
        ></motion.div>
        <motion.div className={`absolute ${idx%2 === 0 ? "-top-8" : "-bottom-8"} w-0.75 bg-white/40`}
        style={{height:40 , opacity}}
        ></motion.div>
        <motion.article className={`absolute ${idx%2 === 0 ? "bottom-12" : "top-12"} bg-gray-900/80 
        backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg `}
        style={{opacity ,y ,maxWidth:"90vw"}}
        transition={{duration:0.4 , delay:idx*0.15}}
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400 mb-3">{exp.company}</p>
          <p className="text-md text-gray-400 mb-3">{exp.duration}</p>
          <p className="text-md text-gray-300 wrap-break-word">{exp.description}</p>
        </motion.article>
      </div>
    )
  }
  return(
    <div className="relative flex items-start">
      <motion.div className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow[0_0_0_8px_rgba(255,255,255,0.1)]"
      style={{scale,opacity}}></motion.div>
      <motion.article className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
      style={{opacity,x}}
      transition={{duration:0.4 , delay : idx*0.15}}
      >
        <h3 className="text-lg font-semibold wrap-break-word">{exp.role}</h3>
          <p className="text-sm text-gray-400 mb-2 wrap-break-word">{exp.company}</p>
          <p className="text-sm text-gray-400 mb-2 wrap-break-word">{exp.duration}</p>
          <p className="text-sm text-gray-300 wrap-break-word">{exp.description}</p>
      </motion.article>
    </div>
  )

}



export default function Experience(){
 const sceneRef = useRef(null);
 const [isMobile, setIsMobile] = useState(false);

 useEffect(()=>{
  const checkMobile =() => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener("resize" , checkMobile);

  return ()=> window.removeEventListener("resize" , checkMobile)
 },[])

 // show 3 items on small screens, 4 on larger screens
 const visibleCount = isMobile ? 3 : 4;
 const visibleExperiences = experiences.slice(0, visibleCount);

const SCENE_HEIGHT_VH = isMobile ? 160*visibleExperiences.length : 120*visibleExperiences.length ;

const {scrollYProgress} = useScroll({
  target:sceneRef,
  offset:["start start","end end"]
})

const thresholds = useMemo(()=> visibleExperiences.map((_,i) => (i+1)/Math.max(1,visibleExperiences.length)),[visibleExperiences]);

const lineSize = useTransform(scrollYProgress,(v) => `${v*100}%`);

  return(
    <section id="experience" className="relative bg-black text-white">

      <div className="relative" ref={sceneRef} style={{height : `${SCENE_HEIGHT_VH}vh`, minHeight:"120vh"}}>
        <div className="sticky top-0 h-screen flex flex-col">
          <h3 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">Experience</h3>
          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-[6px] rounded bg-white/15">
                <motion.div className="absolute left-0 top-0 h-[6px] bg-white rounded origin-left" 
                style={{width : lineSize}}>
                </motion.div>
                </div>
                <div className="relative justify-between flex mt-0">
                {visibleExperiences.map((experiences,idx)=>(
                  <ExperienceItem
                  key={idx}
                  exp ={experiences}
                  idx={idx}
                  start={idx === 0 ? 0 : thresholds[idx-1]}
                  end={thresholds[idx]}
                  scrollYProgress={scrollYProgress}
                  layout="desktop"
                  />
                ))}

                </div>
              </div>
            )}
            {isMobile && (
              <div className="relative w-full max-w-md">
                <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                <motion.div className="absolute top-0 left-0 w-[6px] bg-white rounded origin-top"
                style={{height : lineSize}}
                ></motion.div>
                </div>
                <div className="reative flex flex-col pb-28 gap-10 ml-10 mt-6">
                  {visibleExperiences.map((experiences,idx)=>(
                  <ExperienceItem
                  key={idx}
                  exp ={experiences}
                  idx={idx}
                  start={idx === 0 ? 0 : thresholds[idx-1]}
                  end={thresholds[idx]}
                  scrollYProgress={scrollYProgress}
                  layout="mobile"
                  />
                ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}