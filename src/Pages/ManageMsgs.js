import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import '../Styles/Common.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import { BASE_URL } from '../helper'
import AlertContext from '../Context/AlertContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader.js';
const ManageMsgs = () => {
    const navigate = useNavigate()
    const { mode } = useContext(ThemeContext)
    const [loading, setLoading] = useState(false)
    const { showAlert } = useContext(AlertContext)
    const [messages, setMessages] = useState([])
    document.title="Aditya's Portfolio | Manage Messages"
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
        else {
            fetchAllMessages()
        }
        // eslint-disable-next-line
    }, [])

    const fetchAllMessages = async () => {

        const response = await fetch(`${BASE_URL}/api/contact/fetchallmsg`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const res = await response.json()
        if (res.success) {
            setMessages(res.data)
        }
        else if (res.message === "Token has expired") {
            localStorage.removeItem("token")
            navigate("/login")
        }
    }
    const handleMsgDelete = async (id) => {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/api/contact/deletemsg/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const res = await response.json()
        if (res.success) {
            showAlert("success", res.message)
            setMessages(messages.filter(message => message._id !== id))
            setLoading(false)

        }
        else {
            showAlert("error", res.message)
            setLoading(false)

        }
    }
    return (
        <>
            <section className='md:ml-[75px]'>
                <motion.div
                    variants={fadeIn('left', 0.2, 10)}
                    initial='hidden'
                    animate='show'
                    className='flex items-center justify-between mb-8'>
                    <div>
                        <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Messages</h1>
                        <p className='text-[#94a9c9] text-sm'>View and manage contact messages ({messages.length})</p>
                    </div>
                </motion.div>
                {messages.length === 0 ? (
                    <motion.div
                        variants={fadeIn('up', 0.4)}
                        initial='hidden'
                        animate='show'
                        className={`${mode === 'dark' ? 'bg-[#131c31]' : 'bg-white'} rounded-2xl shadow-lg p-12 text-center border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                        <div className='text-6xl mb-4'>📬</div>
                        <p className='text-[#94a9c9] text-lg'>No messages yet</p>
                    </motion.div>
                ) : (
                    <div className='grid md:grid-cols-2 gap-6'>
                        {messages.map((msg, index) => (
                            <motion.div
                                variants={fadeIn('up', 0.1 * index, 10)}
                                initial='hidden'
                                animate='show'
                                key={index} 
                                className={`group ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-2xl shadow-lg hover:shadow-2xl p-6 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} hover:border-[#1cc2e7]/50 transition-all duration-300`}>
                                <div className='flex justify-between items-start mb-4'>
                                    <h3 className={`text-lg font-bold ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Message #{index + 1}</h3>
                                    <span className='text-xs text-[#94a9c9] bg-[#1cc2e7]/10 px-3 py-1 rounded-full'>{msg.date}</span>
                                </div>
                                
                                <div className='space-y-3 mb-4'>
                                    <div>
                                        <label className={`text-xs font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} mb-1 block`}>Name</label>
                                        <p className='text-[#94a9c9]'>{msg.name}</p>
                                    </div>
                                    <div>
                                        <label className={`text-xs font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} mb-1 block`}>Email</label>
                                        <p className='text-[#94a9c9] break-all'>{msg.email}</p>
                                    </div>
                                    <div>
                                        <label className={`text-xs font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} mb-1 block`}>Message</label>
                                        <p className='text-[#94a9c9] bg-[#0a0e1a] p-3 rounded-lg'>{msg.msg}</p>
                                    </div>
                                </div>
                                
                                <div className='flex gap-2'>
                                    <a 
                                        href={`mailto:${msg.email}`}
                                        className='flex-1 py-2 px-4 bg-[#1cc2e7]/10 hover:bg-[#1cc2e7] text-[#1cc2e7] hover:text-white border border-[#1cc2e7]/30 hover:border-[#1cc2e7] rounded-xl font-medium text-center transition-all duration-300'>
                                        Reply
                                    </a>
                                    <button 
                                        onClick={() => handleMsgDelete(msg._id)} 
                                        className='flex-1 py-2 px-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 hover:border-red-500 rounded-xl font-medium transition-all duration-300'>
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
                {loading && <Loader loading={loading}/>
                }
            </section>
        </>
    )
}

export default ManageMsgs
