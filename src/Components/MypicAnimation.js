import React, { useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../Variants'
import pattern1 from '../images/pattern-1.svg'
import pattern2 from '../images/pattern-2.svg'
import pattern3 from '../images/pattern-3.svg'
import pattern4 from '../images/pattern-4.svg'
import '../Styles/Common.css'
import mypic from '../images/myphoto1.png'
import FetchContext from '../Context/FetchContext'
export const MypicAnimation = () => {
  const { fetchUserDetails,UserDetails } = useContext(FetchContext)
  useEffect(() => {
    fetchUserDetails()
    // eslint-disable-next-line
}, [])

return (
    
         <motion.div variants={fadeIn('down', 0.9)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: true, amount: 0.7 }} className=''>
              <div
                className='myImg flex justify-center relative '>
                {/* <img className=' w-[256px] relative z-[1] md:w-[362px]' src={mypic} alt="" /> */}
                <img className=' w-[256px] relative z-[1] md:w-[362px]' src={UserDetails[0]?.userimage || mypic} alt="" />
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
    
  )
}
