import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion'
import { fadeIn } from '../Variants'

import '../Styles/Home.css'
import SideLinks from './SideLinks'
import { MypicAnimation } from './MypicAnimation'
const Home = () => {

  return (
    <>
      <div className='   bg-[#0f172a] font-1'>
        <div className='  pt-[7rem] md:mt-5 mx-8 md:mx-20'>
          <div className='relative  justify-evenly md:justify-around flex flex-col md:flex-row'>
            <div className='homeback w-fit md:w-[459px] flex flex-col'>
              <motion.h4 variants={fadeIn('up', 0.8)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.7 }} className='text-[#94a9c9] text-base md:text-lg w-fit font-mono my-2 font-bold'>{"<> Hello World !</>"}
              </motion.h4>
              <motion.div
                variants={fadeIn('up', 0.9)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.7 }} className=' w-fit flex flex-col my-2 '>
                <div>
                  <h1 className=' text-white   text-2xl md:text-3xl' >My name is</h1>
                  <h1 className=' my-2 @apply gradient-text font-bold text-4xl md:text-[3.75rem] leading-[1.5]' >Aditya Khade</h1>
                </div>
                <div className='my-3'>
                  <h1 className=' text-white   text-2xl md:text-3xl' >I’m a</h1>
                  <h1 className=' my-3 h-[80px] md:h-fit @apply gradient-text w-fit md:w-[550px] font-bold text-4xl md:text-6xl leading-[1.5] text-[#94a9c9] '><Typewriter

                    words={["Web Developer", "Coder", "Learner"]}
                    loop={''}
                    cursor
                    cursorStyle='|'
                    cursorColor='white'
                    typeSpeed={50}
                    deleteSpeed={50}
                  />
                  </h1>
                </div>
              </motion.div>
              <motion.p
                variants={fadeIn('up', 1)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.7 }}
                className="text-[#94a9c9]  font-mono w-fit  md:w-[22rem]">A Third Year Computer  Engineering Student at PCE, Navi-Mumbai. Primarily interested in Web Development and CP.</motion.p>
            </div>
            <MypicAnimation/>
          </div>
        </div>
      </div>
      <SideLinks />
    </>
  )
}

export default Home
