import React from 'react'
import '../Styles/AboutSection.css'
import '../Styles/Common.css'

import abtImg from "../images/about.png"
import { motion } from 'framer-motion'
import { fadeIn } from '../Variants'
import { Link } from 'react-router-dom'
const AboutSection = () => {
    const abtMe = [{ "para": "👋 Hi there,🌐 I'm a third-year computer engineering student who's passionate about crafting websites. I'm familiar with HTML, CSS, and JavaScript. Additionally, I work with the MERN stack (MongoDB, Express.js, React, Node.js) and have some exposure to MySQL.", "animIn": 0.5 },
    { "para": "🧠 When I'm not building websites, you can find me tackling coding challenges on platforms like LeetCode. I enjoy sharpening my problem-solving skills and thinking algorithmically.", "animIn": 0.6 },
    { "para": "🛠️ While I'm still on my journey, I've worked on various projects that have helped me grasp the essentials of web development, especially in learning React. Each project has been a stepping stone in my growth as a developer.", "animIn": 0.7 },
    { "para": "🚀 I'm committed to continuous learning, always seeking out new technologies and challenges. My path is all about progress and exploration.", "animIn": 0.7 },
    { "para": "🛠️ Curious to see some of my work? Take a look at my portfolio!", "animIn": 0.8 }
    ]
    return (
        <>
            <section className='aboutsection'>
                <div className='bg-[#0f172a] relative font-1'>
                    <div className='pt-[7.5rem] md:ml-[205px] leftShadow after:top-[300px] md:mr-[145px] mx-8'>
                        <motion.div
                            variants={fadeIn('left', 0.5)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: true, amount: 0.7 }}
                            className='lineImg flex items-center text-[25px] md:text-[30px]  '>
                            <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >I.</span>
                            <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>About Me</h2>
                        </motion.div>
                        <div className='  flex md:flex-wrap-reverse flex-col-reverse md:flex-row justify-between  items-center'>
                            <div className='text-[#94a9c9] my-5 w-[fit] leading-7  font-mono'>
                                {abtMe.map((para) => {
                                    return <motion.p variants={fadeIn('up', para.animIn)}
                                        initial='hidden'
                                        whileInView={'show'}
                                        viewport={{ once: true, amount: 0.7 }} className='m-0 w-fit md:w-[500px] text-justify mb-3'>{para.para} </motion.p>
                                })
                                }

                            </div>
                            <motion.div
                                variants={fadeIn('down', 0.6)}
                                initial='hidden'
                                whileInView={'show'}
                                viewport={{ once: true, amount: 0.7 }}
                                className='abtImgCon flex justify-center  relative'>
                                <img src={abtImg} className='abt-image max-w-[18rem] md:max-w-[28rem] w-[100%]' alt="" />
                            </motion.div>
                        </div>
                        <motion.div
                            variants={fadeIn('up', 0.7)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: true, amount: 0.7 }}
                            className='my-1'>
                            <Link to={'/about'} className='btn btn-hover' >Know More</Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutSection
