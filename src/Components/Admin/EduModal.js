import React, { useState, useContext, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from 'framer-motion';
import ThemeContext from '../../Context/ThemeContext.js'
import { BASE_URL } from '../../helper.js';
import AlertContext from '../../Context/AlertContext.js';

const EduModal = (props) => {
    const { edus, setEdus, setIsOpen, selectedEdu, isOpen } = props
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)
    const [updateEdu, setUpdateEdu] = useState({year: '', clg: '', edu: '', sts: '', link: '',id:''})

    useEffect(() => {
        setUpdateEdu({ year: selectedEdu.year, clg: selectedEdu.clg, edu: selectedEdu.edu, sts: selectedEdu.sts, link: selectedEdu.link})
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
        setUpdateEdu({ ...updateEdu, [e.target.name]: e.target.value })
    }
    const handleUpdate = async () => {
        const response = await fetch(`${BASE_URL}/api/edu/updateedu/${selectedEdu.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(updateEdu)

        })
        const json = await response.json()
        if (json.success) {
            setEdus(edus.filter(edu => edu._id !== selectedEdu.id))
            setEdus([...edus, json.updatedData])
            showAlert('success',"Education Updated Successfully")

        }
        setIsOpen(false)
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
                    <div className={`sticky top-0 z-10 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] px-6 py-4 flex items-center justify-between rounded-t-2xl`}>
                        <h2 className='text-xl md:text-2xl font-bold text-white'>Update Education</h2>
                        <button onClick={() => setIsOpen(false)} className='text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300'>
                            <RxCross2 size={24} />
                        </button>
                    </div>
                    <div className='p-6 max-h-[70vh] overflow-y-auto'>
                        <div className='space-y-6'>
                            <div className='grid md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Year</label>
                                    <input type="text" name='year' value={updateEdu.year} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='e.g., 2018-2022' />
                                </div>
                                <div className='space-y-2'>
                                    <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Status</label>
                                    <input type="text" name='sts' value={updateEdu.sts} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='e.g., Completed' />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>College/University</label>
                                <input type="text" name='clg' value={updateEdu.clg} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='Institution name' />
                            </div>

                            <div className='space-y-2'>
                                <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Degree/Education</label>
                                <input type="text" name='edu' value={updateEdu.edu} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='Degree or course name' />
                            </div>

                            <div className='space-y-2'>
                                <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Link</label>
                                <input type="text" name='link' value={updateEdu.link} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='Institution website or certificate URL' />
                            </div>
                        </div>

                        <div className={`sticky bottom-0 ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} pt-6 mt-6 border-t ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} flex gap-4`}>
                            <button onClick={() => setIsOpen(false)} className={`flex-1 py-3 px-6 ${mode === 'dark' ? 'bg-[#222f43] hover:bg-[#2a3750]' : 'bg-[#e8edf5] hover:bg-[#d4dce8]'} ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'} font-semibold rounded-xl transition-all duration-300`}>
                                Cancel
                            </button>
                            <button onClick={() => handleUpdate()} className='flex-1 py-3 px-6 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1cc2e7]/50 transform hover:scale-105 transition-all duration-300'>
                                Update Education
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>}
        </AnimatePresence>
    )
}

export default EduModal
