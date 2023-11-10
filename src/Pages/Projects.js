import React, { useContext } from 'react'
import p1 from '../images/Projects/p1.png'
import p2 from '../images/Projects/p2.png'
import p3 from '../images/Projects/p3.png'
import p4 from '../images/Projects/p4.png'
import p5 from '../images/Projects/p5.png'
import p6 from '../images/Projects/p6.png'
import p7 from '../images/Projects/p7.png'
import { BsGithub } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import '../Styles/Projects.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import '../Styles/Common.css'
import ThemeContext from '../Context/ThemeContext';
import NavFixContext from '../Context/NavFixContext'
import ScrollToTopOnReload from '../CustomHooks/ScrollToTopOnReload'
const Projects = () => {
    const {mode}=useContext(ThemeContext)
    const {isFixed}=useContext(NavFixContext)
    document.title="Aditya's Portfolio | Projects"

  ScrollToTopOnReload()
    const Projects = [{ title: "Movies Explorer", desc: "This a website which allows user to browse movies and tv shows. It uses TMDB api and fetches info from there and shows here.", tool: "API | HTML | CSS JS" , links: { github: "https://github.com/adityakhadeak/AK-Movies-Explorer", live: "https://adityakhadeak.github.io/AK-Movies-Explorer/" },img:p1 },
    { title: "NoteIT Web App", desc: "This a website which allows user to save the short notes. It also uses the local storage to store the notes. Its is build with React-Reducx", tool: "React | Redux | Bootstrap", links: { github: "https://github.com/adityakhadeak/NoteIT_Web_App", live: "https://noteit-react-redux-byak.netlify.app/" },img:p2 },
    { title: "InforMedia-News-App", desc: "This a website which allows user to read news. It is a News website build with React Js and newsapi. This was build to learn new skills and technique used in this project", tool: "React | API | Bootstrap", links: { github: "https://github.com/adityakhadeak/InforMedia-News-App", live: "https://github.com/adityakhadeak/InforMedia-News-App" },img:p3 },
    { title: "Python Planner", desc: "This is a planner made with python. In this you can add your daily task to perform and it will give a remainder through mail", tool:  "Python | Tkinter | Figma" , links: { github: "https://github.com/adityakhadeak/Planner-Project1", live: "https://github.com/adityakhadeak/Planner-Project1" },img:p4 },
    { title: "My Old Portfolio Site", desc: "This is my first personal website which is made by me with HTML,CSS and Javascript. This is a basic site which will be further upgraded to a advance one", tool: "HTML | CSS | Javascript" , links: { github: "https://github.com/adityakhadeak/adityakhadeak.github.io", live: "https://adityakhadeak.github.io/" }, img:p5},
    { title: "QuikNotes", desc: "This is a cloud based note taking web app. Ii is almost similar to NoteIT site only difference is that it uses a database to store notes. I have done this project to learn the backend (MERN) Stack", tool:  "React | Mongodb | Node JS", links: { github: "https://github.com/adityakhadeak/QuikNotes-Front-End", live: "https://quiknotes.netlify.app/" },img:p6 },
    { title: "Covid-Data-Tracker", desc: "This Page Shows the Covid cases details state wise using an API, It was build to learn how to work with api in react", tool: "React | API | Bootstrap" , links: { github: "https://github.com/adityakhadeak/Covid-Data-Tracker", live: "https://coviddataak.netlify.app/" },img:p7 }
    ]
        return (
        <section className='projects relative font-1'>
            <div className={`pt-[3rem] leftShadow rightShadow before:bottom-[0] after:top-[420px]  ${isFixed?"md:mt-[86px] mt-[86px]":""} md:mx-[205px] mx-8`}>
                <motion.div
                    variants={fadeIn('right', 0.3, 10)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    className='lineImg flex items-center justify-center text-[25px] md:text-[30px] '>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >V.</span>
                    <h2 className='text-[#94a9c9] w-fit md:w-fit mx-2'>Projects</h2>
                </motion.div>
                <div className=' items-con my-3 pt-7 flex  justify-center items-center md:flex-row flex-col flex-wrap text-white' >

                    {Projects.map((project,index) => (
                        <motion.div 
                        key={index}
                        variants={fadeIn('right', 0.4, 10)}
                                    initial='hidden'
                                    whileInView={'show'}
                                    viewport={{ once: true, amount: 0.7 }}
                        className=' item flex  flex-col justify-center items-center md:flex-row max-w-[800px] w-[100%] px-[20px] my-auto mb-[4rem] min-w-[100px]' >

                            <div className='left z-[1]    flex-1'>
                                <div className='pro-img overflow-hidden    rounded-xl  relative' >
                                    <img src={project.img} className='object-cover h-[13rem]' alt="project1" />
                                </div>
                            </div>

                            <div className={` right pro-info rounded-lg ${mode==='dark'?'bg-[#131c31]':'bg-[#e8edf5]'}  z-[2] w-[300px] md:w-fit md:-ml-[125px] px-[3rem] py-3 right flex flex-col justify-items-center justify-center items-center flex-1`}>
                                <h1 className=' mb-3 text-xl text-[#94a9c9]  font-bold'>{project.title}</h1>
                                <p className='text-[#a3afbf] mb-3 text-sm'>{project.desc}</p>
                                <div className='font-mono mb-3 text-[#0dace4] '>
                                    <p className='mr-3 text-sm text-center w-[179px]'>{project.tool}</p>
                                </div>
                                <div className=' flex relative right-[10px] ' >
                                <a target='_blank' rel='noreferrer' className={`mr-2 text-xl  text-[25px] p-[10px] relative ${mode==='dark'?'text-white':'text-[#a3afbf]'}  hover:text-[#0dace4] transition-all duration-[0.25s] cursor-pointer `} href={project.links.github}><BsGithub /></a>
                                    <a target='_blank' rel='noreferrer' className={`mr-2 text-xl  text-[25px] p-[10px] relative   ${mode==='dark'?'text-white':'text-[#a3afbf]'}   hover:text-[#0dace4] transition-all duration-[0.25s] cursor-pointer `} href={project.links.live}><BiLinkExternal /></a>
                                </div>
                            </div>


                        </motion.div>

                    ))}

                </div>
                <motion.div 
                    variants={fadeIn('right', 0.5)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                className='p-5 m-3 flex justify-center '>

                    <button className='btn btn-hover  w-[200px]' ><a href="https://github.com/adityakhadeak" target="_blank" rel="noopener noreferrer">More on my Github</a></button>
                </motion.div>
            </div>
        </section>
    )
}

export default Projects
