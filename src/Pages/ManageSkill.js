import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import '../Styles/Common.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import { BASE_URL } from '../helper'
import AlertContext from '../Context/AlertContext'
import { useNavigate } from 'react-router-dom'
const ManageSkill = () => {
    const navigate=useNavigate()
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)

    const [skill, setSkill] = useState('')
    const [image, setImage] = useState(null)
    const [skills, setSkills] = useState([])

    const handleSkillOnChange = (value) => {
        setSkill(value)
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
            fetchAllSkills()
        }
        // eslint-disable-next-line
    }, [])

    const fetchAllSkills = async () => {
        const response = await fetch(`${BASE_URL}/api/skill/fetchskills`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            }
        })
        const res = await response.json()
        if (res.success) {
            setSkills(res.data)
        }
    }
    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('name', skill)
        formData.append('image', image)
        console.log(image)
        const response = await fetch(`${BASE_URL}/api/skill/addskills`, {
            method: "POST",
            headers: {
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            },
            body: formData
        });
        const res = await response.json()

        if (res.success) {
            showAlert('success', res.message)
            setSkill(' ')
            setImage(null)
            setSkills([...skills, ...res.data])
        }

    }
    const handleSkillDelete = async (id) => {
        const response = await fetch(`${BASE_URL}/api/skill/deleteskill/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            }
        })

        const res = await response.json()
        if (res.success) {
            alert(res.message)
            setSkills(skills.filter(skill => skill._id !== id))
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
                <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>Add Your Skills</h2>
            </motion.div>
            <div className='my-6 py-4 px-2 flex justify-center flex-col items-center'>
                <form className='flex flex-col justify-center items-center text-[#94a9c9] w-[100%] rounded-lg py-12 px-10 border border-[#222f43]' method='post' encType='multipart/form-data'>

                    <div className='flex justify-start flex-col my-3'>
                        <div className='flex justify-start flex-col my-3 '>
                            <label htmlFor={`skill`} className='my-1'>Skill</label>
                            <input type="text" name='skill' value={skill} onChange={(e) => handleSkillOnChange(e.target.value)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                        </div>
                        <div className='flex justify-start flex-col'>
                            <label htmlFor={`image`} className='my-1'>Image</label>
                            <input type="file" accept='image/*' name='image' onChange={(e) => handleImgOnChange(e.target.files[0])} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3   md:w-[330px]`} placeholder='Enter skill name' />
                        </div>

                    </div>
                </form>
                <div className='flex text-[#94a9c9]'>
                    <div className='m-5'>
                        <button onClick={handleSubmit} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Submit</button>
                    </div>
                </div>
            </div>
            <section className='flex flex-col justify-center items-center'>
                <motion.div
                    variants={fadeIn('left', 0.2, 10)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    className=' mx-8 flex items-center justify-center text-[25px] md:text-[30px] font-[Montserrat] my-4 py-2 font-semibold'>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' ></span>
                    <h2 className='text-[#94a9c9] w-[-webkit-fill-available] text-center md:w-fit mx-2'>Added Skills </h2>
                </motion.div>
                {skills.length === 0 ? (
                    <motion.div
                        variants={fadeIn('left', `0.4`)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.7 }}
                        className='flex justify-center items-center'>
                        <p className='text-[#94a9c9] w-[-webkit-fill-available] text-center md:w-fit mx-auto'>
                            No skills to display
                        </p>
                    </motion.div>
                ) : (
                    <div className='my-5 grid md:grid-cols-2 grid-cols-1 gap-3'>
                        {
                            skills.map((skill, index) => (
                                <motion.div
                                    variants={fadeIn('left', `0.4${index}`, 10)}
                                    initial='hidden'
                                    whileInView={'show'}
                                    viewport={{ once: true, amount: 0.7 }}
                                    key={index} className={` ${mode === 'dark' ? 'hover-neon' : 'hover-neon-light'} flex px-4 py-2 ${mode === 'dark' ? 'bg-[#131c31]' : 'bg-[#e8edf5]'}  text-center flex-col border md:text-lg text-sm rounded-lg md:w-[400px] min-w-min border-solid  ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} items-center md:gap-3 gap-2`}>
                                    <h1>{`Skill-${index + 1}`}</h1>
                                    <img src={skill.image} alt="logo" className='w-[40px] p-1 md:w-[90px]' />
                                    <h1 className={` ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#94a9c9] '} w-1/2 font-bold font-mono`}>{skill.name}</h1>
                                    <button onClick={() => handleSkillDelete(skill._id)} className={`p-2 w-[90px] my-5 text-base mx-2  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Delete</button>
                                </motion.div>
                            ))
                        }
                    </div>)
                }
            </section>
        </div>
    )
}

export default ManageSkill
