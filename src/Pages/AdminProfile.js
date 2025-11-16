import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import { BASE_URL } from '../helper'
import { RxCross2 } from 'react-icons/rx'
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'
import { fadeIn } from '../Variants'
import Loader from '../Components/Loader.js';
import AlertContext from '../Context/AlertContext';
import ManageUser from './ManageUser';
const AdminProfile = () => {
    const navigate = useNavigate()
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)
    const [updatedPass, setUpdatePass] = useState({ oldpass: "", newpass: "" })
    const [userInfo, setUserInfo] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('token')
    document.title = "Aditya's Portfolio | Admin Profile"
    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
        else {
            getUser()
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        // Disable scroll when modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const handleOnChange = (e) => {
        setUpdatePass({ ...updatedPass, [e.target.name]: e.target.value })
    }

    const updatePass = () => {
        setIsOpen(true)
    }

    const handleUpdate = async () => {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/api/user/updatepass`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(updatedPass)

        })
        const res = await response.json()
        if (res.success) {
            setLoading(false)
            showAlert('success', "Password Updated Successfully")
            setIsOpen(false)
            setUpdatePass({ oldpass: "", newpass: "" })
        }
        else {
            setLoading(false)
            showAlert('error', res.message)
        }
    }

    const getUser = async () => {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/api/user/getuser`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });
        const res = await response.json()
        if (res.success) {
            setUserInfo(res.data)
            setLoading(false)
        }
        else if (res.message === "Token has expired") {
            localStorage.removeItem("token")
            navigate("/login")
            setLoading(false)

        }

    }


    return (
        <section className={`min-h-screen ${mode === 'dark' ? 'bg-[#0a0f1e]' : 'bg-[#e8edf5]'} md:ml-[75px] px-4 md:px-8 py-8`}>
            <motion.div
                variants={fadeIn('down', 0.2)}
                initial='hidden'
                animate='show'
                className='mb-8'>
                <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Admin Profile</h1>
                <p className='text-[#94a9c9] text-sm md:text-base'>Manage your admin account details</p>
            </motion.div>
            <motion.div
                variants={fadeIn('up', 0.3)}
                initial='hidden'
                animate='show'
                className={`max-w-6xl mx-auto ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                <h2 className={`text-xl md:text-2xl font-bold mb-6 flex items-center ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>
                    <span className='w-1 h-8 bg-gradient-to-b from-[#1cc2e7] to-[#0bccd3] rounded-full mr-3'></span>
                    Account Information
                </h2>
                <div className='grid md:grid-cols-2 gap-6'>
                    <div className={`${mode === 'dark' ? 'bg-[#0a0e1a]' : 'bg-[#f5f7fb]'} p-5 rounded-xl border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} group hover:border-[#1cc2e7]/50 transition-all duration-300`}>
                        <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} mb-2 block`}>Full Name</label>
                        <h3 className='text-lg font-medium text-[#94a9c9]'>{userInfo.name}</h3>
                    </div>
                    <div className={`${mode === 'dark' ? 'bg-[#0a0e1a]' : 'bg-[#f5f7fb]'} p-5 rounded-xl border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} group hover:border-[#1cc2e7]/50 transition-all duration-300`}>
                        <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} mb-2 block`}>Email Address</label>
                        <h3 className='text-lg font-medium text-[#94a9c9] break-all'>{userInfo.email}</h3>
                    </div>
                    <div className={`${mode === 'dark' ? 'bg-[#0a0e1a]' : 'bg-[#f5f7fb]'} p-5 rounded-xl border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} group hover:border-[#1cc2e7]/50 transition-all duration-300`}>
                        <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} mb-2 block`}>Username</label>
                        <h3 className='text-lg font-medium text-[#94a9c9]'>{userInfo.username}</h3>
                    </div>
                    <div className={`${mode === 'dark' ? 'bg-[#0a0e1a]' : 'bg-[#f5f7fb]'} p-5 rounded-xl border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} group hover:border-[#1cc2e7]/50 transition-all duration-300`}>
                        <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} mb-2 block`}>Password</label>
                        <button 
                            onClick={(e) => updatePass()} 
                            className='px-6 py-2 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1cc2e7]/50 transform hover:scale-105 transition-all duration-300'>
                            Change Password
                        </button>
                    </div>
                </div>
            </motion.div>
            <ManageUser />
            <AnimatePresence>
                {isOpen && <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, duration: 0.4 }}
                    className='flex justify-center items-center fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-[#131c316f] p-4 overflow-y-auto'
                    style={{zIndex: 9999999}}>
                    <motion.div
                        initial={{ scale: 0, y: -50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, transition: { duration: .3 } }}
                        className={`w-full max-w-md my-8 ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} relative border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-2xl shadow-2xl`}>
                        <div className='absolute right-4 top-4 cursor-pointer text-2xl hover:text-red-500 transition-colors duration-300'>
                            <RxCross2 onClick={() => setIsOpen(false)} />
                        </div>
                        <div className='p-6'>
                            <h2 className={`text-2xl font-bold mb-6 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Change Password</h2>
                            <div className='space-y-4'>
                                <div>
                                    <label htmlFor='oldpass' className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Current Password</label>
                                    <input 
                                        type="password" 
                                        name='oldpass' 
                                        value={updatedPass.oldpass} 
                                        onChange={(e) => handleOnChange(e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#0a0e1a] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-[#f5f7fb] border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='Enter current password' 
                                    />
                                </div>
                                <div>
                                    <label htmlFor='newpass' className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>New Password</label>
                                    <input 
                                        type="password" 
                                        name='newpass' 
                                        value={updatedPass.newpass} 
                                        onChange={(e) => handleOnChange(e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#0a0e1a] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-[#f5f7fb] border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='Enter new password' 
                                    />
                                </div>
                            </div>
                            <div className='flex gap-3 mt-6'>
                                <button 
                                    onClick={() => setIsOpen(false)} 
                                    className='flex-1 py-3 px-4 bg-transparent hover:bg-[#222f43]/50 text-[#94a9c9] border border-[#222f43] rounded-xl font-medium transition-all duration-300'>
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => handleUpdate()} 
                                    className='flex-1 py-3 px-4 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1cc2e7]/50 transform hover:scale-105 transition-all duration-300'>
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>}
            </AnimatePresence>
            {loading && <Loader loading={loading} />
            }
        </section>
    )
}

export default AdminProfile
