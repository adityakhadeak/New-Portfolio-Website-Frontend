import React, { useContext, useState } from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import { motion } from 'framer-motion'
import { fadeIn } from '../Variants'
import '../Styles/ContactSection.css'
import '../Styles/Common.css'
import { BiMessageDetail } from "react-icons/bi";
import { useLocation } from 'react-router-dom'
import { BsTelephone } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { RiAccountCircleLine } from "react-icons/ri";
import { GoMail } from "react-icons/go";
import ScrollToTopOnReload from '../CustomHooks/ScrollToTopOnReload'
import ThemeContext from '../Context/ThemeContext'
import NavFixContext from '../Context/NavFixContext'
import AlertContext from '../Context/AlertContext.js'
import { BASE_URL } from '../helper'
const ContactSection = () => {
    const { mode } = useContext(ThemeContext)
    const [loading, setLoading] = useState(false)
    const { isFixed } = useContext(NavFixContext)
    const { showAlert } = useContext(AlertContext)
    const location = useLocation()
    ScrollToTopOnReload()

    const [message, setMessage] = useState({ name: "", email: "", msg: "" })
    const handleOnChange = (e) => {
        setMessage({ ...message, [e.target.name]: e.target.value })
    }
    const SendMessage = async (e) => {
        e.preventDefault()
        setLoading(true)
        if ((message.email === "") || (message.name === "") || (message.msg === '')) {
            showAlert("warning", "Please fill all fields")
            setLoading(false)
        }
        else {
            const response = await fetch(`${BASE_URL}/api/contact/addmsg`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify(message)

            })
            if (response.statusText === 'Too Many Requests') {
                showAlert('warning', "Only two message can be sent today")
                setMessage({ name: "", email: "", msg: "" })
                setLoading(false)

            }
            else {
                const res = await response.json()
                if (res.success) {
                    showAlert('success', 'Message Send Successfully')
                    setMessage({ name: "", email: "", msg: "" })
                }
                else {
                    showAlert('error', res.message)
                }
                setLoading(false)
            }
        }
    }
    return (
        <section className={` ${mode === 'dark' ? 'bg-[#0f172a]' : 'bg-[#f9fbff]'} contacts relative font-1 `}>
            <div className={` leftShadow before:top-0 ${location.pathname === '/' ? 'pt-[7.5rem] ' : 'pt-[3rem]'} ${location.pathname === '/contact' ? isFixed ? "md:mt-[86px] mt-[86px]" : "" : ""} rightShadow after:top-[-150px] md:mx-[205px] mx-auto`}>
                <motion.div
                    variants={fadeIn('left', 0.2)}
                    initial='hidden'
                    animate='show'
                    className='lineImg mx-8 flex items-center justify-center text-[25px] md:text-[30px] font-[Montserrat] font-semibold'>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >V.</span>
                    <h2 className='text-[#94a9c9] w-fit md:w-fit mx-2'>Contact</h2>
                </motion.div>
                <motion.div
                    variants={fadeIn('left', 0.25)}
                    initial='hidden'
                    animate='show'
                    className='flex my-2 justify-center text-lg font-mono text-[#94a9c9]'>
                    <h1>Get in Touch</h1>
                </motion.div>
                <div className='   flex  my-10 px-2 py-3  md:flex-row flex-col md:justify-evenly items-center text-[#94a9c9] font-mono'>
                    <motion.div
                        variants={fadeIn('right', 0.3)}
                        initial='hidden'
                        animate='show'
                        className='contacts-left  flex flex-col justify-center items-center w-[100%]'>
                        <div className='flex my-2 justify-center text-base md:text-xl text-[#94a9c9]'>
                            <h1 className='font-light'>Contact Details</h1>
                        </div>
                        <div className={` ${mode === 'dark' ? 'bg-[#222f43]' : 'bg-[#e8edf5]'} relative cursor-pointer p-5 rounded my-2  md:max-w-[350px] md:w-[350px] w-[85%] flex justify-start items-center `}>
                            <span className='text-xl w-[45px]  '><BsTelephone /></span>
                            <a href="tel:+919422006299" className=''> +91 9422006299</a>
                        </div>
                        <div className={` ${mode === 'dark' ? 'bg-[#222f43]' : 'bg-[#e8edf5]'} relative cursor-pointer p-5 rounded my-2  md:max-w-[350px] md:w-[350px] w-[85%] flex justify-start items-center `}>
                            <span className='text-xl w-[45px] '><GoMail /></span>

                            <a href="mailto:khadeaditya1@gmail.com" className='ml-1'>khadeaditya1@gmail.com</a>
                        </div>
                        <div className={` ${mode === 'dark' ? 'bg-[#222f43]' : 'bg-[#e8edf5]'} relative cursor-pointer p-5 rounded my-2  md:max-w-[350px] md:w-[350px] w-[85%] flex justify-start items-center `}>
                            <span className='text-xl w-[45px] '>< SlLocationPin /></span>

                            <a href="mailto:khadeaditya1@gmail.com" className='ml-1'>Badlapur, Thane </a>
                        </div>

                    </motion.div>
                    <motion.div
                        variants={fadeIn('left', 0.3)}
                        initial='hidden'
                        animate='show'
                        className='contact-middle md:inline-block hidden mx-5'>
                        <div className='w-[3px] h-[300px] bg-[#94a9c9]' ></div>
                    </motion.div>
                    <motion.div

                        variants={fadeIn('left', 0.3)}
                        initial='hidden'
                        animate='show'
                        className='contacts-right z-[1] flex flex-col justify-center items-center w-[100%]'>
                        <div className='flex mt-[33px] my-2 justify-center text-base md:text-xl text-[#94a9c9]'>
                            <h1 className='font-light '>Contact Form</h1>
                        </div>
                        <form onSubmit={e => SendMessage(e)}  className='flex flex-col justify-center items-center w-[100%]'>
                            <div className={` ${mode === 'dark' ? 'bg-[#222f43]' : 'bg-[#e8edf5]'} relative h-[60px] p-2 px-4 rounded my-2 md:w-[350px] w-[85%] flex justify-start items-center `}>
                                <span className='text-xl w-[45px] '>< RiAccountCircleLine /></span>
                                <input onChange={e => handleOnChange(e)} type="text" name='name' value={message.name} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent  placeholder:text-[#94a9c9] p-3  md:w-[330px]`} required placeholder='Enter your name' />
                            </div>
                            <div className={` ${mode === 'dark' ? 'bg-[#222f43]' : 'bg-[#e8edf5]'} relative h-[60px] p-2 px-4 rounded my-2 md:w-[350px] w-[85%] flex justify-start items-center `}>
                                <span className='text-xl w-[45px] '>< GoMail /></span>

                                <input onChange={e => handleOnChange(e)} type="email" name='email' value={message.email} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  md:w-[330px]`} required placeholder='Enter your email' />
                            </div>
                            <div className={` ${mode === 'dark' ? 'bg-[#222f43]' : 'bg-[#e8edf5]'} relative h-[60px] p-2 px-4 rounded my-2 md:w-[350px] w-[85%] flex justify-start items-center `}>
                                <span className='text-xl w-[45px] '>< BiMessageDetail /></span>

                                <textarea onChange={e => handleOnChange(e)} type="text" name='msg' value={message.msg} rows={1} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  md:w-[330px]`} required placeholder='Enter your message' />
                            </div>
                            <div>
                            {loading ? < PulseLoader
                            color={"#0bccd3"}
                            loading={loading}
                            speedMultiplier={1}
                            cssOverride={{ margin: "10px 0" }}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        /> :<button className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Send</button>

                        }
                    
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection
