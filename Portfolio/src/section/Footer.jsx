import {motion} from "framer-motion"
import {FaGithub,FaLinkedin,FaXTwitter} from "react-icons/fa6"

const socials =[
  {Icon : FaXTwitter,label: "X",href:"https://www.youtube.com/watch?v=nyXiKPK3sVk"},
  {Icon : FaLinkedin,label: "LinkedIn",href:"https://www.linkedin.com/in/saqlain-ali-095aa0329/"},
  {Icon : FaGithub ,label: "Github",href:"https://github.com/SaqlainAliSajid"},
]
const glowVariants={
  initial : { scale: 1 , y:0 , filter:"drop-shadow(0 0 0 rgba(0,0,0,0))"},
  hover : { scale : 1.2 , y:-3 ,color: "#1cd8d2", textShadow: "0 0 10px #1cd8d2, 0 0 20px #00bf8f, 0 0 35px #302b63", transition : { type: "spring" ,stiffness:300,damping:15}}, 
  tap : { scale:0.95}
};


export default function Footer(){
  return(
      <section id="footer" className="relative overflow-hidden bg-black">
        <div className="absolute pointer-events-none inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,202,0.25),transparent_70%)]"/>
        <div className="absolute pointer-events-none inset-0 bg-[radial-gradient(50%_55%_at_35%_70%,rgba(16,181,129,0.30),transparent_70%)]"/>
        <motion.div
         className="relative z-10 px-4 sm:px-8 lg:px-10 py-16 md:py-20 flex flex-col space-y-6 items-center text-center"
         initial = {{opacity : 0 , y :30}}
         whileInView={{opacity:1 , y:0}}
         transition={{duration : 0.8}}
         >
          <h1 className="font-semibold leading-none text-white text-3xl text-center select-none "
          style={{fontSize:"clamp(3rem,5vw,14rem)", 
           letterSpacing:"0.02em" ,
           padding:"0.3vw" ,
           lineHeight:0.9 ,
           whiteSpace:"nowrap" ,
            textShadow:"0 2px 18px rgba(0,0,0,0.45)"
          }}
          >Saqlain Ali</h1>
           <div className="h-[3px] w-24 md:w-32 rounded-full bg-linear-to-r from-[#0d58cc] via-cyan-300 to-emerald-400"/>

           <div className="flex gap-5 text-2xl md:text-3xl">
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
                        className="text-gray-300 transition-colors duration-200 inline-flex items-center justify-center"
                        >
                        <Icon/>
                        </motion.a>
                        ))}
           </div>
           <p className="text-gray-300 italic max-w-full">"Dream. Prepare. Achieve."</p>
           <p className="text-gray-300  text-xs">
            &copy; {new Date().getFullYear()} Saqlain Ali. All Rights Reserved
           </p>
        </motion.div>
       
      </section>
  )

}