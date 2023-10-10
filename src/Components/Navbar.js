import React, { useEffect, useState, useContext } from 'react'
import logo from '../images/logo.png'
import { RiMenu2Line } from "react-icons/ri";
import { SlArrowUp } from "react-icons/sl";
import { CiLight, CiDark } from "react-icons/ci";
import { Link,NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn } from '../Variants'
import ThemeContext from '../Context/ThemeContext';
import NavFixContext from '../Context/NavFixContext';
const Navbar = () => {
    const { mode, changeMode } = useContext(ThemeContext)
    const { isFixed } = useContext(NavFixContext)
    const [menu, setMenu] = useState("off")
    // const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width > 768) {
                hideMenu();
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        // window.addEventListener('scroll', handleScroll);

        // Clean up by removing the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
            // window.removeEventListener('scroll', handleScroll);

        };
        // eslint-disable-next-line
    }, [menu]);

    // const handleScroll = () => {
    //     // Define the scroll position or section offset where you want the change to occur
    //     const triggerPosition = 55; // Adjust this value as needed
    //     const scrollPosition = window.scrollY || window.pageYOffset;

    //     // Check if the scroll position is greater than or equal to the trigger position
    //     if (scrollPosition >= triggerPosition) {
    //         setIsFixed(true);
    //     } else {
    //         setIsFixed(false);
    //     }
    // };


    const showMenu = () => {
        if (menu === "off") {
            setMenu("on")
        }
    }
    const hideMenu = () => {
        if (menu === "on") {
            setMenu("off");
        }
    }
    const links = [{ "key": "I.", "name": "About", "link": "/about", "animIn": 0.3 },
    { "key": "II.", "name": "Skills", "link": "/skills", "animIn": 0.4 },
    { "key": "III.", "name": "Projects", "link": "/projects", "animIn": 0.5 },
    { "key": "IV.", "name": "Contact", "link": "/contact", "animIn": 0.6 }]
    return (
        <div >
            <div className={`z-[4] px-5 flex mob-nav  ${mode === 'dark' ? isFixed ? 'sticky-bar-ani' : 'relative' : isFixed ? 'sticky-bar-ani-light' : 'relative'}  h-[85px] w-[100%] ${mode === 'dark' ? 'bg-[#0f172a]' : 'bg-[#f9fbff]'}  items-center justify-between`}>

                <motion.div
                    variants={fadeIn('right', 0.2, 40)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.1 }}
                    className=' m-3'>
                    <Link to={'/'}>
                        <img className="w-14" src={logo} alt="logo" /></Link>
                </motion.div>
                <div className='flex  items-center space-x-2 mr-2'>
                    <div className='text-[#94a9c9] navigation hidden md:flex space-x-6 mx-6 font-mono font-bold'>
                        {links.map((link) => (
                            <motion.div
                                key={link.key}
                                variants={fadeIn('up', link.animIn)}
                                initial='hidden'
                                whileInView={'show'}
                                viewport={{ once: true, amount: 0.1 }}>
                                <NavLink className={`hover:text-[#1cc2e7] text-base transition-colors duration-300 `} to={link.link}><span className='text-[#1cc2e7] mx-1 '>{link.key}</span>{link.name}</NavLink>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        variants={fadeIn('left', 0.2, 20)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.1 }}
                        className='leftside flex '>
                        <div onClick={changeMode}
                            className={`text-[#0bcad4] text-3xl m-3 transition-all cursor-pointer duration-300 ${menu === "on" ? "translate-x-12" : "-translate-x-0"}`}>
                            {mode === 'dark' ? <CiLight /> : <CiDark />}
                        </div>
                        <div onClick={showMenu} className={` transition-all duration-500 ${menu === "on" ? "rotate-180 opacity-0" : "rotate-0 opacity-100"} text-[#94a9c9] text-3xl  m-3 md:hidden`}>
                            <RiMenu2Line />
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className={`flex text-[#94a9c9] z-[3] overflow-hidden fixed font-mono justify-center items-center transition-all duration-700 ${menu === "on" ? "top-[85px]" : "-top-[384px]"} flex-col space-y-6 w-screen h-96 bg-[#1b294b] md:-right-48 md:hidden`}>
                {links.map((link) => {
                    return <Link key={link.key} className='relative w-20 text-center  hover:text-[#1cc2e7] text-lg transition-colors duration-300' to={link.link}><span className='text-[#1cc2e7] mx-1 block  '>{link.key}</span>{link.name}</Link>
                })}
                <div onClick={hideMenu} className={` transition-all duration-100  ${menu === "off" ? "rotate-180" : "rotate-0"}  text-[#94a9c9] text-3xl  m-3 md:hidden`}>
                    <SlArrowUp />
                </div>
            </div>
        </div>
    )
}

export default Navbar
