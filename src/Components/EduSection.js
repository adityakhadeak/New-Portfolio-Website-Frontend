import React from 'react'
import {fadeIn} from '../Variants'
import {motion} from 'framer-motion'
const ExSection = () => {
  const myEdu = [{ "year": "2021-2025", "clg": "Pillai College Of Engineering", "edu": "Btech in Computer Engineering","sts":"Currently in Third Year. Building Projects","link":"https://www.pce.ac.in/" },
  { "year": "2019-2021", "clg": "Pace IIT & Medical Institute", "edu": "Senior Secondary Education","sts":"Completed in 2021 with 92% in 12th","link":"https://oldwebsite.iitianspace.com/"},
  { "year": "2010-2019", "clg": "Holy Writ High School", "edu": "Seconday Education","sts":"Completed in 2019 with 92% in 10th (CBSE)","link":"https://holywritschool.in/" }]
  return (
    <div className=''>
      <div className='pt-[7.5rem] md:mx-[205px] mx-8'>
        <motion.div
        variants={fadeIn('up', 0.2)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: true, amount: 0.7 }}
        className='lineImg flex items-center justify-center text-[25px] md:text-[30px] font-[Ubuntu]'>
          <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >II.</span>
          <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>Education</h2>
        </motion.div>
        <div className='edu-TimeLine-Con flex items-center justify-center pt-5 my-3' >
          <div className='timeLine relative w-fit items-center justify-center flex flex-col ml-4' >
            {
              myEdu.map((edu) => (
                <motion.div 
                variants={fadeIn('down', 0.3)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: true, amount: 0.7 }}
                className=' text-[#94a9c9] timeLine-item  p-2 my-2 leading-8 rounded-3xl h-[150px]  w-[60vw] md:w-[500px] justify-center flex flex-col border-2 border-solid border-[#222f43] bg-[#141f35]'>
                  <h4 className='text-[#66768d] text-sm @apply gradient-text font-bold'>{edu.year}</h4>
                  <h2 className='text-[#b9e0f2] text-xl font-bold'>{edu.edu}</h2>
                  <a href={edu.link} rel="noreferrer" target='_blank' className=' font-mono text-[#b9e0f2] text-[17px] hover:text-[#0ea0e4] transition-all duration-75'>{edu.clg}</a>
                  <h3 className='font-mono text-[15px]'>{edu.sts}</h3>
                </motion.div>
              ))
            }


          </div>
        </div>
      </div>
    </div>
  )
}

export default ExSection
