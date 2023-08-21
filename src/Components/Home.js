import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import pattern1 from '../images/pattern-1.svg'
import pattern2 from '../images/pattern-2.svg'
import pattern3 from '../images/pattern-3.svg'
import pattern4 from '../images/pattern-4.svg'

import '../Styles/Home.css'
import mypic from '../images/myphoto1.png'
const Home = () => {

  return (
    <div className='   bg-[#0f172a]'>
      <div className='  pt-[6.5rem]  mx-8 md:mx-20'>
        <div className='relative  justify-evenly md:justify-around flex flex-col md:flex-row'>
          <div className='homeback w-fit md:w-[459px] flex flex-col'>
            <h4 className='text-[#94a9c9] text-base md:text-lg w-fit font-mono my-2 font-bold'>{"<> Hello World !</>"}</h4>
            <div className=' w-fit flex flex-col my-2 '>
              <h1 className=' my-3 text-white font-[Ubuntu] text-4xl md:text-6xl' >I’m</h1>
              <h1 className=' my-3 h-[102px] md:h-fit @apply gradient-text w-fit font-[Ubuntu] text-4xl md:text-6xl text-[#94a9c9] '><Typewriter
                words={["Aditya Khade", "Web Developer", "Learner"]}
                loop={''}
                cursor
                cursorStyle='|'
                cursorColor='white'
                typeSpeed={50}
                deleteSpeed={50}
              />
              </h1>
            </div>
            <p className="text-[#94a9c9] my-3 font-mono w-fit  md:w-[22rem]">I'm a Third Year Computer  Engineering Student at PCE, Navi-Mumbai. Primarily interested in Web Development and CP.</p>
          </div>
          <div className=''>
            <div className='myImg flex justify-center relative '>
              <img className=' w-[256px] relative z-[1] md:w-[362px]' src={mypic} alt="" />
              <div className="pattern-1 left-0 absolute top-[112px] ">
                <img className='relative'  src={pattern1} alt="" />
              </div>
              <div className="pattern-2 absolute top-[70px] right-[40px] md:right-[73]">
                <img className='relative' src={pattern2} alt="" />
              </div>
              <div className="pattern-3 absolute -left-[15px] bottom-[70px]">
                <img className='relative' src={pattern3} alt="" />
              </div>
              <div className="pattern-4 absolute -right-[23px] bottom-[95px] md:-right-[48px]">
                <img className='relative' src={pattern4} alt="" />
              </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
