import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../Variants'
import '../Styles/ContactSection.css'
import { BiMessageDetail } from "react-icons/bi";

import { BsTelephone } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { RiAccountCircleLine } from "react-icons/ri";

import { GoMail } from "react-icons/go";

const ContactSection = () => {
    return (
        <section className='contacts font-1 '>
            <div className='pt-[7.5rem] md:mx-[205px] mx-auto'>
                <motion.div
                    variants={fadeIn('left', 0.2, 10)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    className='lineImg flex items-center justify-center text-[25px] md:text-[30px] font-[Montserrat] font-semibold'>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' >V.</span>
                    <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>Contact</h2>
                </motion.div>
                <div className='flex my-2 justify-center text-lg font-mono text-[#94a9c9]'>
                    <h1>Get in Touch</h1>
                </div>
                <div className='   flex flex-wrap my-10 px-2 py-3  md:flex-row flex-col  md:justify-evenly items-center text-[#94a9c9] font-mono'>
                    <div className='contacts-left flex flex-col'>
                        <div className='flex my-2 justify-center text-base md:text-xl text-[#94a9c9]'>
                            <h1 className='font-light'>Contact Details</h1>
                        </div>
                        <div className='relative p-5 rounded my-2 w-auto md:w-[300px] flex justify-start items-center bg-[#222f43]'>
                            <span className='text-xl w-[45px]  '><BsTelephone /></span>
                            <a href="tel:+919422006299" className=''> +91 9422006299</a>
                        </div>
                        <div className='relative p-5 rounded my-2 md:max-w-[300px] flex justify-start items-center bg-[#222f43]'>
                            <span className='text-xl w-[45px] '><GoMail /></span>

                            <a href="mailto:khadeaditya1@gmail.com" className='ml-1'>khadeaditya1@gmail.com</a>
                        </div>
                        <div className='relative p-5 rounded my-2 md:max-w-[300px] flex justify-start items-center bg-[#222f43]'>
                            <span className='text-xl w-[45px] '>< SlLocationPin /></span>

                            <a href="mailto:khadeaditya1@gmail.com" className='ml-1'>Badlapur, Thane </a>
                        </div>

                    </div>
                    <div className='contact-middle md:inline-block hidden'>
                        <div className='w-[3px] h-[300px] bg-[#94a9c9]' ></div>
                    </div>
                    <div className='contacts-right'>
                        <div className='flex my-2 justify-center text-base md:text-xl text-[#94a9c9]'>
                            <h1 className='font-light '>Contact Form</h1>
                        </div>                        <form >
                            <div className='relative p-2 px-4 rounded my-2 md:w-[350px] flex justify-start items-center bg-[#222f43]'>
                                <span className='text-xl w-[45px] '>< RiAccountCircleLine /></span>
                                <input type="text" className='active-input bg-transparent p-3  md:w-[330px]' placeholder='Enter your name' />
                            </div>
                            <div className='relative p-2 px-4 rounded my-2 md:w-[350px] flex justify-start items-center bg-[#222f43]'>
                                <span className='text-xl w-[45px] '>< GoMail /></span>

                                <input type="text" className='active-input bg-transparent p-3  md:w-[330px]' placeholder='Enter your email' />
                            </div>
                            <div className='relative p-2 px-4 rounded my-2 md:w-[350px] flex justify-start items-center bg-[#222f43]'>
                                <span className='text-xl w-[45px] '>< BiMessageDetail /></span>

                                <textarea type="text" rows={1} className='active-input bg-transparent p-3  md:w-[330px]' placeholder='Enter your message' />
                            </div>
                            <div>
                                <button className='p-2 w-[90px] text-base hover:bg-[#222f43] border border-cyan-400'>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection