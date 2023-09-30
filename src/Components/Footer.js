import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { BsGithub, BsLinkedin, BsInstagram, BsTwitter } from "react-icons/bs";
import github from '../images/Social/github.svg'
import linkedin from '../images/Social/linkedin.svg'
import insta from '../images/Social/insta.svg'
import twitter from '../images/Social/twitter.svg'
import github1 from '../images/Social/github1.svg'
import linkedin1 from '../images/Social/linkedin1.svg'
import insta1 from '../images/Social/insta1.svg'
import twitter1 from '../images/Social/twitter1.svg'
import '../Styles/Footer.css'
import logo from '../images/logo.png'
const Footer = () => {
    const socialAcc = [
        { "acc": "Github", "link": "https://www.linkedin.com/in/aditya-khade-a14bb0219/", "icon": github, "icon1": github1  },
        { "acc": "Linkedin", "link": "https://www.linkedin.com/in/aditya-khade-a14bb0219/", "icon": linkedin , "icon1": linkedin1 },
        { "acc": "Insta", "link": "https://www.linkedin.com/in/aditya-khade-a14bb0219/", "icon": insta, "icon1": insta1  },
        { "acc": "Twitter", "link": "https://www.linkedin.com/in/aditya-khade-a14bb0219/", "icon": twitter , "icon1": twitter1 }
    ];
    const [colorIcon, setcolorIcon] = useState(true)
    const changeIcons=()=>{
        if(colorIcon===false)
        setcolorIcon(true)
        else
        setcolorIcon(false)
    }
    return (
        <section className='footer pt-[7.5rem] text-[#94a9c9] px-4 font-1'>
            <footer className=' py-[3rem] bg-[#131c31] px-[2rem] md:mx-[205px]  mx-auto flex flex-col   justify-center items-center border border-[#222f43] rounded-[50px]'>
                <div className='flex flex-wrap footer-copyright-div relative  md:items-start flex-col justify-center items-center  md:flex-row'>
                    <div className=' flex flex-col justify-center items-center mx-1 px-1 w-[350px]'>
                        <div className='my-2 flex justify-between items-center'>
                            <img className="w-14 mx-1 " src={logo} alt="logo" />
                            <h3 className='text-2xl mx-1 font-extrabold text-[#d8e6fb]'>Aditya Khade</h3>
                        </div>
                        <p className='text-justify my-4 text-sm w-[200px]'> A Third-year computer engineering student who's passionate about crafting websites.</p>
                    </div>
                    <div className=' flex flex-col justify-center items-center  mx-1 px-1 w-[200px]'>
                        <h3 className='text-lg my-2  text-[#aae0f2]'>Important links</h3>
                        <div className='flex my-5 flex-col items-center justify-center'>
                            <Link className='my-1 footer-links' to={'/home'}>Home</Link>
                            <Link className='my-1 footer-links' to={'/about'}>About</Link>
                            <Link className='my-1 footer-links' to={'/skills'}>Skills</Link>
                            <Link className='my-1 footer-links' to={'/projects'}>Projects</Link>
                            <Link className='my-1 footer-links' to={'/comtacts'}>Contact</Link>
                        </div>
                    </div>
                    <div className=' flex flex-col justify-center items-center  mx-1 px-1 w-[200px]'>
                        <h3 className='text-lg my-2 text-[#aae0f2]'>Contact Info</h3>
                        <div className='flex my-5 flex-col items-center justify-center'>
                            <a href="tel:+919422006299" className='my-1 footer-links'> +91 9422006299</a>
                            <a href="mailto:khadeaditya1@gmail.com" className='my-1 footer-links'>khadeaditya1@gmail.com</a>
                            <a href="mailto:khadeaditya1@gmail.com" className='my-1 footer-links'>Badlapur, Thane </a>

                        </div>
                    </div>

                    <div className=' flex flex-col justify-center items-center  mx-1 px-1 w-[200px]'>
                        <h3 className='text-lg my-2 text-[#aae0f2]'>Follow Me On</h3>
                        <div className='flex my-5 flex-col items-center justify-center'>
                            {socialAcc.map((link, index) => (
                                <a onMouseEnter={changeIcons} onMouseLeave={changeIcons} key={index} href={link.link}  title={link.acc} target="_blank" rel="noopener noreferrer" className='flex footer-social-links my-1 items-center justify-around' >
                                    {link.acc} 
                                    <span className='mx-2'><img className='w-[10px]' src={changeIcons?link.icon:link.icon1} alt="" /></span>
                                </a>
                            ))}

                        </div>
                    </div>
                </div>
                
                <div className='flex my-2 p-3 justify-center items-center'>
                    <h3> &copy; 2023 Created by <span className='text-[#1cc2e7]' >Aditya Khade</span></h3>
                </div>
            </footer>
        </section>
    )
}

export default Footer
