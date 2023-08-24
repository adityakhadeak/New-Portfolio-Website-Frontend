import React from 'react'
import '../Styles/AboutSection.css'
import abtImg from "../images/about.png"
const AboutSection = () => {
    const abtMe = [{ "para": "👋 Hi there,🌐 I'm a third-year computer engineering student who's passionate about crafting websites. I'm familiar with HTML, CSS, and JavaScript. Additionally, I work with the MERN stack (MongoDB, Express.js, React, Node.js) and have some exposure to MySQL." },
    { "para": "🧠 When I'm not building websites, you can find me tackling coding challenges on platforms like LeetCode. I enjoy sharpening my problem-solving skills and thinking algorithmically." },
    { "para": "🛠️ While I'm still on my journey, I've worked on various projects that have helped me grasp the essentials of web development, especially in learning React. Each project has been a stepping stone in my growth as a developer." },
    { "para": "🚀 I'm committed to continuous learning, always seeking out new technologies and challenges. My path is all about progress and exploration." },
    { "para": "🛠️ Curious to see some of my work? Take a look at my portfolio!" }
    ]
    return (
        <>
            <div className='bg-[#0f172a]'>
                <div className='pt-[7.5rem] md:ml-[205px] md:mr-[145px] mx-8'>
                    <div className='abtSec flex items-center text-[25px] md:text-[30px] font-[Ubuntu] '>
                        <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >I.</span>
                        <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>About Me</h2>
                    </div>
                    <div className='  flex flex-col md:flex-row  items-center'>
                        <div className='text-[#94a9c9] my-5 w-[fit] leading-7 md:mr-[50px] font-mono'>
                            {abtMe.map((para) => {
                                return <p className='m-0 w-fit md:w-[500px] text-justify mb-3'>{para.para} </p>
                            })
                            }

                        </div>
                        <div className='abtImgCon flex justify-center  relative'>
                            <img src={abtImg} className='abt-image' alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutSection
