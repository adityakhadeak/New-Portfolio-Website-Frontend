import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import PulseLoader from "react-spinners/PulseLoader";
import '../Styles/Common.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import ProjectDetails from '../Components/Admin/ProjectDetails'
import { BASE_URL } from '../helper'
import AlertContext from '../Context/AlertContext'
import { useNavigate } from 'react-router-dom'
const ManageProject = () => {
    const navigate=useNavigate()
    const { mode } = useContext(ThemeContext)
    const [loading, setLoading] = useState(false)
    const { showAlert } = useContext(AlertContext)
    const [projectData, setProjectData] = useState({ title: '', desc: '', tools: '', github: '', live: '' })
    const [image, setImage] = useState(null)
    const [projects, setProjects] = useState([])
    document.title="Aditya's Portfolio | Manage Projects"
    const handleOnChange = (name, value) => {
        const data = { ...projectData, [name]: value }
        setProjectData(data)
    }

    const handleImgOnChange = (file) => {
        setImage(file)
    }
    
    const token=localStorage.getItem('token')
    useEffect(() => {
        if ( token== null) {
            navigate("/login")
        }
        else{
            fetchAllProjects()
        }
        // eslint-disable-next-line
    }, [])

    const fetchAllProjects = async () => {
        const response = await fetch(`${BASE_URL}/api/project/fetchprojects`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const res = await response.json()
        if (res.success) {
            let projs=res.data
            setProjects(projs.reverse())
        }
    }
    const handleSubmit = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append('title', projectData.title)
        formData.append('desc', projectData.desc)
        formData.append('tools', projectData.tools)
        formData.append('github', projectData.github)
        formData.append('live', projectData.live)
        formData.append('image', image)
        const response = await fetch(`${BASE_URL}/api/project/addproject`, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem('token')},
            body: formData
        });
        const res = await response.json()
        console.log(res)
        if(res.success)
        {
        showAlert('success',res.message)
        setProjectData({ title: '', desc: '', tools: '', github: '', live: '' })
        setImage(null)
        setProjects([...projects,...res.data])
        setLoading(false)
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
                    <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Projects Management</h1>
                    <p className='text-[#94a9c9] text-sm'>Add and manage your portfolio projects</p>
                </div>
            </motion.div>

            {/* Add Project Card */}
            <motion.div
                variants={fadeIn('up', 0.3, 10)}
                initial='hidden'
                animate='show'
                className={`max-w-4xl mx-auto ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                <h2 className={`text-xl md:text-2xl font-bold mb-6 flex items-center ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>
                    <span className='w-1 h-8 bg-gradient-to-b from-[#1cc2e7] to-[#0bccd3] rounded-full mr-3'></span>
                    Add New Project
                </h2>
                <form className='grid md:grid-cols-2 gap-6' method='post' encType='multipart/form-data'>
                    <div className='flex flex-col'>
                        <label htmlFor='title' className={`mb-2 font-medium ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Project Title</label>
                        <input 
                            type="text" 
                            name='title' 
                            value={projectData.title} 
                            onChange={(e) => handleOnChange(e.target.name, e.target.value)} 
                            className={`${mode === 'dark' ? 'bg-[#0a0e1a] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-[#f5f7fb] border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                            placeholder='Project name' 
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='tools' className={`mb-2 font-medium ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Technologies Used</label>
                        <input 
                            type="text" 
                            name='tools' 
                            value={projectData.tools} 
                            onChange={(e) => handleOnChange(e.target.name, e.target.value)} 
                            className={`${mode === 'dark' ? 'bg-[#0a0e1a] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-[#f5f7fb] border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                            placeholder='React, Node.js, MongoDB' 
                        />
                    </div>
                    <div className='flex flex-col md:col-span-2'>
                        <label htmlFor='desc' className={`mb-2 font-medium ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Description</label>
                        <textarea 
                            name='desc' 
                            value={projectData.desc} 
                            onChange={(e) => handleOnChange(e.target.name, e.target.value)} 
                            rows="3"
                            className={`${mode === 'dark' ? 'bg-[#0a0e1a] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-[#f5f7fb] border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20 resize-none`} 
                            placeholder='Brief description of your project' 
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='github' className={`mb-2 font-medium ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>GitHub Link</label>
                        <input 
                            type="text" 
                            name='github' 
                            value={projectData.github} 
                            onChange={(e) => handleOnChange(e.target.name, e.target.value)} 
                            className={`${mode === 'dark' ? 'bg-[#0a0e1a] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-[#f5f7fb] border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                            placeholder='https://github.com/...' 
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='live' className={`mb-2 font-medium ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Live Demo Link</label>
                        <input 
                            type="text" 
                            name='live' 
                            value={projectData.live} 
                            onChange={(e) => handleOnChange(e.target.name, e.target.value)} 
                            className={`${mode === 'dark' ? 'bg-[#0a0e1a] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-[#f5f7fb] border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                            placeholder='https://...' 
                        />
                    </div>
                    <div className='flex flex-col md:col-span-2'>
                        <label htmlFor='image' className={`mb-2 font-medium ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Project Image</label>
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
                        Add Project
                    </button>
                )}
            </motion.div>

            <ProjectDetails projects={projects} setProjects={setProjects} />
        </div>
    )
}

export default ManageProject
