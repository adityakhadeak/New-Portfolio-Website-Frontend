import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion'
import { fadeIn } from '../Variants'
import pattern1 from '../images/pattern-1.svg'
import pattern2 from '../images/pattern-2.svg'
import pattern3 from '../images/pattern-3.svg'
import pattern4 from '../images/pattern-4.svg'
import '../Styles/Home.css'
import mypic from '../images/myphoto1.png'
import SideLinks from './SideLinks'
const Home = () => {

  return (
    <>
      <div className='   bg-[#0f172a]'>
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
                <h1 className=' text-white font-[Ubuntu] text-2xl md:text-3xl' >My name is</h1>
                <h1 className=' my-2 @apply gradient-text font-[Ubuntu] text-4xl md:text-6xl' >Aditya Khade</h1>
                </div>
                <div className='my-3'>
                <h1 className=' text-white font-[Ubuntu] text-2xl md:text-3xl' >I’m a</h1>
                <h1 className=' my-3 h-[80px] md:h-fit @apply gradient-text w-fit font-[Ubuntu] text-4xl md:text-6xl text-[#94a9c9] '><Typewriter

                  words={["Web Developer","Coder", "Learner"]}
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
            <motion.div variants={fadeIn('down', 0.9)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: true, amount: 0.7 }} className=''>
              <div
                className='myImg flex justify-center relative '>
                <img className=' w-[256px] relative z-[1] md:w-[362px]' src={mypic} alt="" />
                <motion.div
                  variants={fadeIn('inplace', 1.5)}
                  initial='hidden'
                  whileInView={'show'}
                  viewport={{ once: true, amount: 0.7 }}
                  className="pattern-1 left-0 absolute top-[112px] ">
                  <img className='relative' src={pattern1} alt="" />
                </motion.div>
                <motion.div
                variants={fadeIn('inplace', 1.5)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.7 }}
                className="pattern-2 absolute top-[70px] right-[40px] md:right-[73]">
                  <img className='relative' src={pattern2} alt="" />
                </motion.div>
                <motion.div
                variants={fadeIn('inplace', 1.5)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.7 }}
                className="pattern-3 absolute -left-[15px] bottom-[70px]">
                  <img className='relative' src={pattern3} alt="" />
                </motion.div>
                <motion.div 
                variants={fadeIn('inplace', 1.5)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.7 }}
                className="pattern-4 absolute -right-[23px] bottom-[95px] md:-right-[48px]">
                  <img className='relative' src={pattern4} alt="" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <SideLinks />
    </>
  )
}

export default Home