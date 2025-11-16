import React, { useContext, useEffect } from 'react'


import '../Styles/Projects.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import '../Styles/Common.css'
import ThemeContext from '../Context/ThemeContext';
import GithubContributions from './GithubContributions';
import FetchContext from '../Context/FetchContext';
const AchievementSection = () => {
    const { mode } = useContext(ThemeContext)
    // const Projects = [{ title: "Movies Explorer", desc: "This a website which allows user to browse movies and tv shows. It uses TMDB api and fetches info from there and shows here.", tool: { "1st": "API", "2nd": "HTML", "3rd": "CSS", "4th": "JS" }, links: { github: "https://github.com/adityakhadeak/AK-Movies-Explorer", live: "https://adityakhadeak.github.io/AK-Movies-Explorer/" },img:p1 },
    // { title: "NoteIT Web App", desc: "This a website which allows user to save the short notes. It also uses the local storage to store the notes. Its is build with React-Reducx", tool: { "1st": "React", "2nd": "Redux", "3rd": "Bootstrap" }, links: { github: "https://github.com/adityakhadeak/NoteIT_Web_App", live: "https://noteit-react-redux-byak.netlify.app/" },img:p2 },
    // ]
    return (
        <section className={`${mode === 'dark' ? 'bg-[#0f172a]' : 'bg-[#f9fbff]'} projects relative font-1`}>
            <div className='pt-[7.5rem] leftShadow after:top-[420px] md:mx-[205px] mx-8'>
                <motion.div
                    variants={fadeIn('right', 0.3, 10)}
                    initial='hidden'
                    animate='show'
                    className='lineImg flex items-center justify-center text-[25px] md:text-[30px] '>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >VI.</span>
                    <h2 className='text-[#94a9c9] w-fit md:w-fit mx-2'>Achievements & Badges</h2>
                </motion.div>
                <div className=' items-con my-3 pt-7 flex justify-items-center items-center flex-col text-white' >

                </div>
                <div className='p-5 m-3 flex justify-center '>

                    <Link to={'/projects'} className='btn btn-hover  w-[200px]' >See More</Link>
                </div>
            </div>

        </section>
    )
}

export default AchievementSection
