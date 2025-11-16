import React, { useContext, useState } from 'react'
import github from '../images/Social/github.svg'
import linkedin from '../images/Social/linkedin.svg'
import insta from '../images/Social/insta.svg'
import twitter from '../images/Social/twitter.svg'
import github1 from '../images/Social/github1.svg'
import linkedin1 from '../images/Social/linkedin1.svg'
import insta1 from '../images/Social/insta1.svg'
import twitter1 from '../images/Social/twitter1.svg'
import { motion } from 'framer-motion'
import { fadeIn } from '../Variants'
import { Link } from 'react-router-dom'
import '../Styles/Footer.css'
import ThemeContext from '../Context/ThemeContext'
import logo from '../images/logo.png'
import { BiHeart, BiMailSend, BiPhone, BiMap } from 'react-icons/bi'

const Footer = () => {
    const { mode } = useContext(ThemeContext)

    const socialAcc = [
        { "acc": "Github", "link": "https://github.com/adityakhadeak", "icon": github, "icon1": github1 },
        { "acc": "Linkedin", "link": "https://www.linkedin.com/in/aditya-khade-a14bb0219/", "icon": linkedin, "icon1": linkedin1 },
        { "acc": "Instagram", "link": "https://www.instagram.com/aditya_khade_ak/", "icon": insta, "icon1": insta1 },
        { "acc": "Twitter", "link": "https://twitter.com/adityakhade_ak", "icon": twitter, "icon1": twitter1 }
    ];
    const [onHover, setHover] = useState(null)

    const changeIcons = (index) => {
        setHover(index)
    }

    return (
        <section className={`${mode === 'dark' ? 'bg-gradient-to-b from-[#0f172a] to-[#1e293b]' : 'bg-gradient-to-b from-[#f9fbff] to-[#e8eef5]'} footer pt-[7.5rem] pb-[2rem] px-4`}>
            <motion.footer
                variants={fadeIn('up', 0)}
                initial='hidden'
                animate='show'
                className={`max-w-7xl mx-auto`}>
                
                {/* Main Footer Content */}
                <div className={`${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-3xl shadow-2xl p-8 md:p-12 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} overflow-hidden relative`}>
                    
                    {/* Decorative gradient blob */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#1cc2e7]/10 to-[#0bccd3]/10 rounded-full blur-3xl -z-0"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#1cc2e7]/10 to-[#0bccd3]/10 rounded-full blur-3xl -z-0"></div>
                    
                    <div className='relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12'>
                        
                        {/* Brand Section */}
                        <div className='flex flex-col items-center md:items-start space-y-4'>
                            <div className='flex items-center gap-3'>
                                <img className="w-14 h-14 object-contain" src={logo} alt="logo" />
                                <h3 className={`text-2xl font-bold bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] bg-clip-text text-transparent`}>
                                    Aditya Khade
                                </h3>
                            </div>
                            <p className={`text-sm leading-relaxed text-center md:text-left ${mode === 'dark' ? 'text-[#94a9c9]' : 'text-[#64748b]'} max-w-xs`}>
                                Full Stack Developer passionate about creating beautiful, functional web experiences. Let's build something amazing together.
                            </p>
                            
                            {/* Social Media Icons - Modern Style */}
                            <div className='flex gap-3 pt-2'>
                                {socialAcc.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.link}
                                        title={link.acc}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onMouseEnter={() => changeIcons(index)}
                                        onMouseLeave={() => changeIcons(null)}
                                        className={`w-12 h-12 rounded-xl ${mode === 'dark' ? 'bg-[#1e293b] hover:bg-[#1cc2e7]' : 'bg-[#f1f5f9] hover:bg-[#1cc2e7]'} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#1cc2e7]/50 group`}>
                                        <img className='w-6 h-6 transition-all group-hover:brightness-0 group-hover:invert' src={onHover === index ? link.icon : link.icon1} alt={link.acc} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className='flex flex-col items-center md:items-start'>
                            <h3 className={`text-lg font-bold mb-6 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'} relative inline-block`}>
                                Quick Links
                                <span className='absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] rounded-full'></span>
                            </h3>
                            <nav className='flex flex-col space-y-3'>
                                {[
                                    { name: 'Home', path: '/' },
                                    { name: 'About', path: '/about' },
                                    { name: 'Skills', path: '/skills' },
                                    { name: 'Projects', path: '/projects' },
                                    { name: 'Contact', path: '/contact' }
                                ].map((link, index) => (
                                    <Link
                                        key={index}
                                        to={link.path}
                                        className={`${mode === 'dark' ? 'text-[#94a9c9] hover:text-[#1cc2e7]' : 'text-[#64748b] hover:text-[#1cc2e7]'} transition-all duration-300 hover:translate-x-2 font-medium text-sm flex items-center gap-2 group`}>
                                        <span className='w-0 h-0.5 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] group-hover:w-4 transition-all duration-300 rounded-full'></span>
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Contact Info */}
                        <div className='flex flex-col items-center md:items-start'>
                            <h3 className={`text-lg font-bold mb-6 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'} relative inline-block`}>
                                Get in Touch
                                <span className='absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] rounded-full'></span>
                            </h3>
                            <div className='flex flex-col space-y-4'>
                                <a
                                    href="tel:+919422006299"
                                    className={`flex items-center gap-3 ${mode === 'dark' ? 'text-[#94a9c9] hover:text-[#1cc2e7]' : 'text-[#64748b] hover:text-[#1cc2e7]'} transition-all duration-300 group text-sm`}>
                                    <span className={`w-10 h-10 rounded-lg ${mode === 'dark' ? 'bg-[#1e293b]' : 'bg-[#f1f5f9]'} flex items-center justify-center group-hover:bg-[#1cc2e7] transition-all`}>
                                        <BiPhone className='text-xl group-hover:text-white transition-colors' />
                                    </span>
                                    <span className='font-medium'>+91 9422006299</span>
                                </a>
                                <a
                                    href="mailto:khadeaditya1@gmail.com"
                                    className={`flex items-center gap-3 ${mode === 'dark' ? 'text-[#94a9c9] hover:text-[#1cc2e7]' : 'text-[#64748b] hover:text-[#1cc2e7]'} transition-all duration-300 group text-sm`}>
                                    <span className={`w-10 h-10 rounded-lg ${mode === 'dark' ? 'bg-[#1e293b]' : 'bg-[#f1f5f9]'} flex items-center justify-center group-hover:bg-[#1cc2e7] transition-all`}>
                                        <BiMailSend className='text-xl group-hover:text-white transition-colors' />
                                    </span>
                                    <span className='font-medium break-all'>khadeaditya1@gmail.com</span>
                                </a>
                                <div className={`flex items-center gap-3 ${mode === 'dark' ? 'text-[#94a9c9]' : 'text-[#64748b]'} text-sm`}>
                                    <span className={`w-10 h-10 rounded-lg ${mode === 'dark' ? 'bg-[#1e293b]' : 'bg-[#f1f5f9]'} flex items-center justify-center`}>
                                        <BiMap className='text-xl' />
                                    </span>
                                    <span className='font-medium'>Badlapur, Thane, India</span>
                                </div>
                            </div>
                        </div>

                        {/* Resources Section */}
                        <div className='flex flex-col items-center md:items-start'>
                            <h3 className={`text-lg font-bold mb-6 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'} relative inline-block`}>
                                Resources
                                <span className='absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] rounded-full'></span>
                            </h3>
                            <div className='flex flex-col space-y-4'>
                                <a
                                    href="https://github.com/adityakhadeak"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${mode === 'dark' ? 'text-[#94a9c9] hover:text-[#1cc2e7]' : 'text-[#64748b] hover:text-[#1cc2e7]'} transition-all duration-300 hover:translate-x-2 font-medium text-sm flex items-center gap-2 group`}>
                                    <span className='w-0 h-0.5 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] group-hover:w-4 transition-all duration-300 rounded-full'></span>
                                    GitHub Repositories
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/aditya-khade-a14bb0219/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${mode === 'dark' ? 'text-[#94a9c9] hover:text-[#1cc2e7]' : 'text-[#64748b] hover:text-[#1cc2e7]'} transition-all duration-300 hover:translate-x-2 font-medium text-sm flex items-center gap-2 group`}>
                                    <span className='w-0 h-0.5 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] group-hover:w-4 transition-all duration-300 rounded-full'></span>
                                    LinkedIn Profile
                                </a>
                                <Link
                                    to="/projects"
                                    className={`${mode === 'dark' ? 'text-[#94a9c9] hover:text-[#1cc2e7]' : 'text-[#64748b] hover:text-[#1cc2e7]'} transition-all duration-300 hover:translate-x-2 font-medium text-sm flex items-center gap-2 group`}>
                                    <span className='w-0 h-0.5 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] group-hover:w-4 transition-all duration-300 rounded-full'></span>
                                    My Portfolio
                                </Link>
                                <a
                                    href="mailto:khadeaditya1@gmail.com"
                                    className={`${mode === 'dark' ? 'text-[#94a9c9] hover:text-[#1cc2e7]' : 'text-[#64748b] hover:text-[#1cc2e7]'} transition-all duration-300 hover:translate-x-2 font-medium text-sm flex items-center gap-2 group`}>
                                    <span className='w-0 h-0.5 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] group-hover:w-4 transition-all duration-300 rounded-full'></span>
                                    Hire Me
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className={`relative z-10 mt-12 pt-8 border-t ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#e2e8f0]'}`}>
                        <div className='flex flex-col md:flex-row items-center justify-between gap-4 text-sm'>
                            <p className={`${mode === 'dark' ? 'text-[#94a9c9]' : 'text-[#64748b]'} flex items-center gap-2`}>
                                &copy; {new Date().getFullYear()} <span className='text-[#1cc2e7] font-semibold'>Aditya Khade</span> 
                                <span className='hidden md:inline'>• All rights reserved</span>
                            </p>
                            <p className={`${mode === 'dark' ? 'text-[#94a9c9]' : 'text-[#64748b]'} flex items-center gap-2`}>
                                Made with <BiHeart className='text-red-500 animate-pulse' /> in India
                            </p>
                        </div>
                    </div>
                </div>
            </motion.footer>
        </section>
    )
}

export default Footer
