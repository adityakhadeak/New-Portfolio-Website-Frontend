import React, { useContext, useEffect, useState } from 'react'
import EduModal from './EduModal'
import { BASE_URL } from '../../helper'
import { fadeIn } from '../../Variants'
import { motion } from 'framer-motion'
import ThemeContext from '../../Context/ThemeContext'
import AlertContext from '../../Context/AlertContext'
import { useNavigate } from 'react-router-dom'
const EduDetails = (props) => {
    const navigate=useNavigate()   
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)
    const { isOpen, setIsOpen, edus, setEdus } = props
    const [selectedEdu, setSelectedEdu] = useState({ year: '', clg: '', edu: '', sts: '', link: '', id: '' })

    const token=localStorage.getItem('token')

    useEffect(() => {
        if ( token== null) {
            navigate("/login")
        }
        else{
            fetchEdus()
        }
        // eslint-disable-next-line
    }, [isOpen])
  
    const fetchEdus = async () => {
        const response = await fetch(`${BASE_URL}/api/edu/fetchedu`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const res = await response.json()
        if (res.success) {
            setEdus(res.data)
        }
    }

    const handleEduDelete = async (id) => {
        console.log("CAlled")
        console.log(id)
        const response = await fetch(`${BASE_URL}/api/edu/deleteedu/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
             }
        })

        const json = await response.json()
        if (json.success) {
            setEdus(edus.filter(edu => edu._id !== id))
            showAlert('success',"Education Deleted Successfully")

        }
    }

    const UpdateEdu = async (year, clg, edu, sts, link, id) => {
        setIsOpen(true)
        setSelectedEdu({ year, clg, edu, sts, link, id })
    }
    return (
        <>
            <EduModal edus={edus} setEdus={setEdus} selectedEdu={selectedEdu} setSelectedEdu={setSelectedEdu} isOpen={isOpen} setIsOpen={setIsOpen} />

            <section className='max-w-6xl mx-auto mt-12'>
                <motion.div
                    variants={fadeIn('down', 0.2)}
                    initial='hidden'
                    animate='show'
                    className='mb-6'>
                    <h2 className={`text-2xl md:text-3xl font-bold ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Education Details ({edus.length})</h2>
                    <p className='text-[#94a9c9] text-sm mt-1'>Your current education information</p>
                </motion.div>
                {edus.length === 0 ? (
                    <motion.div
                        variants={fadeIn('up', 0.4)}
                        initial='hidden'
                        animate='show'
                        className={`${mode === 'dark' ? 'bg-[#131c31]' : 'bg-white'} rounded-2xl shadow-lg p-12 text-center border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                        <div className='text-6xl mb-4'>🎓</div>
                        <p className='text-[#94a9c9] text-lg'>No education details added yet</p>
                        <p className='text-[#94a9c9]/70 text-sm mt-2'>Add your education using the form above</p>
                    </motion.div>
                ) : (
                    <div className='grid md:grid-cols-2 gap-6'>
                        {edus.map((edu, index) => (
                            <motion.div
                                variants={fadeIn('up', 0.1 * index, 10)}
                                initial='hidden'
                                animate='show'
                                key={index}
                                className={`group ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-2xl shadow-lg hover:shadow-2xl p-6 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} hover:border-[#1cc2e7]/50 transition-all duration-300`}>
                                <div className='flex justify-between items-start mb-4'>
                                    <h3 className={`text-lg font-bold ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Education #{index + 1}</h3>
                                    <span className='text-xs text-[#94a9c9] bg-[#1cc2e7]/10 px-3 py-1 rounded-full'>{edu.year}</span>
                                </div>
                                
                                <div className='space-y-3 mb-4'>
                                    <div>
                                        <label className={`text-xs font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} block mb-1`}>Institution</label>
                                        <p className='text-[#94a9c9] text-sm'>{edu.clg}</p>
                                    </div>
                                    <div>
                                        <label className={`text-xs font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} block mb-1`}>Degree/Course</label>
                                        <p className='text-[#94a9c9] text-sm'>{edu.edu}</p>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <label className={`text-xs font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} block mb-1`}>Status</label>
                                            <p className='text-[#94a9c9] text-sm'>{edu.sts}</p>
                                        </div>
                                        {edu.link && (
                                            <a href={edu.link} target='_blank' rel='noopener noreferrer' className='text-xs text-[#1cc2e7] hover:underline'>View Link →</a>
                                        )}
                                    </div>
                                </div>
                                
                                <div className='flex gap-2 pt-4 border-t border-[#222f43]'>
                                    <button 
                                        onClick={() => UpdateEdu(edu.year, edu.clg, edu.edu, edu.sts, edu.link, edu._id)} 
                                        className='flex-1 py-2 px-4 bg-[#1cc2e7]/10 hover:bg-[#1cc2e7] text-[#1cc2e7] hover:text-white border border-[#1cc2e7]/30 hover:border-[#1cc2e7] rounded-xl font-medium transition-all duration-300'>
                                        Update
                                    </button>
                                    <button 
                                        onClick={() => handleEduDelete(edu._id)} 
                                        className='flex-1 py-2 px-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 hover:border-red-500 rounded-xl font-medium transition-all duration-300'>
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </>
    )
}

export default EduDetails
