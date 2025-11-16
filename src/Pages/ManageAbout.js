import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import '../Styles/Common.css'
import { BASE_URL } from '../helper'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import AboutModal from '../Components/Admin/AboutModal'
import AlertContext from '../Context/AlertContext'
import { useNavigate } from 'react-router-dom'
const ManageAbout = () => {
    const navigate = useNavigate()
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)
    document.title="Aditya's Portfolio | Manage About"

    const [aboutData, setaboutData] = useState([{ para: "" }])
    const [paras, setParas] = useState([])
    const [selectedPara, setSelectedPara] = useState({ para: "", id: "" })
    const [isOpen, setIsOpen] = useState(false)
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
        else {
            fetchAboutParas()
        }
        // eslint-disable-next-line
    }, [isOpen])

    const fetchAboutParas = async () => {
        const response = await fetch(`${BASE_URL}/api/about/fetchabout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const res = await response.json()
        if (res.success) {
            setParas(res.data)
        }

    }

    const handleParaDelete = async (id) => {
        const response = await fetch(`${BASE_URL}/api/about/deleteabout/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })

        const json = await response.json()
        if (json.success) {
            showAlert('success', "Paragraph Delete Successfully")
            setParas(paras.filter(para => para._id !== id))
        }
    }

    const UpdatePara = async (id, para) => {
        setIsOpen(true)
        setSelectedPara({ para: para, id: id })
    }
    const handleRemovePara = (index) => {
        const value = [...aboutData]
        value.splice(index, 1)
        setaboutData(value)
    }
    const handleOnChange = (index, e) => {
        const data = [...aboutData]
        data[index].para = e.target.value
        setaboutData(data)
    }
    const handleAddPara = () => {
        const data = [...aboutData, { para: "" }]
        setaboutData(data)
    }
    const handleSubmit = async () => {
        const response = await fetch(`${BASE_URL}/api/about/addabout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(aboutData) // body data type must match "Content-Type" header
        });
        const res = await response.json()
        if (res.success) {
            showAlert('success', "Paragraphs Added Successfully")
            setParas([...paras, ...res.data])
        }
        setaboutData([{ para: "" }])
    }
    return (
        <div className='md:ml-[75px]'>
            <motion.div
                variants={fadeIn('left', 0.2, 10)}
                initial='hidden'
                animate='show'
                className='flex items-center justify-between mb-8'>
                <div>
                    <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>About Management</h1>
                    <p className='text-[#94a9c9] text-sm'>Add and manage paragraphs for your about section</p>
                </div>
            </motion.div>
            <motion.div
                variants={fadeIn('up', 0.3, 10)}
                initial='hidden'
                animate='show'
                className={`max-w-4xl mx-auto ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                <h2 className={`text-xl md:text-2xl font-bold mb-6 flex items-center ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>
                    <span className='w-1 h-8 bg-gradient-to-b from-[#1cc2e7] to-[#0bccd3] rounded-full mr-3'></span>
                    Add About Paragraphs
                </h2>
                <form className='space-y-6' method='post' encType='multipart/form-data'>
                    {aboutData.map((data, index) => (
                        <div key={index} className={`${mode === 'dark' ? 'bg-[#0a0e1a]' : 'bg-[#f5f7fb]'} p-4 rounded-xl border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                            <label htmlFor={`para-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Paragraph {index + 1}</label>
                            <textarea 
                                type="text" 
                                name='para' 
                                value={data.para} 
                                onChange={(e) => handleOnChange(index, e)} 
                                rows="4"
                                className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20 resize-none`} 
                                placeholder='Enter paragraph content' 
                            />
                            <button 
                                onClick={(e) => handleRemovePara(index)} 
                                className='mt-3 px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 hover:border-red-500 rounded-lg font-medium transition-all duration-300'>
                                Remove
                            </button>
                        </div>
                    ))}

                </form>
                <div className='flex gap-4 mt-6'>
                    <button 
                        onClick={handleAddPara} 
                        className='px-6 py-3 bg-[#1cc2e7]/10 hover:bg-[#1cc2e7]/20 text-[#1cc2e7] border border-[#1cc2e7]/30 font-semibold rounded-xl transition-all duration-300'>
                        Add More
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        className='px-8 py-3 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1cc2e7]/50 transform hover:scale-105 transition-all duration-300'>
                        Submit
                    </button>
                </div>
            </motion.div>
            <AboutModal paras={paras} setParas={setParas} para={selectedPara.para} paraid={selectedPara.id} isOpen={isOpen} setIsOpen={setIsOpen} />
            <section>
                <motion.div
                    variants={fadeIn('left', 0.2, 10)}
                    initial='hidden'
                    animate='show'
                    className='mb-6'>
                    <h2 className={`text-2xl md:text-3xl font-bold ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Current Paragraphs ({paras.length})</h2>
                </motion.div>
                <div className='grid md:grid-cols-2 gap-6'>
                    {paras.map((para, index) => (
                        <motion.div
                            variants={fadeIn('up', 0.1 * index, 10)}
                            initial='hidden'
                            animate='show'
                            key={index} 
                            className={`group ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-2xl shadow-lg hover:shadow-2xl p-6 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} hover:border-[#1cc2e7]/50 transition-all duration-300`}>
                            <h3 className={`text-lg font-bold mb-3 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Paragraph {index + 1}</h3>
                            <p className='text-justify text-[#94a9c9] mb-4 leading-7'>{para.para}</p>
                            <div className='flex gap-2'>
                                <button 
                                    onClick={() => UpdatePara(para._id, para.para)} 
                                    className='flex-1 py-2 px-4 bg-[#1cc2e7]/10 hover:bg-[#1cc2e7] text-[#1cc2e7] hover:text-white border border-[#1cc2e7]/30 hover:border-[#1cc2e7] rounded-xl font-medium transition-all duration-300'>
                                    Update
                                </button>
                                <button 
                                    onClick={() => handleParaDelete(para._id)} 
                                    className='flex-1 py-2 px-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 hover:border-red-500 rounded-xl font-medium transition-all duration-300'>
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default ManageAbout
