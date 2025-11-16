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
                "auth-token": localStorage.getItem('token')
            }
        })

        const res = await response.json()
        if (res.success) {
            showAlert('success',res.message)
            setProjects(projects.filter(project => project._id !== id))
        }
    }
    return (
        <section>
            <motion.div
                variants={fadeIn('left', 0.2, 10)}
                initial='hidden'
                animate='show'
                className='mb-6'>
                <h2 className={`text-2xl md:text-3xl font-bold ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Your Projects ({projects.length})</h2>
            </motion.div>
            
            {projects.length === 0 ? (
                <motion.div
                    variants={fadeIn('up', 0.4)}
                    initial='hidden'
                    animate='show'
                    className={`${mode === 'dark' ? 'bg-[#131c31]' : 'bg-white'} rounded-2xl shadow-lg p-12 text-center border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                    <div className='text-6xl mb-4'>💼</div>
                    <p className='text-[#94a9c9] text-lg'>No projects added yet. Add your first project above!</p>
                </motion.div>
            ) : (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {projects.map((project, index) => (
                        <motion.div
                            variants={fadeIn('up', 0.1 * index, 10)}
                            initial='hidden'
                            animate='show'
                            key={index} 
                            className={`group ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} hover:border-[#1cc2e7]/50 transition-all duration-300`}>
                            <div className='relative overflow-hidden h-48'>
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-[#131c31] to-transparent opacity-60'></div>
                            </div>
                            <div className='p-6'>
                                <h3 className={`text-xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>{project.title}</h3>
                                <p className='text-[#94a9c9] text-sm mb-4 line-clamp-2'>{project.desc}</p>
                                
                                <div className='mb-4'>
                                    <span className={`text-xs font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} mb-2 block`}>Technologies:</span>
                                    <p className='text-[#94a9c9] text-sm'>{project.tools}</p>
                                </div>
                                
                                <div className='flex flex-wrap gap-2 mb-4'>
                                    {project.links.github && (
                                        <a 
                                            href={project.links.github} 
                                            target='_blank' 
                                            rel='noopener noreferrer'
                                            className='px-3 py-1 bg-[#1cc2e7]/10 hover:bg-[#1cc2e7]/20 text-[#1cc2e7] text-xs font-medium rounded-lg transition-all duration-300 flex items-center gap-1'>
                                            <span>GitHub</span>
                                        </a>
                                    )}
                                    {project.links.live && (
                                        <a 
                                            href={project.links.live} 
                                            target='_blank' 
                                            rel='noopener noreferrer'
                                            className='px-3 py-1 bg-green-500/10 hover:bg-green-500/20 text-green-500 text-xs font-medium rounded-lg transition-all duration-300 flex items-center gap-1'>
                                            <span>Live Demo</span>
                                        </a>
                                    )}
                                </div>
                                
                                <button 
                                    onClick={() => handleProjectDelete(project._id)} 
                                    className='w-full py-2 px-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 hover:border-red-500 rounded-xl font-medium transition-all duration-300'>
                                    Delete Project
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default ProjectDetails
