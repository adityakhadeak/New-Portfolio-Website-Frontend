import React, {  useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeContext from '../../Context/ThemeContext';
import  '../../Styles/Admin.css'
import { TbLogout2 } from "react-icons/tb";
import { FaBars } from "react-icons/fa";
import { 
  BiUser, 
  BiMessageDetail, 
  BiInfoCircle, 
  BiBook, 
  BiBriefcase, 
  BiCodeAlt, 
  BiFolderOpen, 
  BiCertification 
} from "react-icons/bi";
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
    icon: <BiInfoCircle />,
    name: 'About'
  },
  {
    path: 'manageedu',
    icon: <BiBook />,
    name: 'Education'
  },
  {
    path: 'manageexp',
    icon: <BiBriefcase />,
    name: 'Experience'
  },
  {
    path: 'manageskills',
    icon: <BiCodeAlt />,
    name: 'Skills'
  },
  {
    path: 'manageprojects',
    icon: <BiFolderOpen />,
    name: 'Project'
  },
  {
    path: 'managecer',
    icon: <BiCertification />,
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
      <motion.div animate={{ width:showNav?"280px":'75px' }} className={`fixed left-0 z-[10000] top-[85px] ${mode === 'dark' ? 'bg-gradient-to-b from-[#0f1824] to-[#131c31]' : 'bg-gradient-to-b from-[#ffffff] to-[#f9fbff]'} border-r ${mode === 'dark' ? 'border-[#1cc2e7]/20' : 'border-[#1cc2e7]/10'} h-[100vh] shadow-2xl`}>
        <div className='flex justify-between items-center px-5 h-[60px] py-4 border-b border-[#1cc2e7]/20'>
          {showNav&&<motion.h1 variants={showAnimation} initial='hidden' animate='show' exit='hidden' className={`whitespace-nowrap font-bold text-xl bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] bg-clip-text text-transparent`}>Dashboard</motion.h1>}
          <div className='text-2xl cursor-pointer hover:text-[#1cc2e7] transition-colors duration-300'><FaBars onClick={toggle} /></div>
        </div>
        <section className='mt-4 px-2'>
          {routes.map((route) => (
            <NavLink to={route.path} className={({isActive}) => `admin-nav-link ${isActive ? 'admin-nav-active' : ''} group relative ${mode === 'dark' ? 'hover:bg-[#1cc2e7]/10' : 'hover:bg-[#1cc2e7]/5'} flex flex-row items-center text-[16px] my-2 p-[12px] rounded-xl transition-all duration-300`} key={route.name} >
              <div className='mx-2 my-1 text-2xl text-[#94a9c9] group-hover:text-[#1cc2e7] transition-colors duration-300'>{route.icon}</div>
              <AnimatePresence>
              {showNav &&<motion.div variants={showAnimation} initial='hidden' animate='show' exit='hidden' className='px-2 text-[#94a9c9] group-hover:text-[#1cc2e7] font-medium transition-colors duration-300'>{route.name}</motion.div>}
              </AnimatePresence>
            </NavLink>
          ))}
{isLoggedIn && <NavLink onClick={logout} to='/login' className={`admin-nav-link group ${mode === 'dark' ? 'hover:bg-red-500/10' : 'hover:bg-red-500/5'} flex flex-row items-center text-[16px] mt-8 p-[12px] rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/30`} key='logOut' >
              <div className='mx-2 my-1 text-2xl text-[#94a9c9] group-hover:text-red-500 transition-colors duration-300'><TbLogout2/></div>
              <AnimatePresence>
              {showNav &&<motion.div variants={showAnimation} initial='hidden' animate='show' exit='hidden' className='px-2 text-[#94a9c9] group-hover:text-red-500 font-medium transition-colors duration-300'>Log Out</motion.div>}
              </AnimatePresence>
            </NavLink>}
        </section>
      </motion.div>
            <main className={`mx-auto my-0 w-[-webkit-fill-available] min-h-screen ${mode === 'dark' ? 'bg-[#0a0e1a]' : 'bg-[#f5f7fb]'} transition-colors duration-300`}>
              <div className='p-6 md:p-8'>
                {children}
              </div>
            </main>
    </div>
  )
}

export default AdminSideBar
