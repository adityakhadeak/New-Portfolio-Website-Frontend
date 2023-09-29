import React from 'react'
import { Link } from 'react-router-dom'
import { BsGithub, BsLinkedin, BsInstagram, BsTwitter } from "react-icons/bs";

import logo from '../images/logo.png'
const Footer = () => {
    const socialAcc = [
        { "acc": "Github", "link": "https://www.linkedin.com/in/aditya-khade-a14bb0219/", "icon": <BsGithub /> },
        { "acc": "Linkedin", "link": "https://www.linkedin.com/in/aditya-khade-a14bb0219/", "icon": <BsLinkedin /> },
        { "acc": "Insta", "link": "https://www.linkedin.com/in/aditya-khade-a14bb0219/", "icon": <BsInstagram /> },
        { "acc": "Twitter", "link": "https://www.linkedin.com/in/aditya-khade-a14bb0219/", "icon": <BsTwitter /> }
    ];
    return (
        <section className='footer text-[#94a9c9] font-1'>
            <footer className='pt-[7.5rem] md:mx-[205px]  mx-auto flex flex-col'>
                <div className='flex items-start flex-row '>
                    <div className=' flex flex-col justify-center items-center mx-1 px-1 w-[400px]'>
                        <div className='my-2 flex justify-between items-center'>
                            <img className="w-14 mx-1 " src={logo} alt="logo" />
                            <h3 className='text-2xl mx-1 font-bold'>Aditya Khade</h3>
                        </div>
                        <p className='text-justify my-2  w-[200px]'> A Third-year computer engineering student who's passionate about crafting websites.</p>
                    </div>
                    <div className=' flex flex-col justify-center items-center  mx-1 px-1 w-[200px]'>
                        <h3 className='text-xl my-2'>Important links</h3>
                        <div className='flex flex-col items-center justify-center'>
                            <Link to={'/home'}>Home</Link>
                            <Link to={'/about'}>About</Link>
                            <Link to={'/skills'}>Skills</Link>
                            <Link to={'/projects'}>Projects</Link>
                            <Link to={'/comtacts'}>Contact</Link>
                        </div>
                    </div>
                    <div className=' flex flex-col justify-center items-center  mx-1 px-1 w-[200px]'>
                        <h3 className='text-xl my-2'>Contact Info</h3>
                        <div className='flex flex-col items-center justify-center'>
                            <a href="tel:+919422006299" className=''> +91 9422006299</a>
                            <a href="mailto:khadeaditya1@gmail.com" className='ml-1'>khadeaditya1@gmail.com</a>
                            <a href="mailto:khadeaditya1@gmail.com" className='ml-1'>Badlapur, Thane </a>

                        </div>
                    </div>

                    <div className=' flex flex-col justify-center items-center  mx-1 px-1 w-[200px]'>
                        <h3 className='text-xl my-2'>Follow Me On</h3>
                        <div className='flex flex-col items-center justify-center'>
                            {socialAcc.map((link, index) => (
                                <a key={index} href={link.link} title={link.acc} target="_blank" rel="noopener noreferrer" className='flex items-center justify-around' >
                                    {link.acc} <span className='mx-2'>{link.icon}</span>
                                </a>
                            ))}

                        </div>
                    </div>
                </div>
                <div className='flex my-2 p-3 justify-center items-center'>
                    <h3> &copy; 2023 Aditya Khade</h3>
                </div>
            </footer>
        </section>
    )
}

export default Footer
