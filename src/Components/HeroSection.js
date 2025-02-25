import React, { useContext, useEffect, useState } from 'react'

import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion'
import { fadeIn } from '../Variants'
import ThemeContext from '../Context/ThemeContext';
import { Link } from 'react-router-dom';
import '../Styles/Home.css'
import SideLinks from './SideLinks'
import { MypicAnimation } from './MypicAnimation'
import NavFixContext from '../Context/NavFixContext';
import FetchContext from '../Context/FetchContext';

const Home = () => {
  const { mode } = useContext(ThemeContext)
  const {  UserDetails,fetchUserDetails } = useContext(FetchContext)
  const { isFixed } = useContext(NavFixContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetchUserDetails()
    if (localStorage.getItem('token') == null) {
      setIsLoggedIn(false)
    }
    else {
      setIsLoggedIn(true)
    }
    // eslint-disable-next-line
  }, [])
  
  const userName = UserDetails[0]?.name || 'Aditya Khade';
  const userProf1 = UserDetails[0]?.prof['1st'] || 'Web Developer';
  const userProf2 = UserDetails[0]?.prof['2nd'] || 'Code Enthusiast';
  const userProf3 = UserDetails[0]?.prof['3nd'] || 'Learner';

  return (
    <>
      <div className={`  ${mode === 'dark' ? 'bg-[#0f172a]' : 'bg-[#f9fbff]'} font-1`}>
        <div className={`  pt-[3rem] mx-8 ${isFixed ? "md:mt-[106px] mt-[86px]" : "md:mt-5"}  md:mx-20`}>
          <div className='relative  justify-evenly md:justify-around flex flex-col md:flex-row'>
            <div className='homeback w-fit md:w-[459px] flex flex-col'>
              <motion.h4 variants={fadeIn('up', 0.8)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.5 }} className='text-[#94a9c9] text-base md:text-lg w-fit font-mono my-2 font-bold'>{"<> Hello World !</>"}
              </motion.h4>
              <motion.div
                variants={fadeIn('up', 0.9)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.5 }} className='z-[2] w-fit flex flex-col my-2 '>
                <div>
                  <h1 className={`  ${mode === 'dark' ? 'text-white ' : 'text-[#344161]'}  text-4xl md:text-3xl`} >My name is</h1>
                  <Link to={!isLoggedIn ? '/login' : '/dashboard/adminprofile'} className=' my-2 @apply gradient-text font-bold text-5xl md:text-[3.75rem] leading-[1.5]' >{userName}</Link>
                  {/* <Link to={!isLoggedIn ? '/login' : '/dashboard/adminprofile'} className=' my-2 @apply gradient-text font-bold text-5xl md:text-[3.75rem] leading-[1.5]' >Aditya Khade</Link> */}
                </div>
                <div className='my-3'>
                  <h1 className={` ${mode === 'dark' ? 'text-white ' : 'text-[#344161]'}   text-4xl md:text-3xl`}>I’m a</h1>
                  <h1 className=' my-3 h-[130px] md:h-fit @apply gradient-text w-fit md:w-[550px] font-bold text-5xl md:text-6xl leading-[1.5] text-[#94a9c9] '><Typewriter

                    // words={[`${UserDetails[0].prof['1st']}`, `${UserDetails[0].prof['2nd']}`, `${UserDetails[0].prof['3rd']}`, `${UserDetails[0].prof['1st']}` ? `${UserDetails[0].prof['1st']}` : '']}
                    // words={[`Web Developer`, `Coder`, `Learner`]}
                    words={[userProf1, userProf2, userProf3]}
                    loop={''}
                    cursor
                    cursorStyle='|'
                    cursorColor='white'
                    typeSpeed={40}
                    deleteSpeed={40}
                  />
                  </h1>
                </div>
              </motion.div>
              <motion.p
                variants={fadeIn('up', 1)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.5 }}
                className="text-[#94a9c9]  font-mono w-fit  md:w-[22rem]">A Final Year Computer  Engineering Student at PCE, Navi-Mumbai. Primarily interested in Web/App Development and CP.</motion.p>
            </div>
            <MypicAnimation />
          </div>
        </div>
      </div>
      <SideLinks />
    </>
  )
}

export default Home
