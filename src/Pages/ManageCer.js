import React, { useContext, useEffect, useState } from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import ThemeContext from '../Context/ThemeContext'
import '../Styles/Common.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import { BASE_URL } from '../helper'
import CerModal from '../Components/Admin/CerModal'
import AlertContext from '../Context/AlertContext'
import { useNavigate } from 'react-router-dom'
const ManageCer = () => {
    const navigate = useNavigate()
    const { mode } = useContext(ThemeContext)
    const [loading, setLoading] = useState(false)
    const { showAlert } = useContext(AlertContext)
    const [cerData, setcerData] = useState([{ title: '', desc: '', date: '', platform: '', label: '', doc: '' }])
    const [cers, setCers] = useState([])
    const [selectedCer, setSelectedCer] = useState({ title: '', desc: '', date: '', platform: '', label: '', doc: '', id: "" })
    document.title="Aditya's Portfolio | Manage Certificates"
    const [isOpen, setIsOpen] = useState(false)


    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
        else {
            fetchAboutCers()
        }
        // eslint-disable-next-line
    }, [isOpen])

    const fetchAboutCers = async () => {
        const response = await fetch(`${BASE_URL}/api/cer/fetchcertificates`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const res = await response.json()
        if (res.success) {
            setCers(res.data)
        }
    }

    const handleCerDelete = async (id) => {
        const response = await fetch(`${BASE_URL}/api/cer/deletecer/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })

        const json = await response.json()
        if (json.success) {
            setCers(cers.filter(cer => cer._id !== id))
        }
    }

    const UpdateCer = async (title, desc, date, platform, label, doc, id) => {
        setIsOpen(true)
        setSelectedCer({ title, desc, date, platform, label, doc, id })
    }
    const handleRemoveexp = (index) => {
        const value = [...cerData]
        value.splice(index, 1)
        setcerData(value)
    }
    const handleOnChange = (index, e) => {
        const data = [...cerData]
        data[index][e.target.name] = e.target.value
        setcerData(data)
    }

    const handleAddexp = () => {
        const data = [...cerData, { title: '', desc: '', date: '', platform: '', label: '', doc: '' }]
        setcerData(data)
    }

    const handleSubmit = async () => {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/api/cer/addcertificate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(cerData) // body data type must match "Content-Type" header
        });
        const res = await response.json()
        console.log(res)
        if (res.success) {
            setCers([...cers, ...res.data])
            setcerData([{ title: '', desc: '', date: '', platform: '', label: '', doc: '' }])
            setLoading(false)
            showAlert('success', "Certificate details Added")
        }
    }
    return (
        <div className='md:ml-[75px]'>
            <motion.div
                variants={fadeIn('left', 0.2, 10)}
                initial='hidden'
                animate='show'
                className='flex items-center justify-between mb-8'>
                <div>
                    <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Certificates Management</h1>
                    <p className='text-[#94a9c9] text-sm'>Add and manage your certifications and achievements</p>
                </div>
            </motion.div>
            
            <motion.div
                variants={fadeIn('up', 0.3, 10)}
                initial='hidden'
                animate='show'
                className={`max-w-4xl mx-auto ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                <h2 className={`text-xl md:text-2xl font-bold mb-6 flex items-center ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>
                    <span className='w-1 h-8 bg-gradient-to-b from-[#1cc2e7] to-[#0bccd3] rounded-full mr-3'></span>
                    Add Certificate Details
                </h2>
                <form className='space-y-6' method='post' encType='multipart/form-data'>
                    {cerData.map((data, index) => (
                        <div key={index} className={`${mode === 'dark' ? 'bg-[#0a0e1a]' : 'bg-[#f5f7fb]'} p-6 rounded-xl border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} space-y-4`}>
                            <div className='flex justify-between items-center mb-4'>
                                <h3 className={`text-lg font-bold ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Certificate #{index + 1}</h3>
                                {cerData.length > 1 && (
                                    <button 
                                        type='button'
                                        onClick={(e) => {e.preventDefault(); handleRemoveexp(index)}}
                                        className='px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 hover:border-red-500 rounded-lg font-medium transition-all duration-300 text-sm'>
                                        Remove
                                    </button>
                                )}
                            </div>
                            <div className='grid md:grid-cols-2 gap-4'>
                                <div className='md:col-span-2'>
                                    <label htmlFor={`title-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Certificate Title</label>
                                    <input 
                                        type="text" 
                                        name='title' 
                                        value={data.title} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='Full Stack Development' 
                                    />
                                </div>
                                <div className='md:col-span-2'>
                                    <label htmlFor={`desc-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Description</label>
                                    <textarea 
                                        name='desc' 
                                        value={data.desc} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        rows="3"
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20 resize-none`} 
                                        placeholder='Brief description of the certificate' 
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`date-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Date <span className='text-xs text-[#94a9c9]'>(DD-MM-YYYY)</span></label>
                                    <input 
                                        type="text" 
                                        name='date' 
                                        value={data.date} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='10-08-2023' 
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`platform-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Platform</label>
                                    <input 
                                        type="text" 
                                        name='platform' 
                                        value={data.platform} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='Coursera, Udemy, etc.' 
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`label-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Label/Type</label>
                                    <input 
                                        type="text" 
                                        name='label' 
                                        value={data.label} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='Course / Bootcamp' 
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`doc-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Certificate Link</label>
                                    <input 
                                        type="text" 
                                        name='doc' 
                                        value={data.doc} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='https://...' 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                </form>
                <div className='flex gap-4 mt-6'>
                    <button 
                        type='button'
                        onClick={(e) => {e.preventDefault(); handleAddexp()}} 
                        className='px-6 py-3 bg-[#1cc2e7]/10 hover:bg-[#1cc2e7]/20 text-[#1cc2e7] border border-[#1cc2e7]/30 font-semibold rounded-xl transition-all duration-300'>
                        + Add Another
                    </button>
                    {loading ? (
                        <div className='flex items-center px-8 py-3'>
                            <PulseLoader color={"#0bccd3"} loading={loading} speedMultiplier={1} size={10} />
                        </div>
                    ) : (
                        <button 
                            type='button'
                            onClick={(e) => {e.preventDefault(); handleSubmit()}} 
                            className='px-8 py-3 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1cc2e7]/50 transform hover:scale-105 transition-all duration-300'>
                            Save Certificates
                        </button>
                    )}
                </div>
            </motion.div>
            <CerModal cers={cers} setCers={setCers} selectedCer={selectedCer} setSelectedCer={setSelectedCer} isOpen={isOpen} setIsOpen={setIsOpen} />

            <section>
                <motion.div
                    variants={fadeIn('left', 0.2, 10)}
                    initial='hidden'
                    animate='show'
                    className='mb-6'>
                    <h2 className={`text-2xl md:text-3xl font-bold ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Your Certificates ({cers.length})</h2>
                </motion.div>
                {cers.length === 0 ? (
                    <motion.div
                        variants={fadeIn('up', 0.4)}
                        initial='hidden'
                        animate='show'
                        className={`${mode === 'dark' ? 'bg-[#131c31]' : 'bg-white'} rounded-2xl shadow-lg p-12 text-center border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                        <div className='text-6xl mb-4'>🏆</div>
                        <p className='text-[#94a9c9] text-lg'>No certificates added yet</p>
                    </motion.div>
                ) : (
                    <div className='grid md:grid-cols-2 gap-6'>
                        {cers.map((cer, index) => (
                            <motion.div
                                variants={fadeIn('up', 0.1 * index, 10)}
                                initial='hidden'
                                animate='show'
                                key={index} 
                                className={`group ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-2xl shadow-lg hover:shadow-2xl p-6 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} hover:border-[#1cc2e7]/50 transition-all duration-300`}>
                                <div className='flex justify-between items-start mb-4'>
                                    <h3 className={`text-lg font-bold ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>{cer.title}</h3>
                                    <span className='text-xs text-[#94a9c9] bg-[#1cc2e7]/10 px-3 py-1 rounded-full'>{cer.date}</span>
                                </div>
                                
                                <p className='text-[#94a9c9] text-sm mb-4'>{cer.desc}</p>
                                
                                <div className='space-y-2 mb-4'>
                                    <div className='flex items-center gap-2'>
                                        <span className={`text-xs font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Platform:</span>
                                        <span className='text-sm text-[#94a9c9]'>{cer.platform}</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <span className={`text-xs font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Type:</span>
                                        <span className='text-sm text-[#94a9c9]'>{cer.label}</span>
                                    </div>
                                    {cer.doc && (
                                        <a href={cer.doc} target='_blank' rel='noopener noreferrer' className='text-xs text-[#1cc2e7] hover:underline block'>View Certificate →</a>
                                    )}
                                </div>
                                
                                <div className='flex gap-2'>
                                    <button 
                                        onClick={() => UpdateCer(cer.title, cer.desc, cer.date, cer.platform, cer.label, cer.doc, cer._id)} 
                                        className='flex-1 py-2 px-4 bg-[#1cc2e7]/10 hover:bg-[#1cc2e7] text-[#1cc2e7] hover:text-white border border-[#1cc2e7]/30 hover:border-[#1cc2e7] rounded-xl font-medium transition-all duration-300'>
                                        Update
                                    </button>
                                    <button 
                                        onClick={() => handleCerDelete(cer._id)} 
                                        className='flex-1 py-2 px-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 hover:border-red-500 rounded-xl font-medium transition-all duration-300'>
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default ManageCer
