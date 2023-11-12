import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import { BASE_URL } from '../helper'
import { RxCross2 } from 'react-icons/rx'
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'
import { fadeIn } from '../Variants'
import AlertContext from '../Context/AlertContext';
const AdminProfile = () => {
    const navigate = useNavigate()
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)
    const [updatedPass, setUpdatePass] = useState({ oldpass: "", newpass: "" })
    const [userInfo, setUserInfo] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const token=localStorage.getItem('token')
    document.title="Aditya's Portfolio | Admin Profile"
    useEffect(() => {
        if ( token== null) {
            navigate("/login")
        }
        else{
            getUser()
        }
        // eslint-disable-next-line
    }, [])

    const handleOnChange = (e) => {
        setUpdatePass({ ...updatedPass, [e.target.name]: e.target.value })
    }

    const updatePass = () => {
        setIsOpen(true)
    }

    const handleUpdate = async () => {
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
            showAlert('success', "Password Updated Successfully")
            setIsOpen(false)
            setUpdatePass({ oldpass: "", newpass: "" })
        }
        else{
            showAlert('error', res.message)
        }
    }

    const getUser = async () => {
        const response = await fetch(`${BASE_URL}/api/user/getuser`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });
        const res = await response.json()
        if (res.success) {
            setUserInfo(res.data)
        }
        else if(res.message==="Token has expired"){
            localStorage.removeItem("token")
            navigate("/login")
        }

    }


    return (
        <section>
            <motion.div
                variants={fadeIn('left', 0.2, 10)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.7 }}
                className=' mx-8 flex items-center justify-center text-[25px] md:text-[30px] font-[Montserrat] my-4 py-2 font-semibold'>
                <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' ></span>
                <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>Admin Info</h2>
            </motion.div>
            <div className='flex text-[20px] md:text-[25px] flex-col justify-start items-start'>
                <div className='flex my-8 w-full justify-between flex-row'>
                    <div className={` ${mode==='dark'?'bg-[#222f43]':'bg-[#e8edf5]'} relative cursor-pointer p-5 rounded my-2 mx-4 md:w-[330px] flex flex-col justify-start items-start `}>
                        <h3 className='text-lg'>Name</h3>
                        <h2>{userInfo.name}</h2>
                    </div>
                    <div className={` ${mode==='dark'?'bg-[#222f43]':'bg-[#e8edf5]'} relative cursor-pointer p-5 rounded my-2 mx-4 md:w-[330px] flex flex-col jutify-start items-start `}>
                        <h3 className='text-lg'>Email</h3>
                        <h2>{userInfo.email}</h2>
                    </div>
                </div>
                <div className='flex my-8 w-full justify-between flex-row'>
                <div className={` ${mode==='dark'?'bg-[#222f43]':'bg-[#e8edf5]'} relative cursor-pointer p-5 rounded my-2 mx-4 md:w-[330px]  flex flex-col justify-start items-start `}>
                        <h3 className='text-lg'>Username</h3>
                        <h2>{userInfo.username}</h2>
                    </div>

                    <div className={` ${mode==='dark'?'bg-[#222f43]':'bg-[#e8edf5]'} relative cursor-pointer p-5 rounded my-2 mx-4 md:w-[330px] flex flex-col jutify-start items-start `}>
                        <h3 className='text-lg'>Password</h3>
                        <button onClick={(e) => updatePass()} className={`p-2  text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Update Password</button>
                    </div>
                </div>

            </div>
            <AnimatePresence>
                {isOpen && <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, duration: 0.4 }}
                    className=' flex justify-center items-center fixed z-[1000] top-0 left-0 w-[100%] h-[100vh] backdrop-blur-sm bg-[#131c316f]'>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0, transition: { duration: .3 } }}
                        className={`modal mx-auto  md:w-[400px] bg-[#131c31] relative border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-[10px] `}>
                        <div className='absolute right-2 top-2'>
                            <RxCross2 onClick={() => setIsOpen(false)} />
                        </div>
                        <div className='flex justify-start flex-col my-3 p-4 h-[400px] overflow-scroll '>
                            <div className='flex justify-start flex-col my-3'>
                                <div className='flex justify-start flex-col my-3 '>
                                    <label htmlFor={`duration `} className='my-1'>Old Password</label>
                                    <input type="text" name='oldpass' value={updatedPass.oldpass} onChange={(e) => handleOnChange(e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter title' />
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <label htmlFor={`title `} className='my-1'>New Password</label>
                                    <input type="text" name='newpass' value={updatedPass.newpass} onChange={(e) => handleOnChange(e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter Description' />
                                </div>

                            </div>

                            <div className='m-5 flex justify-center items-center'>
                                <button onClick={() => handleUpdate()} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Update</button>
                            </div>
                        </div>

                    </motion.div>
                </motion.div>}
            </AnimatePresence>
        </section>
    )
}

export default AdminProfile
