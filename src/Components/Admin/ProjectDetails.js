import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../../Variants'
import '../../Styles/Common.css'
import ThemeContext from '../../Context/ThemeContext'
import { BASE_URL } from '../../helper'
import AlertContext from '../../Context/AlertContext'

const ProjectDetails = (props) => {
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)

    const { projects, setProjects } = props

    const handleProjectDelete = async (id) => {
        const response = await fetch(`${BASE_URL}/api/project/deleteproject/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            }
        })

        const res = await response.json()
        if (res.success) {
            showAlert('success',res.message)
            setProjects(projects.filter(project => project._id !== id))
        }
    }
    return (
        <section className='flex flex-col justify-center items-center'>
            <motion.div
                variants={fadeIn('left', 0.2, 10)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.7 }}
                className=' mx-8 flex items-center justify-center text-[25px] md:text-[30px] font-[Montserrat] my-4 py-2 font-semibold'>
                <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' ></span>
                <h2 className='text-[#94a9c9] w-[-webkit-fill-available] text-center md:w-fit mx-2'>Added Projects </h2>
            </motion.div>
            {projects.length === 0 ? (
                <motion.div
                    variants={fadeIn('left', `0.4`)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    className='flex justify-center items-center'>
                    <p className='text-[#94a9c9] w-[-webkit-fill-available] text-center md:w-fit mx-auto'>
                        No projects to display
                    </p>
                </motion.div>
            ) : (
                <div className='my-5 grid md:grid-cols-2 grid-cols-1 gap-3'>
                    {
                        projects.map((project, index) => (
                            <motion.div
                                variants={fadeIn('left', `0.4${index}`, 10)}
                                initial='hidden'
                                whileInView={'show'}
                                viewport={{ once: true, amount: 0.7 }}
                                key={index} className=' w-[295px] md:w-[500px] bg-[#131c31] p-3 rounded-lg my-5 font-mono'>
                                <h3>Project-{index + 1}</h3>
                                <div>
                                    <img src={project.image} alt="project-pic" />
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <div className='my-1'>Title</div>
                                    <div>{project.title}</div>
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <div className='my-1'>Description</div>
                                    <div>{project.desc}</div>

                                </div>

                                <div className='flex justify-start flex-col my-3 '>
                                    <div className='my-1'>Tools</div>
                                    <div>{project.tools}</div>
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <div  className='my-1'>GitHub Link</div>
                                    <div>{project.links.github}</div>
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <div  className='my-1'>Live Link</div>
                                    <div>{project.links.live}</div>

                                </div>
                                
                                <button onClick={() => handleProjectDelete(project._id)} className={`p-2 w-[90px] text-base mx-2  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Delete</button>
                            </motion.div>
                        ))
                    }
                </div>)
            }
        </section>
    )
}

export default ProjectDetails
