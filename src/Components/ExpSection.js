import React, {  } from 'react'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
const ExpSection = () => {
    const myExp = [{ "duration": "Feb 2023 to May 2023", "title": "Full Stack Web Development", "company": "Innomatics Research Labs", "techStack": "HTML5, CSS, Javascript, ReactJs, MongoDb, NodeJs, Express etc..", "link": "https://www.innomatics.in/","doc":"https://drive.google.com/file/d/13iEc0lBA2MDqyjVxDK45X4NfO3gc6xdz/view?usp=drive_link" }
    ]
    return (
        <div>
            <div className='font-1'>
                <div className='pt-[7.5rem] md:mx-[205px] mx-8'>
                    <motion.div
                        variants={fadeIn('right', 0.3,10)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.7 }}
                        className='lineImg flex items-center justify-start text-[25px] md:text-[30px] '>
                        <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >III.</span>
                        <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>Experience</h2>
                    </motion.div>
                    <div className='edu-TimeLine-Con flex items-center md:justify-start justify-center pt-5 my-3' >
                        <div className='timeLine relative w-fit  items-center justify-center flex flex-col ml-4' >
                            {
                                myExp.map((exp) => (
                                    <motion.div
                                        variants={fadeIn('right', 0.4,10)}
                                        initial='hidden'
                                        whileInView={'show'}
                                        viewport={{ once: true, amount: 0.7 }}
                                        className=' text-[#94a9c9] timeLine-item p-4 my-2 leading-8 rounded-3xl h-[fit]  w-[60vw] md:w-[500px]  justify-center flex flex-col border-2 border-solid border-[#222f43] bg-[#141f35]'>
                                        <h4 className='text-[#66768d] text-sm @apply gradient-text font-bold'>{exp.duration}</h4>
                                        <h2 className='text-[#b9e0f2] text-xl font-bold'>{exp.title}</h2>
                                        <a href={exp.link} rel="noreferrer" target='_blank' className=' font-mono text-[#b9e0f2] text-[17px] hover:text-[#0ea0e4] transition-all duration-75'>{exp.company}</a>
                                        <h3 className='font-mono text-[15px]'>{exp.techStack}</h3>
                                        <a href={exp.doc} target='_blank' rel="noreferrer" className='text-[#0ea0e4] font-mono'>Certificate</a>
                                    </motion.div>

                                ))
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpSection
