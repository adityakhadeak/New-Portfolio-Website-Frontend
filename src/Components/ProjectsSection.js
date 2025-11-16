import React, { useContext, useEffect } from 'react'

import { BsGithub } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import '../Styles/Projects.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import '../Styles/Common.css'
import ThemeContext from '../Context/ThemeContext';
import GithubContributions from './GithubContributions';
import FetchContext from '../Context/FetchContext';
const Projects = () => {
    const {mode}=useContext(ThemeContext)
    const {Projects,fetchAllProjects}=useContext(FetchContext)
    // const Projects = [{ title: "Movies Explorer", desc: "This a website which allows user to browse movies and tv shows. It uses TMDB api and fetches info from there and shows here.", tool: { "1st": "API", "2nd": "HTML", "3rd": "CSS", "4th": "JS" }, links: { github: "https://github.com/adityakhadeak/AK-Movies-Explorer", live: "https://adityakhadeak.github.io/AK-Movies-Explorer/" },img:p1 },
    // { title: "NoteIT Web App", desc: "This a website which allows user to save the short notes. It also uses the local storage to store the notes. Its is build with React-Reducx", tool: { "1st": "React", "2nd": "Redux", "3rd": "Bootstrap" }, links: { github: "https://github.com/adityakhadeak/NoteIT_Web_App", live: "https://noteit-react-redux-byak.netlify.app/" },img:p2 },
    // ]
const myProjects=Projects.slice(0,3)
    useEffect(() => {
        fetchAllProjects()
        // eslint-disable-next-line
    }, [])
    
    return (
        <section className={`${mode==='dark'?'bg-[#0f172a]':'bg-[#f9fbff]'} projects relative font-1`}>
            <div className='pt-[7.5rem] leftShadow after:top-[420px] md:mx-[205px] mx-8'>
                <motion.div
                    variants={fadeIn('right', 0.3, 10)}
                    initial='hidden'
                    animate='show'
                    className='lineImg flex items-center justify-center text-[25px] md:text-[30px] '>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >V.</span>
                    <h2 className='text-[#94a9c9] w-fit md:w-fit mx-2'>Projects</h2>
                </motion.div>
                <div className=' items-con my-3 pt-7 flex justify-items-center items-center flex-col text-white' >

                    {myProjects.map((project,index) => (
                        <motion.div 
                        key={index}
                        variants={fadeIn('right', 0.4, 10)}
                        initial='hidden'
                        animate='show'
                        className=' item flex  flex-col justify-center items-center md:flex-row max-w-[800px] w-[115%] px-[20px] my-auto mb-[4rem] min-w-[100px]' >

                            <div className='left z-[1]    flex-1'>
                                <div className='pro-img overflow-hidden    rounded-xl  relative' >
                                    <img src={project.image} className='object-cover' alt="project1" />
                                </div>
                            </div>

                            <div className={` right pro-info rounded-lg ${mode==='dark'?'bg-[#131c31]':'bg-[#e8edf5]'}  z-[2] w-[300px] md:w-fit md:-ml-[125px] px-[3rem] py-3 right flex flex-col justify-items-center justify-center items-center flex-1`} >
                                <h1 className=' mb-3 text-xl text-[#94a9c9]  font-bold'>{project.title}</h1>
                                <p className='text-[#a3afbf] mb-3 text-sm'>{project.desc}</p>
                                <div className='font-mono mb-3 text-[#0dace4] flex'>
                                <p className='mr-3 text-sm text-center md:w-fit w-[179px]'>{project.tools}</p>



                                </div>
                                <div className=' flex relative right-[10px] ' >
                                    <a target='_blank' rel='noreferrer' className={`mr-2 text-xl  text-[25px] p-[10px] relative ${mode==='dark'?'text-white':'text-[#a3afbf]'}  hover:text-[#0dace4] transition-all duration-[0.25s] cursor-pointer `} href={project.links.github}><BsGithub /></a>
                                    <a target='_blank' rel='noreferrer' className={`mr-2 text-xl  text-[25px] p-[10px] relative   ${mode==='dark'?'text-white':'text-[#a3afbf]'}   hover:text-[#0dace4] transition-all duration-[0.25s] cursor-pointer `} href={project.links.live}><BiLinkExternal /></a>
                                </div>
                            </div>


                        </motion.div>

                    ))}




                </div>
                <div className='p-5 m-3 flex justify-center '>

                    <Link to={'/projects'} className='btn btn-hover  w-[200px]' >See More</Link>
                </div>
            </div>

            <GithubContributions/>
        </section>
    )
}

export default Projects
