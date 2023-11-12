import React, { useContext, useEffect } from 'react'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import expImg from '../images/exp.png'
import ThemeContext from '../Context/ThemeContext'

import '../Styles/Common.css'
import FetchContext from '../Context/FetchContext'
const ExpSection = () => {
    const {mode}=useContext(ThemeContext)
    const {Exps,fetchExps}=useContext(FetchContext)

    // const myExp = [{ "duration": "Feb 2023 to May 2023", "title": "Full Stack Web Development", "company": "Innomatics Research Labs", "techStack": "HTML5, CSS, Javascript, ReactJs, MongoDb, NodeJs, Express etc..", "link": "https://www.innomatics.in/", "doc": "https://drive.google.com/file/d/13iEc0lBA2MDqyjVxDK45X4NfO3gc6xdz/view?usp=drive_link" }
    // ]

    useEffect(() => {
        fetchExps()
        // eslint-disable-next-line
       }, [])
    return (
        <div>
            <div className={`${mode==='dark'?'bg-[#0f172a]':'bg-[#f9fbff]'} font-1 relative`}>
                <div className='pt-[7.5rem] leftShadow after:top-6 md:mx-[205px] mx-8'>
                    <motion.div
                        variants={fadeIn('right', 0.3, 10)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.7 }}
                        className='lineImg flex items-center md:justify-start justify-center text-[25px] md:text-[30px] '>
                        <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >III.</span>
                        <h2 className='text-[#94a9c9] w-fit md:w-fit mx-2'>Experience</h2>
                    </motion.div>
                    <div className='edu-TimeLine-Con flex md:flex-row flex-col items-center md:justify-between justify-center pt-5 my-3' >
                        
                        <div className='timeLine  relative w-fit  z-[2] items-center justify-center flex flex-col ml-4' >
                            {
                                Exps.map((exp,index) => (
                                    <motion.div
                                    key={index}
                                        variants={fadeIn('right', 0.4, 10)}
                                        initial='hidden'
                                        whileInView={'show'}
                                        viewport={{ once: true, amount: 0.7 }}
                                        className={` text-[#94a9c9] timeLine-item p-4 my-2 leading-8 rounded-3xl h-[fit]  w-[60vw] md:w-[500px]  justify-center flex flex-col border-2 border-solid  ${mode==='dark'?'border-[#222f43]':'border-[#c2d4ee]'} ${mode==='dark'?'bg-[#131c31]':'bg-[#e8edf5]'} `}>
                                        <h4 className='text-[#66768d] text-sm @apply gradient-text font-bold'>{exp.duration}</h4>
                                        <h2 className={` ${mode==='dark'?'text-[#b9e0f2]':'text-[#1cc2e7]'} text-xl font-bold`}>{exp.title}</h2>
                                        <a href={exp.link} rel="noreferrer" target='_blank' className={` font-mono  ${mode==='dark'?'text-[#b9e0f2]':'text-[#0dace4]'} text-[17px] hover:text-[#0ea0e4] transition-all duration-75`}>{exp.company}</a>
                                        <h3 className='font-mono text-[15px]'>{exp.techstack}</h3>
                                        <a href={exp.doc} target='_blank' rel="noreferrer" className='text-[#0ea0e4] font-mono'>Certificate</a>
                                    </motion.div>

                                ))
                            }


                        </div>
                        <motion.div
                            variants={fadeIn('down', 0.6)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: true, amount: 0.7 }}
                            className='eduImgCon flex justify-center  relative'>
                            <img src={expImg} className='edu-image max-w-[18rem] md:max-w-[28rem] w-[90%] my-12' alt="" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpSection
