import React, { useContext } from 'react'
import c from '../images/Skills/c.png'
import cplus from '../images/Skills/c++.png'
import js from '../images/Skills/js.png'
import py from '../images/Skills/py.png'
import html from '../images/Skills/html.png'
import css from '../images/Skills/css.png'
import figma from '../images/Skills/figma.png'
import git from '../images/Skills/git.png'
import github from '../images/Skills/github.png'
import react from '../images/Skills/react.png'
import node from '../images/Skills/node.png'
import express from '../images/Skills/express.png'
import mongodb from '../images/Skills/mongodb.png'
import bootstrap from '../images/Skills/bootstrap.png'
import tailwind from '../images/Skills/tailwind.png'
import ThemeContext from '../Context/ThemeContext'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../Styles/Common.css'

const Skills = () => {
    const {mode}=useContext(ThemeContext)
    const mySkills = [{ "skill": "C", "img": c },
    { "skill": "C++", "img": cplus },
    { "skill": "JS", "img": js },
    { "skill": "PYTHON", "img": py },
    { "skill": "HTML", "img": html },
    { "skill": "CSS", "img": css },
    { "skill": "FIGMA", "img": figma },
    { "skill": "GIT", "img": git },
    { "skill": "GITHUB", "img": github },
    { "skill": "REACT", "img": react },
    { "skill": "NODE JS", "img": node },
    { "skill": "EXPRESS", "img": express },
    { "skill": "MONGODB", "img": mongodb },
    { "skill": "BOOTSTRAP", "img": bootstrap },
    { "skill": "MONGODB", "img": mongodb },
    { "skill": "TAILWIND", "img": tailwind },

    ]
    const initialDelay = 0.4;
    const delayIncrement = 0.09;
    const myFirst8Skills = mySkills.slice(0, 8)
    return (

        <section className={`${mode==='dark'?'bg-[#0f172a]':'bg-[#f9fbff]'} skills relative font-1`}>
            <div className='pt-[7.5rem] leftShadow rightShadow before:top-[300px] after:top-10 md:mx-[205px] mx-8'>
                <motion.div
                    variants={fadeIn('right', 0.3, 10)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    className='lineImg flex items-center justify-center text-[25px] md:text-[30px] '>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >IV.</span>
                    <h2 className='text-[#94a9c9]  w-[2814px] text-center md:w-fit mx-2'>Skills & Expertise</h2>
                </motion.div>
                <div className=' flex relative z-[2] items-center flex-col justify-center pt-5 my-3' >
                    <motion.h1
                        variants={fadeIn('right', 0.3, 10)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.7 }}
                        className={`   ${mode==='dark'?'text-[#b9e0f2]':'text-[#94a9c9]'} my-8 text-2xl font-bold text-center md:text-justify`}>Skilled in the Use of These Technologies</motion.h1>
                    <div className=' relative w-fit grid  md:grid-cols-4 grid-cols-2 gap-3 ' >
                        {
                            myFirst8Skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeIn('right', initialDelay + index * delayIncrement, 10)}
                                    initial='hidden'
                                    whileInView={'show'}
                                    viewport={{ once: true, amount: 0.7 }}
                                    className={` ${mode==='dark'?'hover-neon':'hover-neon-light'} flex px-4 ${mode==='dark'?'bg-[#131c31]':'bg-[#e8edf5]'} border md:text-lg text-sm rounded-lg  min-w-min border-solid  ${mode==='dark'?'border-[#222f43]':'border-[#c2d4ee]'} items-center md:gap-3 gap-2`}>
                                    <img src={skill.img} alt="logo" className='w-[50px] md:w-[90px]' />
                                    <h1 className={` ${mode==='dark'?'text-[#b9e0f2]':'text-[#94a9c9]'} w-1/2 font-bold font-mono`}>{skill.skill}</h1>
                                </motion.div>
                            ))
                        }
                    </div>
                   
                    <motion.div
                        variants={fadeIn('right', 0.8, 10)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.7 }}
                        className='p-5 m-3'>

                        <Link to={'/skills'} className='btn btn-hover w-[200px] block' >See More</Link>
                    </motion.div>

                </div>
            </div>
        </section>


    )
}

export default Skills
