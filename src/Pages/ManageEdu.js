import React, { useContext, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import '../Styles/Common.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import EduDetails from '../Components/Admin/EduDetails'
import AlertContext from '../Context/AlertContext'
import { BASE_URL } from '../helper'
const ManageEdu = () => {
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)
    const [eduData, seteduData] = useState([{ year:'',clg:'',edu:'',sts:'',link:'' }])
    const [edus, setEdus] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    document.title="Aditya's Portfolio | Manage Education"
    const handleRemoveEdu = (index) => {
        const value = [...eduData]
        value.splice(index, 1)
        seteduData(value)
    }
    const handleOnChange = (index, e) => {
        const data = [...eduData]
        data[index][e.target.name]=e.target.value
        seteduData(data)
    }

const handleAddEdu=()=>{
    const data=[...eduData,{ year:'',clg:'',edu:'',sts:'',link:'' }]
    seteduData(data)
}

    const handleSubmit = async () => {
        const response = await fetch(`${BASE_URL}/api/edu/addedu`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
             },
             body: JSON.stringify(eduData) // body data type must match "Content-Type" header
        });
        const res = await response.json()
        console.log(res)
        if(res.success){
            setEdus([...edus,...res.data])
            seteduData([{ year:'',clg:'',edu:'',sts:'',link:'' }])
            showAlert('success',"Education Details Added")
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
                    <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Education Management</h1>
                    <p className='text-[#94a9c9] text-sm'>Add and manage your educational qualifications</p>
                </div>
            </motion.div>
            
            <motion.div
                variants={fadeIn('up', 0.3, 10)}
                initial='hidden'
                animate='show'
                className={`max-w-4xl mx-auto ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                <h2 className={`text-xl md:text-2xl font-bold mb-6 flex items-center ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>
                    <span className='w-1 h-8 bg-gradient-to-b from-[#1cc2e7] to-[#0bccd3] rounded-full mr-3'></span>
                    Add Education Details
                </h2>
                <form className='space-y-6' method='post' encType='multipart/form-data'>
                    {eduData.map((data, index) => (
                        <div key={index} className={`${mode === 'dark' ? 'bg-[#0a0e1a]' : 'bg-[#f5f7fb]'} p-6 rounded-xl border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} space-y-4`}>
                            <div className='flex justify-between items-center mb-4'>
                                <h3 className={`text-lg font-bold ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Education #{index + 1}</h3>
                                {eduData.length > 1 && (
                                    <button 
                                        type='button'
                                        onClick={(e) => {e.preventDefault(); handleRemoveEdu(index)}}
                                        className='px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 hover:border-red-500 rounded-lg font-medium transition-all duration-300 text-sm'>
                                        Remove
                                    </button>
                                )}
                            </div>
                            <div className='grid md:grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor={`year-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Year <span className='text-xs text-[#94a9c9]'>(2021-2025)</span></label>
                                    <input 
                                        type="text" 
                                        name='year' 
                                        value={data.year} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='2021-2025' 
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`sts-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Status</label>
                                    <input 
                                        type="text" 
                                        name='sts' 
                                        value={data.sts} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='Completed / Pursuing' 
                                    />
                                </div>
                                <div className='md:col-span-2'>
                                    <label htmlFor={`clg-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>College/School Name</label>
                                    <input 
                                        type="text" 
                                        name='clg' 
                                        value={data.clg} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='Enter institution name' 
                                    />
                                </div>
                                <div className='md:col-span-2'>
                                    <label htmlFor={`edu-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Degree/Qualification</label>
                                    <input 
                                        type="text" 
                                        name='edu' 
                                        value={data.edu} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='B.Tech in Computer Science' 
                                    />
                                </div>
                                <div className='md:col-span-2'>
                                    <label htmlFor={`link-${index}`} className={`mb-2 font-medium block ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} text-sm`}>Institution Website (Optional)</label>
                                    <input 
                                        type="text" 
                                        name='link' 
                                        value={data.link} 
                                        onChange={(e) => handleOnChange(index, e)} 
                                        className={`w-full ${mode === 'dark' ? 'bg-[#131c31] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-white border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20`} 
                                        placeholder='https://...' 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                </form>
                <div className='flex gap-4 mt-6'>
                    <button 
                        type='button'
                        onClick={(e) => {e.preventDefault(); handleAddEdu()}} 
                        className='px-6 py-3 bg-[#1cc2e7]/10 hover:bg-[#1cc2e7]/20 text-[#1cc2e7] border border-[#1cc2e7]/30 font-semibold rounded-xl transition-all duration-300'>
                        + Add Another
                    </button>
                    <button 
                        type='button'
                        onClick={(e) => {e.preventDefault(); handleSubmit()}} 
                        className='px-8 py-3 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1cc2e7]/50 transform hover:scale-105 transition-all duration-300'>
                        Save Education Details
                    </button>
                </div>
            </motion.div>
        <EduDetails isOpen={isOpen} setIsOpen={setIsOpen} edus={edus} setEdus={setEdus}/>
        </div>
    )
}

export default ManageEdu
