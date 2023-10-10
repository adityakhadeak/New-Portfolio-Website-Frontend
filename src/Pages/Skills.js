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
import ScrollToTopOnReload from '../CustomHooks/ScrollToTopOnReload'
import ThemeContext from '../Context/ThemeContext'
import NavFixContext from '../Context/NavFixContext'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import '../Styles/Common.css'

const Skills = () => {
    const {mode}=useContext(ThemeContext)
    const {isFixed}=useContext(NavFixContext)
    ScrollToTopOnReload()
    document.title = "Aditya's Portfolio | Skills"

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
    const myCer = [{ "title": "Python", "desc": "This is the course i did in holidays akfjakfjakls facnashas oafssn cnasjdha lsflkas csfs dkd lfafns", "date": "10-08-2023", "platform": "Kaggle", "label": { "1st": "Course" }, "doc": "https://drive.google.com/file/d/13iEc0lBA2MDqyjVxDK45X4NfO3gc6xdz/view?usp=drive_link" },
    { "title": "Python", "desc": "This is the course i did in holidays akfja fjakls acnashas oafssncn sjdh alsflkas csfsdkd lfafns", "date": "10-08-2023", "platform": "Kaggle", "label": { "1st": "Course" }, "doc": "https://drive.google.com/file/d/13iEc0lBA2MDqyjVxDK45X4NfO3gc6xdz/view?usp=drive_link" },
    { "title": "Python", "desc": "This is the course i did in holidays akfja fjakls acnashas oafssncn sjdh lsflkas csfsdkd lfafns", "date": "10-08-2023", "platform": "Kaggle", "label": { "1st": "Course" }, "doc": "https://drive.google.com/file/d/13iEc0lBA2MDqyjVxDK45X4NfO3gc6xdz/view?usp=drive_link" },
    { "title": "Python", "desc": "This is the course i did in holidays akfja fjakls acnashas oafssncn sjdh lsflkas csfsdkd lfafns", "date": "10-08-2023", "platform": "Kaggle", "label": { "1st": "Course" }, "doc": "https://drive.google.com/file/d/13iEc0lBA2MDqyjVxDK45X4NfO3gc6xdz/view?usp=drive_link" },
    { "title": "Python", "desc": "This is the course i did in holidays akfja fjakls acnashas oafssncn sjdh lsflkas csfsdkd lfafns", "date": "10-08-2023", "platform": "Kaggle", "label": { "1st": "Course" }, "doc": "https://drive.google.com/file/d/13iEc0lBA2MDqyjVxDK45X4NfO3gc6xdz/view?usp=drive_link" },

    ]

    const initialDelay = 0.4;
    const delayIncrement = 0.09;
    return (

        <section className={`${mode==='dark'?'bg-[#0f172a]':'bg-[#f9fbff]'} skills relative font-1`}>
            <div className={`pt-[3rem] leftShadow rightShadow before:top-[300px] after:top-10 ${isFixed?"md:mt-[86px]":""} md:mx-[205px] mx-8`}>
                <motion.div
                    variants={fadeIn('right', 0.3, 10)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    className='lineImg flex items-center justify-center text-[25px] md:text-[30px] '>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >IV.</span>
                    <h2 className='text-[#94a9c9]  w-fit md:w-fit mx-2'>Skills & Expertise</h2>
                </motion.div>
                <div className=' flex relative z-[1] items-center flex-col justify-center pt-5 my-3' >
                    <motion.h1
                        variants={fadeIn('right', 0.3, 10)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.7 }}
                        className={`${mode==='dark'?'text-[#b9e0f2]':'text-[#94a9c9]'} my-8 text-2xl font-bold  text-justify`}>Skilled in the Use of These Technologies</motion.h1>                    <div className=' relative w-fit grid  md:grid-cols-4 grid-cols-2 gap-3 ' >
                        {
                            mySkills.map((skill, index) => (
                                <motion.div
                                    variants={fadeIn('right', initialDelay + index * delayIncrement, 10)}
                                    initial='hidden'
                                    whileInView={'show'}
                                    viewport={{ once: true, amount: 0.7 }}
                                    className={` ${mode==='dark'?'hover-neon':'hover-neon-light'} flex px-4 ${mode==='dark'?'bg-[#131c31]':'bg-[#e8edf5]'} md:flex-row text-center flex-col border md:text-lg text-sm rounded-lg  min-w-min border-solid  ${mode==='dark'?'border-[#222f43]':'border-[#c2d4ee]'} items-center md:gap-3 gap-2`}>
                                    <img src={skill.img} alt="logo" className='w-[40px] p-1 md:w-[90px]' />
                                    <h1 className={` ${mode==='dark'?'text-[#b9e0f2]':'text-[#94a9c9] '} w-1/2 font-bold font-mono`}>{skill.skill}</h1>
                                </motion.div>
                            ))
                        }
                    </div>
                    <motion.h1
                        variants={fadeIn('right', 2, 10)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.7 }}
                        className={`${mode==='dark'?'text-[#b9e0f2]':'text-[#94a9c9]'} my-8 text-2xl font-bold  text-justify`}>And many more.....
                    </motion.h1>

                </div>
                <div className='flex justify-center flex-col'>
                    <motion.div
                        variants={fadeIn('right', 0.3, 10)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.7 }}
                        className='lineImg flex items-center justify-center text-[25px] mt-[30px] pt-[45px] md:text-[30px] '>
                        <h2 className='text-[#94a9c9]  w-fit md:w-fit text-center mx-2'>Some Certifications and Achievements</h2>
                    </motion.div>
                    <div className=' flex relative z-[1] items-center flex-col justify-center pt-5 my-3' >
                        <motion.div
                            variants={fadeIn('right', 0.3, 10)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: true, amount: 0.7 }}
                            className='flex items-center justify-center text-[20px] my-2 py-3  md:text-[20px] '>
                            <h2 className='text-[#94a9c9]  w-fit md:w-fit mx-2'>Certifications</h2>
                        </motion.div>
                        <div className=' relative w-fit grid  md:grid-cols-3 grid-cols-1 gap-5 ' >
                            {
                                myCer.map((cer, index) => (
                                    <motion.div
                                        variants={fadeIn('right', initialDelay + index * delayIncrement, 10)}
                                        initial='hidden'
                                        whileInView={'show'}
                                        viewport={{ once: true, amount: 0.7 }}
                                        className={` text-[#94a9c9]  p-4 my-2 leading-8 rounded-3xl h-[fit]  w-fit md:w-[300px]  justify-center flex flex-col border-2 border-solid ${mode==='dark'?'border-[#222f43]':'border-[#c2d4ee]'} ${mode==='dark'?'bg-[#131c31]':'bg-[#e8edf5]'}`}>
                                        <h4 className='text-[#66768d] text-sm @apply gradient-text font-bold'>{cer.date}</h4>
                                        <h2 className={`${mode==='dark'?'text-[#b9e0f2]':'text-[#1cc2e7]'} text-xl font-bold`}>{cer.title}</h2>
                                        <p className={` font-mono  text-[17px] hover:text-[#0ea0e4] ${mode==='dark'?'text-[#b9e0f2]':'text-[#0dace4]'} transition-all duration-75`}>{cer.platform}</p>
                                        <p className='font-mono text-[15px] text-justify my-2'>{cer.desc}</p>
                                        <div className='font-mono mb-3 text-[#0dace4] flex'>
                                            <p className='mr-3 text-sm'>{cer.label['1st']}</p>
                                            <p className='mr-3 text-sm'>{cer.label['2nd']}</p>

                                        </div>
                                        <a href={cer.doc} target='_blank' rel="noreferrer" className='text-[#0ea0e4] font-mono'>Certificate</a>
                                    </motion.div>
                                ))
                            }



                        </div>


                    </div>
                </div>

            </div>


        </section>


    )
}

export default Skills
