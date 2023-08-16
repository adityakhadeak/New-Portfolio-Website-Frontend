import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import bg1 from '../images/shadow.svg'
import mypic from '../images/myphoto1.png'
const Home = () => {

  return (
    <div className='bg-[#0f172a]'>
      <div className='pt-[6.5rem]  mx-8 md:mx-20'>
        <div className='  justify-evenly md:justify-around flex flex-col md:flex-row'>
          <div className='w-fit md:w-[459px] flex flex-col'>
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
            <p className="text-[#94a9c9] my-3 font-mono w-[13rem]  md:w-[22rem]">I'm a Third Year Computer  Engineering Student at PCE, Navi-Mumbai. Primarily interested in Web Development and CP.</p>
          </div>
          <div>
          <div><img className='w-56' src={mypic} alt="" /></div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Home
