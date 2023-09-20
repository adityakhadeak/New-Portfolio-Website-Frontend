import React from 'react'
import p1 from '../images/Projects/p1.png'
import { BsGithub } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import '../Styles/Projects.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import GitHubCalendar from 'react-github-calendar';

const Projects = () => {

    const customTheme = {
        light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
        dark: ['#607D8B', '#42A5F5', '#1E88E5', '#1976D2', '#0D47A1'],
      };
      
      console.log(customTheme);
      

    const Projects = [{ title: "Movies Explorer", desc: "This a website which allows user to browse movies and tv shows. It uses TMDB api and fetches info from there and shows here.", tool: { "1st": "API", "2nd": "HTML", "3rd": "CSS", "4th": "JS" }, links: { github: "https://github.com/adityakhadeak/AK-Movies-Explorer", live: "https://adityakhadeak.github.io/AK-Movies-Explorer/" } },
    { title: "NoteIT Web App", desc: "This a website which allows user to save the short notes. It also uses the local storage to store the notes. Its is build with React-Reducx", tool: { "1st": "React", "2nd": "Redux", "3rd": "Bootstrap" }, links: { github: "https://github.com/adityakhadeak/NoteIT_Web_App", live: "https://noteit-react-redux-byak.netlify.app/" } }
    ]
    return (
        <section className='projects'>
            <div className='pt-[7.5rem] md:mx-[205px] mx-8'>
                <motion.div
                    variants={fadeIn('right', 0.3, 10)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    className='lineImg flex items-center justify-center text-[25px] md:text-[30px] font-[Ubuntu]'>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >V.</span>
                    <h2 className='text-[#94a9c9] w-fit md:w-fit mx-2'>Projects</h2>
                </motion.div>
                <div className=' items-con my-3 pt-7 flex justify-items-center items-center flex-col text-white' >

                    {Projects.map((project) => (
                        <div className=' item flex  flex-col justify-center items-center md:flex-row max-w-[800px] my-auto mb-[4rem]' >

                            <div className='left z-[1]    flex-1'>
                                <div className='pro-img overflow-hidden    rounded-xl  relative' >
                                    <img src={p1} className='object-cover' alt="project1" />
                                </div>
                            </div>

                            <div className=' right pro-info rounded-lg bg-[#131c31] z-[2] w-[300px] md:w-fit md:-ml-[125px] px-[3rem] py-3 right flex flex-col justify-items-center justify-center flex-1' >
                                <h1 className=' mb-3 text-xl text-[#94a9c9]  font-bold'>{project.title}</h1>
                                <p className='text-[#a3afbf] mb-3 text-sm'>{project.desc}</p>
                                <div className='font-mono mb-3 text-[#0dace4] flex'>
                                    <p className='mr-3 text-sm'>{project.tool['1st']}</p>
                                    <p className='mr-3 text-sm'>{project.tool['2nd']}</p>
                                    <p className='mr-3 text-sm'>{project.tool['3rd']}</p>
                                    <p className='mr-3 text-sm'>{project.tool['4th']}</p>


                                </div>
                                <div className=' flex relative right-[10px] ' >
                                    <a target='_blank' className='mr-2 text-xl  text-[25px] p-[10px] relative  hover:text-[#0dace4] transition-all duration-[0.25s] cursor-pointer ' href={project.links.github}><BsGithub /></a>
                                    <a target='_blank' className='mr-2 text-xl  text-[25px] p-[10px] relative  hover:text-[#0dace4] transition-all duration-[0.25s] cursor-pointer ' href={project.links.live}><BiLinkExternal /></a>
                                </div>
                            </div>


                        </div>

                    ))}




                </div>
                <div className='p-5 m-3 flex justify-center '>

                    <button className='btn btn-hover  w-[200px]' >See More</button>
                </div>
            </div>
            <h2 className='text-[#94a9c9] text-center text-[15px] md:text-[20px] font-mono py-4 my-7 mx-2'>GitHub Contribution Graph</h2>

            <div className='flex justify-center text-white items-center'>
                <GitHubCalendar username="adityakhadeak" colorScheme='dark' theme={customTheme} />
            </div>
        </section>
    )
}

export default Projects
