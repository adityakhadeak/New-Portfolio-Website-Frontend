import React from 'react'
import p1 from '../images/Projects/p1.png'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
const Projects = () => {
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
                    <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>Projects</h2>
                </motion.div>
                <div className=' items-con my-3 pt-7 text-white' >
                    <div className='flex justify-items-center items-center items' >

                        <div className='z-[1] left'>
                            <div className='' >
                                <img src={p1} className=' relative pro-img max-w-lg overflow-hidden rounded-xl' alt="project1" />
                            </div>
                        </div>

                        <div className='rounded-lg bg-[#131c31] z-[2] -ml-[125px] h-[200px] p-[5rem] min-w-[100px] right flex flex-col justify-items-center justify-center'>
                            <h1 className='text-[#b9e0f2] my-1 text-lg @apply gradient-text font-bold'>Movies Explorer</h1>
                            <p className='text-[#66768d] my-1 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, dolorem pariatur. Dolores cum quaerat minus dolor, rerum soluta labore harum?</p>
                            <div className='my-1'>
                                <button className='btn btn-hover p-1 m-3'><a href="">Know More</a></button>
                                <button className='btn btn-hover p-1 m-3'><a href="">Go live</a></button>
                            </div>
                        </div>


                    </div>


                </div>
                <div className='p-5 m-3'>

                    <button className='btn btn-hover w-[200px]' >See More</button>
                </div>
            </div>
        </section>
    )
}

export default Projects
