import React from 'react'
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

import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
const Skills = () => {
    const mySkills = [{ "skill": "C", "img": c },
    { "skill": "C++", "img": cplus },
    { "skill": "JAVASCRIPT", "img": js },
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

    const myFirst8Skills=mySkills.slice(0,8)
    return (
        <div>
            <div>
                <div className=''>
                    <div className='pt-[7.5rem] md:mx-[205px] mx-8'>
                        <motion.div
                            variants={fadeIn('right', 0.3, 10)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: true, amount: 0.7 }}
                            className='lineImg flex items-center justify-center text-[25px] md:text-[30px] font-[Ubuntu]'>
                            <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >IV.</span>
                            <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>Skills & Expertise</h2>
                        </motion.div>
                        <div className=' flex items-center flex-col justify-center pt-5 my-3' >
                            <h1 className='text-[#b9e0f2] my-8 text-2xl font-bold font-mono'>Skilled in the Use of These Technologies</h1>
                            <div className=' relative w-fit grid  md:grid-cols-4 grid-cols-2 gap-3 ml-4' >
                                {
                                    myFirst8Skills.map((skill) => (
                                        <div className=' hover-neon flex p-3 bg-[#131c31] border rounded-lg gap-x-10 border-solid border-[#222f43]  justify-center items-center'>
                                            <img src={skill.img} alt="logo" className='w-[96px]' />
                                            <h1 className='text-[#b9e0f2] text-xl font-bold font-mono'>{skill.skill}</h1>
                                        </div>
                                    ))
                                }


                                
                            </div>
                            <div className='p-5 m-3'>

                                <button className='btn btn-hover w-[200px]' >See More</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Skills
