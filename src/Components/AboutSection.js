import React from 'react'
import '../Styles/AboutSection.css'
const AboutSection = () => {
    return (
        <>
            <div className='bg-[#0f172a]'>
                <div className='pt-[7.5rem] md:mx-[205px] mx-8'>
                    <div className='abtSec flex items-center text-[25px] md:text-[30px] font-[Ubuntu] '>
                        <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >I.</span>
                        <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>About Me</h2>
                    </div>
                    <div className='text-[#94a9c9] my-5 w-[fit] leading-7 font-mono'>
                        <p className='m-0 w-fit md:w-[500px] text-justify mb-3'>
                        👋Hey, I'm Aditya Khade a Computer Engineering student with a passion for crafting digital experiences. 🚀 Exploring the world of software, I'm on a journey to learn and grow every day.
                        </p>
                        <p className='m-0 w-fit md:w-[500px] text-justify'>
                        💡 From coding in C++ to building captivating websites, I love blending creativity with logic. When I'm not crafting code, I'm solving algorithmic puzzles on platforms like CodeChef and LeetCode.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutSection
