import React, { useContext, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import '../Styles/Common.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import ExpDetails from '../Components/Admin/ExpDetails'
import AlertContext from '../Context/AlertContext'
import { BASE_URL } from '../helper'
const ManageExp = () => {
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)
    document.title="Aditya's Portfolio | Manage Experience"
    const [expData, setexpData] = useState([{ duration:'',title:'',company:'',techstack:'',link:'',doc:'' }])
    const [exps, setExps] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const handleRemoveexp = (index) => {
        const value = [...expData]
        value.splice(index, 1)
        setexpData(value)
    }
    const handleOnChange = (index, e) => {
        const data = [...expData]
        data[index][e.target.name]=e.target.value
        setexpData(data)
    }

const handleAddexp=()=>{
    const data=[...expData,{ duration:'',title:'',company:'',techstack:'',link:'',doc:'' }]
    setexpData(data)
}

    const handleSubmit = async () => {

        const response = await fetch(`${BASE_URL}/api/exp/addexp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(expData) // body data type must match "Content-Type" header
        });
        const res = await response.json()
        if (res.success) {
            setExps([...exps,...res.data])
            setexpData([{ duration:'',title:'',company:'',techstack:'',link:'',doc:'' }])
            showAlert("success","Experience Details Added")
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
                    <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Experience Management</h1>
                    <p className='text-[#94a9c9] text-sm'>Add and manage your work experience and internships</p>
                </div>
            </motion.div>
            
            <motion.div
                variants={fadeIn('up', 0.3, 10)}
                initial='hidden'
                animate='show'
                className={`max-w-4xl mx-auto ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                <h2 className={`text-xl md:text-2xl font-bold mb-6 flex items-center ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>
                    <span className='w-1 h-8 bg-gradient-to-b from-[#1cc2e7] to-[#0bccd3] rounded-full mr-3'></span>
                    Add Experience Details
                </h2>
                <form className='space-y-6' method='post' encType='multipart/form-data'>
                    {expData.map((data, index) => (
                        <div key={index} className={`${mode === 'dark' ? 'bg-[#0a0e1a]' : 'bg-[#f5f7fb]'} p-6 rounded-xl border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} space-y-4`}>
                            <div className='flex justify-between items-center mb-4'>
                                <h3 className={`text-lg font-bold ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Experience #{index + 1}</h3>
                                {expData.length > 1 && (
                                    <button 
                                        type='button'
                                        onClick={(e) => {e.preventDefault(); handleRemoveexp(index)}}
                                        className='px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 hover:border-red-500 rounded-lg font-medium transition-all duration-300 text-sm'>
                                        Remove
                                    </button>
                                )}
                            </div>
                            <div className='grid md:grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor={`duration-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Duration <span className='text-xs text-[#94a9c9]'>(Jan 2023 - Dec 2023)</span></label>
                                    <input 
                                        type="text" 
                                        name='duration' 
                                        value={data.duration} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='Jan 2023 - Present' 
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`company-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Company Name</label>
                                    <input 
                                        type="text" 
                                        name='company' 
                                        value={data.company} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='Company name' 
                                    />
                                </div>
                                <div className='md:col-span-2'>
                                    <label htmlFor={`title-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Job Title/Role</label>
                                    <input 
                                        type="text" 
                                        name='title' 
                                        value={data.title} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='Software Engineer' 
                                    />
                                </div>
                                <div className='md:col-span-2'>
                                    <label htmlFor={`techstack-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Technologies Used</label>
                                    <input 
                                        type="text" 
                                        name='techstack' 
                                        value={data.techstack} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='React, Node.js, MongoDB' 
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`link-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Company Website</label>
                                    <input 
                                        type="text" 
                                        name='link' 
                                        value={data.link} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='https://company.com' 
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`doc-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Certificate Link</label>
                                    <input 
                                        type="text" 
                                        name='doc' 
                                        value={data.doc} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='Certificate URL' 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                </form>
                <div className='flex gap-4 mt-6'>
                    <button 
                        type='button'
                        onClick={(e) => {e.preventDefault(); handleAddexp()}} 
                        className='px-6 py-3 bg-[#1cc2e7]/10 hover:bg-[#1cc2e7]/20 text-[#1cc2e7] border border-[#1cc2e7]/30 font-semibold rounded-xl transition-all duration-300'>
                        + Add Another
                    </button>
                    <button 
                        type='button'
                        onClick={(e) => {e.preventDefault(); handleSubmit()}} 
                        className='px-8 py-3 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1cc2e7]/50 transform hover:scale-105 transition-all duration-300'>
                        Save Experience Details
                    </button>
                </div>
            </motion.div>
            <ExpDetails isOpen={isOpen}  setIsOpen={setIsOpen} exps={exps} setExps={setExps}/>
        </div>
    )
}

export default ManageExp
