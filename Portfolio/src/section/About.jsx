import { motion } from "framer-motion"
import p from "../assets/p.png";

export default function About(){
  const stats=[
    {label:"Experience" , value:"1+ years"},
    {label:"Speciality" , value:"MERN Stack"},
    {label:"Focus" , value:"Performance & Scalability"},
  ];
 const glows=[
  "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
  "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
  "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]",
 ]



  return(
    <section id="about"
    className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
    >
     <div className="inset-0 absolute pointer-events-none">
      {glows.map((c,i)=>(
        <div key={i} className={`absolute rounded-full bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] animate-pulse ${c}`} />
      ))}
     </div>

     <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-20 py:20 flex flex-col gap-12">
        <motion.div className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
        initial = {{opacity:0 , y:24}}
        whileInView={{opacity:1 , y:0}}
        transition ={{duration:0.6}}
        viewport = {{once:true , amount:0.4}}
        >
         <motion.div className="relative w-40 h-40 md:w-50 md:h-50
         rounded-2xl overflow-hidden shadow-2xl bg-linear-to-br from-[#1cd8d2]/20 to-[#302b63]/20 border border-[#1cd8d2]/25"
         whileHover={{scale:1.02}}
         transition={{type:"string" , stiffness:200 ,damping:18}}
         >
          <img src={p} alt="Profile" className="absolute inset-0"/>
         </motion.div>
        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl  font-extrabold tracking-tight bg-clip-text text-transparent 
          bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#3A3472]">Saqlain Ali Sajid</h2>
          <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">Full Stack Developer</p>
          <p className="leading-relaxed mt-4 text-gray-300 text-base sm:text-lg max-w-2xl md:max-w-3xl">I am a Full Stack Developer skilled in React.js, Node.js, Express.js, MongoDB, PostgreSQL, JavaScript, HTML, CSS, and 
            Tailwind CSS. I build responsive, scalable, high-performance web applications with clean architecture, maintainable code, and 
            strong user experience, delivering efficient and visually engaging digital solutions aligned with business goals.</p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
            {stats.map((items,i)=>(
              <motion.div key={i} className=" rounded-xl border bg-white/5 border-white/10 px-4 py-3 text-center" 
              initial={{opacity:0 , y:10}}
              whileInView={{opacity:1 , y:0}}
              transition={{delay:0.05*i , duration:0.4}}
              viewport={{once:true , amount:0.3}}
              >
                <div className="text-gray-400 text-sm">{items.label}</div>
                <div className="text-base font-semibold">{items.value}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4  justify-center lg:justify-start">
            <a href="#project" className=" inline-flex items-center justify-center px-5 py-3 rounded-lg font-semibold  text-black bg-white hover:bg-gray-200 transition">View Project</a>
            <a href="#contact" className="inline-flex items-center justify-center px-5 py-3 rounded-lg  bg-white/10 hover:bg-white/20 transition-all border border-white/20 text-white" >Get In Touch</a>
          </div>

        </div>
        
        </motion.div>

        <motion.div className="text-center md:text-left"
        initial={{opacity:0 , x:-30}}
        whileInView={{opacity:1 , x:0}}
        transition={{duration:0.6}}
        viewport={{once:true , amount:0.4}}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">About Me</h3>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">I architect and develop scalable, responsive full-stack web applications leveraging modern technologies and industry best practices.

I focus on turning ideas into fast, reliable, user-centered digital experiences.</p>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">I focus on turning ideas into fast, reliable, user-centered digital experiences.</p>
        </motion.div>
     </div>

    </section>
  )
}