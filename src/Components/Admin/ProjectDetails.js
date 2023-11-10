import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../../Variants'
import ThemeContext from '../../Context/ThemeContext'
import { BASE_URL } from '../../helper'
const ProjectDetails = (props) => {
    const { mode } = useContext(ThemeContext)
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
            alert(res.message)
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
                <div className=' items-con my-3 pt-7 flex  justify-center items-center md:flex-row flex-col flex-wrap text-white' >

                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn('right', 0.4, 10)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: true, amount: 0.7 }}
                            className=' item flex  flex-col justify-center items-center md:flex-row max-w-[800px] w-[100%] px-[20px] my-auto mb-[4rem] min-w-[100px]' >

                            <div className='left z-[1]    flex-1'>
                                <div className='pro-img overflow-hidden    rounded-xl  relative' >
                                    <img src={project.img} className='object-cover h-[13rem]' alt="project1" />
                                </div>
                            </div>

                            <div className={` right pro-info rounded-lg ${mode === 'dark' ? 'bg-[#131c31]' : 'bg-[#e8edf5]'}  z-[2] w-[300px] md:w-fit md:-ml-[125px] px-[3rem] py-3 right flex flex-col justify-items-center justify-center items-center flex-1`}>
                                <h1 className=' mb-3 text-xl text-[#94a9c9]  font-bold'>{project.title}</h1>
                                <p className='text-[#a3afbf] mb-3 text-sm'>{project.desc}</p>
                                <div className='font-mono mb-3 text-[#0dace4] flex'>
                                    <p className='mr-3 text-sm'>{project.tool['1st']}</p>
                                    <p className='mr-3 text-sm'>{project.tool['2nd']}</p>
                                    <p className='mr-3 text-sm'>{project.tool['3rd']}</p>
                                    <p className='text-sm'>{project.tool['4th']}</p>


                                </div>
                                <div className=' flex relative right-[10px] ' >
                                    <p>{project.links.github}</p>
                                    <p>{project.links.live}</p>
                                </div>
                            </div>

                            <div>
                                <button onClick={() => handleProjectDelete(project._id)} className={`p-2 w-[90px] my-5 text-base mx-2  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Delete</button>

                            </div>
                        </motion.div>

                    ))}

                </div>)
            }
        </section>
    )
}

export default ProjectDetails
