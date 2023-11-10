import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import '../Styles/Common.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import { BASE_URL } from '../helper'
import AlertContext from '../Context/AlertContext'
const ManageMsgs = () => {
    const { mode } = useContext(ThemeContext)
    const {showAlert}=useContext(AlertContext)
    const [messages, setMessages] = useState([])
    useEffect(() => {
        fetchAllMessages()
    }, [])

    const fetchAllMessages = async () => {

        const response = await fetch(`${BASE_URL}/api/contact/fetchallmsg`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            }
        })
        const res = await response.json()
        if (res.success) {
            setMessages(res.data)
        }
    }
    const handleMsgDelete = async (id) => {
        const response = await fetch(`${BASE_URL}/api/contact/deletemsg/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            }
        })
        const res = await response.json()
        if (res.success) {
            showAlert("success",res.message)
            setMessages(messages.filter(message => message._id !== id))
        }
        else {
            showAlert("error",res.message)
        }
    }
    return (
        <>
            <section className='flex flex-col justify-center items-center'>
                <motion.div
                    variants={fadeIn('left', 0.2, 10)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    className=' mx-8 flex items-center justify-center text-[25px] md:text-[30px] font-[Montserrat] my-4 py-2 font-semibold'>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' ></span>
                    <h2 className='text-[#94a9c9] w-[-webkit-fill-available] text-center md:w-fit mx-2'>Messages</h2>
                </motion.div>
                {messages.length === 0 ? (
                    <div className='flex justify-center items-center'>
                        <p className='text-[#94a9c9] w-[-webkit-fill-available] text-center md:w-fit mx-auto'>
                            No messages to display
                        </p>
                    </div>
                ) : (
                    <div className='my-5 grid md:grid-cols-2 grid-cols-1 gap-3'>
                        {messages.map((msg, index) => (
                            <motion.div
                                variants={fadeIn('left', `0.4${index}`, 10)}
                                initial='hidden'
                                whileInView={'show'}
                                viewport={{ once: true, amount: 0.7 }}
                                key={index} className=' w-[295px] md:w-[500px] bg-[#131c31] p-3 rounded-lg my-5 font-mono'>
                                <h3>Message-{index + 1}</h3>
                                <div className='flex justify-start flex-col my-3 '>
                                    <div className='my-1'>Name</div>
                                    <div>{msg.name}</div>
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <div className='my-1'>Email</div>
                                    <div>{msg.email}</div>

                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <div className='my-1'>Message</div>
                                    <div>{msg.msg}</div>
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <div className='my-1'>Date</div>
                                    <div>{msg.date}</div>
                                </div>

                                <button onClick={() => handleMsgDelete(msg._id)} className={`p-2 w-[90px] text-base mx-2  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Delete</button>
                                <button className={`p-2 w-[90px] text-base mx-2 ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}><a href={`mailto:${msg.email}`} >Reply</a></button>
                            </motion.div>
                        ))
                        }
                    </div>)
                }
            </section>
        </>
    )
}

export default ManageMsgs
