import React, {  useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeContext from '../../Context/ThemeContext';
import  '../../Styles/Admin.css'
import { GrAchievement, GrProjects, GrWorkshop, } from "react-icons/gr";
import { PiCertificateDuotone, } from "react-icons/pi";

import { TbLogout2 } from "react-icons/tb";

import { FaBars } from "react-icons/fa";
import { BiBadgeCheck, BiMessageDetail, BiUser } from "react-icons/bi";
import { GiGraduateCap } from "react-icons/gi";
import { NavLink } from 'react-router-dom';
import AlertContext from '../../Context/AlertContext';
const routes = [
  {
    path: 'adminprofile',
    icon: <BiUser />,
    name: 'Profile'
  },
  {
    path: 'managecontacts',
    icon: <BiMessageDetail />,
    name: 'Messages'
  },
  {
    path: 'manageabout',
    icon: <BiBadgeCheck />,
    name: 'About'
  },
  {
    path: 'manageedu',
    icon: <GiGraduateCap />,
    name: 'Education'
  },
  {
    path: 'manageexp',
    icon: <GrWorkshop />,
    name: 'Experience'
  },
  {
    path: 'manageskills',
    icon: <GrAchievement />,
    name: 'Skills'
  },
  {
    path: 'manageprojects',
    icon: <GrProjects />,
    name: 'Project'
  },
  {
    path: 'managecer',
    icon: <PiCertificateDuotone />,
    name: 'Certificates'
  },
 
]

const showAnimation={
  hidden:
  {
    width:0,
    opacity:0,
    transition:{
      duration:0.5,
    },
  },
  show:{
    width:'auto',
    opacity:1,
    transition:{
      duration:0.2,
    },

  }
}
const AdminSideBar = ({children}) => {
  const { mode } = useContext(ThemeContext)
  const { showAlert } = useContext(AlertContext)
  const [showNav, setShowNav] = useState(false)
  const toggle = () => setShowNav(!showNav)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
    useEffect(() => {
      if (localStorage.getItem('token') == null) {
        setIsLoggedIn(false)      }
      else {
        setIsLoggedIn(true)      
      }
      // eslint-disable-next-line
  }, [])
  const logout=()=>{
    localStorage.removeItem('token')
    showAlert("success","Logged Out Successfully")
}
  return (
    <div className={`flex  main-container relative text-[#94a9c9]`}>
      <motion.div animate={{ width:showNav?"250px":'65px' }} className={`fixed left-0 z-[10000] top-[85px] ${mode === 'dark' ? 'bg-[#131c31]' : 'bg-[#f9fbff]'}  h-[100vh]`}>
        <div className='flex justify-between items-center px-5 h-[50px] py-3'>
          {showNav&&<motion.h1 variants={showAnimation} initial='hidden' animate='show' exit='hidden' className={`whitespace-nowrap font-bold text-2xl`}>Aditya Khade</motion.h1>}
          <div className='text-xl cursor-pointer'><FaBars onClick={toggle} /></div>
        </div>
        <section className=''>
          {routes.map((route) => (
            <NavLink to={route.path} className=' admin-nav-link hover:bg-[#222f43] flex flex-row items-center text-[18px]  my-3 p-[10px]' key={route.name} >
              <div className='mx-2 my-1 text-xl text-[#94a9c9]'>{route.icon}</div>
              <AnimatePresence>
              {showNav &&<motion.div variants={showAnimation} initial='hidden' animate='show' exit='hidden' className=' px-2 text-[#94a9c9]'>{route.name}</motion.div>}
              </AnimatePresence>
            </NavLink>
          ))}
{isLoggedIn && <NavLink onClick={logout} to='/login' className=' admin-nav-link hover:bg-[#222f43] flex flex-row items-center text-[18px]  my-3 p-[10px]' key='logOut' >
              <div className='mx-2 my-1 text-xl text-[#94a9c9]'><TbLogout2/></div>
              <AnimatePresence>
              {showNav &&<motion.div variants={showAnimation} initial='hidden' animate='show' exit='hidden' className=' px-2 text-[#94a9c9]'>Log Out</motion.div>}
              </AnimatePresence>
            </NavLink>}
        </section>
      </motion.div>
            <main className='mx-auto my-0  w-[-webkit-fill-available]'>
              {children}
            </main>
    </div>
  )
}

export default AdminSideBar
