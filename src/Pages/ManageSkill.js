import React, { useContext, useEffect, useState } from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import ThemeContext from '../Context/ThemeContext'
import '../Styles/Common.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import { BASE_URL } from '../helper'
import AlertContext from '../Context/AlertContext'
import { useNavigate } from 'react-router-dom'
const ManageSkill = () => {
    const navigate = useNavigate()
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)
    const [loading, setLoading] = useState(false)
    const [skill, setSkill] = useState('')
    const [image, setImage] = useState(null)
    const [skills, setSkills] = useState([])
    document.title="Aditya's Portfolio | Manage Skills"
    const handleSkillOnChange = (value) => {
        setSkill(value)
    }

    const handleImgOnChange = (file) => {
        setImage(file)
    }

    const token = localStorage.getItem('token')
    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
        else {
            fetchAllSkills()
        }
        // eslint-disable-next-line
    }, [])

    const fetchAllSkills = async () => {
        const response = await fetch(`${BASE_URL}/api/skill/fetchskills`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const res = await response.json()
        if (res.success) {
            setSkills(res.data)
        }
    }
    const handleSubmit = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append('name', skill)
        formData.append('image', image)
        const response = await fetch(`${BASE_URL}/api/skill/addskills`, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem('token')
             },
            body: formData
        });
        const res = await response.json()

        if (res.success) {
            setSkill(' ')
            setImage(null)
            setSkills([...skills, ...res.data])
            setLoading(false)
            showAlert('success', res.message)
        }

    }
    const handleSkillDelete = async (id) => {
        const response = await fetch(`${BASE_URL}/api/skill/deleteskill/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
              }
        })

        const res = await response.json()
        if (res.success) {
            alert(res.message)
            setSkills(skills.filter(skill => skill._id !== id))
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
                    <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Skills Management</h1>
                    <p className='text-[#94a9c9] text-sm'>Add and manage your technical skills</p>
                </div>
            </motion.div>

            {/* Add Skill Card */}
            <motion.div
                variants={fadeIn('up', 0.3, 10)}
                initial='hidden'
                animate='show'
                className={`max-w-4xl mx-auto ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                <h2 className={`text-xl md:text-2xl font-bold mb-6 flex items-center ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>
                    <span className='w-1 h-8 bg-gradient-to-b from-[#1cc2e7] to-[#0bccd3] rounded-full mr-3'></span>
                    Add New Skill
                </h2>
                <form className='grid md:grid-cols-2 gap-6' method='post' encType='multipart/form-data'>
                    <div className='flex flex-col'>
                        <label htmlFor='skill' className={`mb-2 font-medium ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Skill Name</label>
                        <input 
                            type="text" 
                            name='skill' 
                            value={skill} 
                            onChange={(e) => handleSkillOnChange(e.target.value)} 
                            className={`${mode === 'dark' ? 'bg-[#0a0e1a] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-[#f5f7fb] border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                            placeholder='e.g., React.js' 
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='image' className={`mb-2 font-medium ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Skill Icon</label>
                        <input 
                            type="file" 
                            accept='image/*' 
                            name='image' 
                            onChange={(e) => handleImgOnChange(e.target.files[0])} 
                            className={`${mode === 'dark' ? 'bg-[#0a0e1a] border-[#222f43]' : 'bg-[#f5f7fb] border-[#c2d4ee]'} text-[#94a9c9] p-4 border-2 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1cc2e7] file:text-white hover:file:bg-[#0bccd3] file:cursor-pointer transition-all duration-300`} 
                        />
                    </div>
                </form>
                
                {loading ? (
                    <div className='flex justify-center mt-6'>
                        <PulseLoader color={"#0bccd3"} loading={loading} speedMultiplier={1} size={10} />
                    </div>
                ) : (
                    <button 
                        onClick={handleSubmit} 
                        className='mt-6 px-8 py-3 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1cc2e7]/50 transform hover:scale-105 transition-all duration-300'>
                        Add Skill
                    </button>
                )}
            </motion.div>

            {/* Skills Grid */}
            <section>
                <motion.div
                    variants={fadeIn('left', 0.2, 10)}
                    initial='hidden'
                    animate='show'
                    className='mb-6'>
                    <h2 className={`text-2xl md:text-3xl font-bold ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Your Skills ({skills.length})</h2>
                </motion.div>
                
                {skills.length === 0 ? (
                    <motion.div
                        variants={fadeIn('up', 0.4)}
                        initial='hidden'
                        animate='show'
                        className={`${mode === 'dark' ? 'bg-[#131c31]' : 'bg-white'} rounded-2xl shadow-lg p-12 text-center border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                        <div className='text-6xl mb-4'>📚</div>
                        <p className='text-[#94a9c9] text-lg'>No skills added yet. Add your first skill above!</p>
                    </motion.div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {skills.map((skill, index) => (
                            <motion.div
                                variants={fadeIn('up', 0.1 * index, 10)}
                                initial='hidden'
                                animate='show'
                                key={index} 
                                className={`group ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824] hover:from-[#1cc2e7]/10 hover:to-[#0f1824]' : 'bg-white hover:bg-[#f5f7fb]'} rounded-2xl shadow-lg hover:shadow-2xl p-6 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} hover:border-[#1cc2e7]/50 transition-all duration-300 transform hover:scale-105`}>
                                <div className='flex flex-col items-center text-center space-y-4'>
                                    <div className={`w-20 h-20 rounded-2xl ${mode === 'dark' ? 'bg-[#0a0e1a]' : 'bg-[#f5f7fb]'} p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <img src={skill.image} alt={skill.name} className='w-full h-full object-contain' />
                                    </div>
                                    <h3 className={`font-bold text-lg ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>{skill.name}</h3>
                                    <button 
                                        onClick={() => handleSkillDelete(skill._id)} 
                                        className='w-full py-2 px-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 hover:border-red-500 rounded-xl font-medium transition-all duration-300'>
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

export default ManageSkill
