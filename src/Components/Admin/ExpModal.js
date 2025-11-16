import React, { useState, useContext, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from 'framer-motion';
import ThemeContext from '../../Context/ThemeContext.js'
import { BASE_URL } from '../../helper.js';
import AlertContext from '../../Context/AlertContext.js';

const ExpModal = (props) => {
    const { exps, setExps, setIsOpen, selectedExp, isOpen } = props
    const { mode } = useContext(ThemeContext)
    const {showAlert}=useContext(AlertContext)
    const [updateExp, setUpdateExp] = useState({ duration:'',title:'',company:'',techstack:'',link:'',doc:'',id:'' })

    useEffect(() => {
        setUpdateExp({ duration: selectedExp.duration, title: selectedExp.title, company: selectedExp.company, techstack: selectedExp.techstack, link: selectedExp.link,doc: selectedExp.doc})
        // Disable scroll when modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
        // eslint-disable-next-line
    }, [isOpen]
    )
    const handleOnChange = (e) => {
        setUpdateExp({ ...updateExp, [e.target.name]: e.target.value })
    }
    const handleUpdate = async () => {
        const response = await fetch(`${BASE_URL}/api/exp/updateexp/${selectedExp.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
             },
            body: JSON.stringify(updateExp)

        })
        const json = await response.json()
        if (json.success) {
            setExps(exps.filter(exp => exp._id !== selectedExp.id))
            setExps([...exps, json.updatedData])
            showAlert('success',"Experience Updated Successfully")

            setIsOpen(false)
        }
    }
    return (
        <AnimatePresence>
            {isOpen && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, duration: 0.4 }}
                className='flex justify-center items-center fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-[#131c316f] p-4 overflow-y-auto'
                style={{zIndex: 9999999}}>
                <motion.div
                    initial={{ scale: 0, y: -50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, transition: { duration: .3 } }}
                    className={`w-full max-w-2xl my-8 ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} relative border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-2xl shadow-2xl`}>
                    <div className={`sticky top-0 z-10 ${mode === 'dark' ? 'bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3]' : 'bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3]'} px-6 py-4 flex items-center justify-between rounded-t-2xl`}>
                        <h2 className='text-xl md:text-2xl font-bold text-white'>Update Experience</h2>
                        <button onClick={() => setIsOpen(false)} className='text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300'>
                            <RxCross2 size={24} />
                        </button>
                    </div>
                    <div className='p-6 max-h-[70vh] overflow-y-auto'>
                        <div className='space-y-6'>
                            <div className='grid md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Duration</label>
                                    <input type="text" name='duration' value={updateExp.duration} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='e.g., Jan 2022 - Present' />
                                </div>
                                <div className='space-y-2'>
                                    <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Job Title</label>
                                    <input type="text" name='title' value={updateExp.title} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='e.g., Senior Developer' />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Company</label>
                                <input type="text" name='company' value={updateExp.company} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='Company name' />
                            </div>

                            <div className='space-y-2'>
                                <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Tech Stack</label>
                                <input type="text" name='techstack' value={updateExp.techstack} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='Technologies used' />
                            </div>

                            <div className='grid md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Company Link</label>
                                    <input type="text" name='link' value={updateExp.link} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='Company website URL' />
                                </div>
                                <div className='space-y-2'>
                                    <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Document Link</label>
                                    <input type="text" name='doc' value={updateExp.doc} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='Certificate or doc URL' />
                                </div>
                            </div>
                        </div>

                        <div className={`sticky bottom-0 ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} pt-6 mt-6 border-t ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} flex gap-4`}>
                            <button onClick={() => setIsOpen(false)} className={`flex-1 py-3 px-6 ${mode === 'dark' ? 'bg-[#222f43] hover:bg-[#2a3750]' : 'bg-[#e8edf5] hover:bg-[#d4dce8]'} ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'} font-semibold rounded-xl transition-all duration-300`}>
                                Cancel
                            </button>
                            <button onClick={() => handleUpdate()} className='flex-1 py-3 px-6 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1cc2e7]/50 transform hover:scale-105 transition-all duration-300'>
                                Update Experience
                            </button>
                        </div>
                    </div>

                </motion.div>
            </motion.div>}
        </AnimatePresence>
    )
}

export default ExpModal
