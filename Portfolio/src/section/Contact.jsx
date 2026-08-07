import { useState } from "react";
import ParticlesBackground  from "../components/ParticlesBackground";
import emailjs from "@emailjs/browser";
import Astra from "../assets/Astra.png"
import {easeInOut, motion} from "framer-motion"



const SERVICE_ID = import.meta.env.VITE_SERVICE_KEY;
const TEMPLATE_KEY = import.meta.env.VITE_TEMPLATE_KEY
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const ALLOWED_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "aol.com",
  "msn.com",
  "mail.com",
];

export default function Contact(){
  const [formData ,setFormData] = useState({
    name : "",
    email : "",
    service : "",
    budget : "",
    idea : "",
  });

  const [error , setError] = useState({});
  const [status , setStatus] = useState("");

  const handleChange = (e)=>{
    const {name, value} = e.target;
    if (name === "budget" && value && (!/^\d+(\.\d+)?$/.test(value) || Number(value) <= 0)) return;
    
    setFormData( (p) => ({...p , [name]:value}));
    if(error[name]) setError((p) => ({...p , [name] : ""}));
  }

  const validateForm = ()=>{
    const required = ["name" , "email" , "service" , "idea"];
    const newErrors ={};
    required.forEach((f) => !formData[f].trim() && (newErrors[f] = "Fill this Field"));
    const trimmedEmail = formData.email.trim();
    const emailDomain = trimmedEmail.split("@")[1]?.toLowerCase();
    if (trimmedEmail && !EMAIL_REGEX.test(trimmedEmail))
      newErrors.email = "Please enter a valid email address.";
    else if (trimmedEmail && emailDomain && !ALLOWED_EMAIL_DOMAINS.includes(emailDomain))
      newErrors.email = "Please use a Gmail, Yahoo, Outlook, Hotmail, iCloud, or other approved .com email address.";
    if(formData.service !== "other" && !formData.budget.trim())
      newErrors.budget = "Fill this Field";
    setError(newErrors);
    return !Object.keys(newErrors).length;
  }

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const trimmedEmail = formData.email.trim();

  setStatus("sending");

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_KEY,
      {
        ...formData,
        form_name: formData.name,
        email: trimmedEmail,
        reply_to: trimmedEmail,
      },
      PUBLIC_KEY
    );

    setStatus("success");

    setFormData({
      name: "",
      email: "",
      service: "",
      budget: "",
      idea: "",
    });

    setTimeout(() => {
      setStatus("");
    }, 3000);
  } catch (err) {
    console.error("EmailJs Error", err);

    setStatus("error");

    setTimeout(() => {
      setStatus("");
    }, 3000);
  }
};

  return (
    <section id="contact" className="relative bg-black text-white w-full min-h-screen overflow-hidden py-16 lg:py-20 px-5 sm:px-6 md:px-12 lg:px-16 flex flex-col md:flex items-center gap-8 lg:gap-10">
        <ParticlesBackground />

        <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center gap-8 lg:gap-10">
      <motion.div className="w-full md:w-[42%] flex justify-center "
      initial={{opacity : 0 , x:-50}}
      whileInView = {{opacity : 1 , x : 0 }}
      transition = {{duration : 0.6 }}
      >
        <motion.img src={Astra} alt="Contact" className="w-64 sm:w-72 lg:w-[28rem] rounded-2xl shadow-lg object-cover"
        animate={{y:[0,-15,0]}}
        transition={{duration:2 ,repeat:Infinity , ease : easeInOut}} />
      </motion.div>
      {/* right-side */}
      <motion.div className="w-full md:w-[58%] bg-white/5 p-6 sm:p-7 lg:p-8 rounded-2xl shadow-lg border border-white/10 max-w-2xl"
      initial = {{opacity : 0 , x : 50}}
      whileInView = {{opacity : 1 , x :0}}
      transition={{duration : 0.6}}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-5 lg:mb-6">Let's Work Together</h2>
        <form className="flex flex-col gap-4 sm:gap-5"
        onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="mb-1">Your Name <span className="text-red-600">*</span></label>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} 
            className={`p-2.5 sm:p-3 rounded-md  bg-white/10 border ${error.name ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}/>
            {error.name && <p className="text-red-500 text-xs">{error.name}</p>}
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Your Email <span className="text-red-600">*</span></label>
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} 
            className={`p-2.5 sm:p-3 rounded-md  bg-white/10 border ${error.email ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}/>
            {error.email && <p className="text-red-500 text-xs">{error.email}</p>}
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Service Needed<span className="text-red-600">*</span></label>
            <select name="service"
            value={formData.service}
            onChange={handleChange}
            className={`p-2.5 sm:p-3 rounded-md bg-white/10  border ${error.service ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}>
              <option value="" disabled>Something in mind?</option>
              <option value="Web Development" className="text-black">Web Development</option>
              <option value="Frontend Development" className="text-black">Frontend Development</option>
              <option value="BackEnd Development" className="text-black">BackEnd Development</option>
              <option value="other" className="text-black">Other</option>
            </select>
            {error.service && <p className="text-red-500 text-xs">{error.service}</p>}
            </div>
            {formData.service && formData.service !== "other" &&(
            <div className="flex flex-col">
            <label className="mb-1">Your Budget <span className="text-red-600">*</span></label>
            <input type="text" name="budget" placeholder="Your Budget" value={formData.budget} onChange={handleChange} 
            className={`p-2.5 sm:p-3 rounded-md  bg-white/10 border ${error.budget ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}/>
            {error.budget && <p className="text-red-500 text-xs">{error.budget}</p>}
          </div>
            )}
            <div className="flex flex-col">
            <label className="mb-1">Explain Your Idea <span className="text-red-600">*</span></label>
            <textarea name="idea" rows={5} placeholder="Your Idea" value={formData.idea} onChange={handleChange} 
            className={`p-2.5 sm:p-3 rounded-md  bg-white/10 border ${error.idea ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}/>
            {error.idea && <p className="text-red-500 text-xs">{error.idea}</p>}
          </div>
          {status && (
  <p
    className={`text-sm font-medium ${
      status === "success"
        ? "text-green-400"
        : status === "error"
        ? "text-red-400"
        : "text-yellow-400"
    }`}
  >
    {status === "sending"
      ? "Sending..."
      : status === "success"
      ? "Message sent successfully!"
      : "Something went wrong. Please try again."}
  </p>
)}

          <motion.button
  type="submit"
  disabled={status === "sending"}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 sm:py-3 rounded-md font-semibold transition"
>
  {status === "sending" ? "Sending..." : "Send Message"}
</motion.button>
        </form>
      </motion.div>
      </div>
    </section>
  )
}