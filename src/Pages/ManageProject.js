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
        <div>
            <motion.div
                variants={fadeIn('left', 0.2, 10)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.7 }}
                className=' mx-8 flex items-center justify-center text-[25px] md:text-[30px] font-[Montserrat] my-4 py-2 font-semibold'>
                <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' ></span>
                <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>Add Details About Projects</h2>
            </motion.div>
            <div className='my-6 py-4 px-2 flex justify-center flex-col items-center'>
                <form className='flex flex-col justify-center items-center text-[#94a9c9] w-[100%] rounded-lg py-12 px-10 border border-[#222f43]' method='post' encType='multipart/form-data'>

                    <div className='flex justify-start flex-col my-3'>
                        <div className='flex justify-start flex-col my-3 '>
                            <label htmlFor={`skill`} className='my-1'>Title</label>
                            <input type="text" name='title' value={projectData.title} onChange={(e) => handleOnChange(e.target.name, e.target.value)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                        </div>
                        <div className='flex justify-start flex-col my-3 '>
                            <label htmlFor={`skill`} className='my-1'>Desc</label>
                            <input type="text" name='desc' value={projectData.desc} onChange={(e) => handleOnChange(e.target.name, e.target.value)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                        </div>
                        <div className='flex justify-start flex-col my-3 '>
                            <label htmlFor={`skill`} className='my-1'>Tools</label>
                            <input type="text" name='tools' value={projectData.tools} onChange={(e) => handleOnChange(e.target.name, e.target.value)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                        </div>
                        <div className='flex justify-start flex-col my-3 '>
                            <label htmlFor={`skill`} className='my-1'>GitHub Link</label>
                            <input type="text" name='github' value={projectData.github} onChange={(e) => handleOnChange(e.target.name, e.target.value)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                        </div>
                        <div className='flex justify-start flex-col my-3 '>
                            <label htmlFor={`skill`} className='my-1'>Live Link</label>
                            <input type="text" name='live' value={projectData.live} onChange={(e) => handleOnChange(e.target.name, e.target.value)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                        </div>
                        <div className='flex justify-start flex-col'>
                            <label htmlFor={`image`} className='my-1'>Image</label>
                            <input type="file" accept='image/*' name='image' onChange={(e) => handleImgOnChange(e.target.files[0])} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3   md:w-[330px]`} placeholder='Enter skill name' />
                        </div>
                       
                    </div>
                </form>
                <div className='flex text-[#94a9c9]'>
                    <div className='m-5'>

                    {loading ? < PulseLoader
                            color={"#0bccd3"}
                            loading={loading}
                            speedMultiplier={1}
                            cssOverride={{ margin: "10px 0" }}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        /> :<button onClick={handleSubmit} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Submit</button>

                        }
                    
                    </div>
                </div>
            </div>
            <ProjectDetails projects={projects} setProjects={setProjects} />
        </div>
    )
}

export default ManageProject
