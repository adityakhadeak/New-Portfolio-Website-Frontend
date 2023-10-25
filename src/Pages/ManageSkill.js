import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import '../Styles/Common.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import { BASE_URL } from '../helper'
const ManageSkill = () => {
    const { mode } = useContext(ThemeContext)
    const [skill, setSkill] = useState('')
    const [image, setImage] = useState(null)
    const [skills, setSkills] = useState([])

    
    const handleSkillOnChange = (value) => {
       setSkill(value)
    }

    const handleImgOnChange = ( file) => {
       setImage(file)
       setImage(file)
       console.log(image)
    }

    useEffect(() => {
      
    fetchAllSkills()
    console.log(skills)
      
    }, [])
    
    const fetchAllSkills=async()=>{
        const response=await fetch(`${BASE_URL}/api/skill/fetchskills`,{
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
    const handleSubmit = async() => {
        const formData = new FormData()
        formData.append('name',skill)
        formData.append('image',image)
        console.log(formData)

        const response = await fetch(`http://localhost:5000/api/skill/addskills`, {
            method: "POST",
            headers: {
              "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            },
            body: formData // body data type must match "Content-Type" header
          });
          const res=await response.json()
          setSkill('')
          setImage(null)
          if (res.success) {
            setSkill([...skills,...res.data])
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

        const json = await response.json()
        if (json.success) {
            setSkill(skills.filter(skill => skill._id !== id))
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
                    
                        <div  className='flex justify-start flex-col my-3'>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`skill`} className='my-1'>Skill</label>
                                <input type="text" name='skill' value={skill} onChange={(e) => handleSkillOnChange(e.target.value)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                            </div>
                            <div className='flex justify-start flex-col'>
                                <label htmlFor={`image`} className='my-1'>Image</label>
                                <input type="file" accept='image/*' name='image' onChange={(e) => handleImgOnChange( e.target.files[0])} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3   md:w-[330px]`} placeholder='Enter skill name' />
                            </div>
                            {/* <div className='m-5 flex justify-center items-center'>
                                <button  className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Remove</button>
                            </div> */}
                        </div>
                </form>
                <div className='flex text-[#94a9c9]'>
                    {/* <div className='m-5'>
                        <button onClick={handleAddSkill} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Add More </button>
                    </div> */}
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
                <div className='my-5 grid md:grid-cols-2 grid-cols-1 gap-3'>
                    {
                        skills.map((skill, index) => (
                            <motion.div
                                variants={fadeIn('left', `0.4${index}`, 10)}
                                initial='hidden'
                                whileInView={'show'}
                                viewport={{ once: true, amount: 0.7 }}
                                key={index} className=' w-[295px] md:w-[500px] bg-[#131c31] p-3 rounded-lg my-5 font-mono'>
                                <h3>Skill-{index + 1}</h3>
                                <p className='text-justify text-[#94a9c9] my-3 w-[fit]  leading-7  '>
                                    {skill.name}

                                </p>
                                <button onClick={() => handleSkillDelete(skill._id)} className={`p-2 w-[90px] text-base mx-2  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Delete</button>
                            </motion.div>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default ManageSkill
