import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'
import { RiCloseLine, RiMenu2Line } from "react-icons/ri";
import { CiLight } from "react-icons/ci";
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [menu, setMenu] = useState("off")
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
    
            if (width > 768) {
                hideMenu();
            }
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);

        // Clean up by removing the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [menu]);
    
    
    const showMenu = () => {
        if (menu === "off") {
            setMenu("on")
        }
    }
    const hideMenu=()=>{
        if (menu === "on") 
        {
            setMenu("off");
        }
    }
    const links = [{ "key": "I.", "name": "About", "link": "/about" },
    { "key": "II.", "name": "Skills", "link": "/skills" },
    { "key": "III.", "name": "Projects", "link": "/projects" },
    { "key": "IV.", "name": "Contact", "link": "/contact" }]
    return (
        <div>
            <div className='flex h-16 w-screen bg-[#0f172a] items-center justify-between'>
                <div className=' m-3'>
                    <img className="w-14" src={logo} alt="logo" />
                </div>
                <div className='flex  items-center space-x-2 mr-2'>
                    <div className='text-[#94a9c9] navigation hidden md:flex space-x-6 mx-6 font-mono font-bold'>
                        {links.map((link) => {
                            return <Link key={link.key} className='hover:text-[#1cc2e7] text-base transition-colors duration-300' to={link.link}><span className='text-[#1cc2e7] mx-1 '>{link.key}</span>{link.name}</Link>
                        })}
                    </div>
                    <div className='leftside flex '>
                        <div className='text-[#0bcad4] text-3xl m-3'>
                            <CiLight />
                        </div>
                        <div onClick={showMenu} className={` transition-all duration-100 ${menu === "on" ? "rotate-180" : "rotate-0"} text-[#94a9c9] text-3xl  m-3 md:hidden`}>
                            <RiMenu2Line />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`flex text-[#94a9c9] overflow-hidden top-0 fixed font-mono justify-center items-center transition-all duration-700 ${menu === "on" ? "right-0" : "-right-48"} flex-col space-y-6 w-48 h-96 bg-[#1b294b] md:-right-48 md:hidden`}>
                <div onClick={hideMenu} className={` transition-all duration-100  ${menu === "off" ? "rotate-180" : "rotate-0"} absolute top-1 right-1 text-[#94a9c9] text-3xl  m-3 md:hidden`}>
                    <RiCloseLine />
                </div>
                {links.map((link) => {
                    return <Link key={link.key} className='relative w-20 text-center  hover:text-[#1cc2e7] text-lg transition-colors duration-300' to={link.link}><span className='text-[#1cc2e7] mx-1 block  '>{link.key}</span>{link.name}</Link>
                })}
            </div>
        </div>
    )
}

export default Navbar
