import React, { useState, useContext, useEffect } from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from 'framer-motion';
import ThemeContext from '../../Context/ThemeContext.js'
import { BASE_URL } from '../../helper.js';
import AlertContext from '../../Context/AlertContext.js';

const CerModal = (props) => {
    const { cers, setCers, setIsOpen, selectedCer, isOpen } = props
    const { mode } = useContext(ThemeContext)
    const [loading, setLoading] = useState(false)
    const { showAlert } = useContext(AlertContext)
    const [updateCer, setUpdateCer] = useState({ title: '', desc: '', date: '', platform: '', label: '', doc: ''})

    useEffect(() => {
        setUpdateCer({ title: selectedCer.title, desc: selectedCer.desc, date: selectedCer.date, platform: selectedCer.platform, label: selectedCer.platform, doc: selectedCer.doc })
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
        setUpdateCer({ ...updateCer, [e.target.name]: e.target.value })
    }
    const handleUpdatePara = async () => {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/api/cer/updatecertificate/${selectedCer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
             },
            body: JSON.stringify(updateCer)

        })
        const json = await response.json()
        if (json.success) {
            setCers(cers.filter(para1 => para1._id !== selectedCer.id))
            setCers([...cers, json.updatedData])
            showAlert('success',"Certificate Updated Successfully")
            setLoading(false)
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
                    <div className={`sticky top-0 z-10 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] px-6 py-4 flex items-center justify-between rounded-t-2xl`}>
                        <h2 className='text-xl md:text-2xl font-bold text-white'>Update Certificate</h2>
                        <button onClick={() => setIsOpen(false)} className='text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300'>
                            <RxCross2 size={24} />
                        </button>
                    </div>
                    <div className='p-6 max-h-[70vh] overflow-y-auto'>
                        <div className='space-y-6'>
                            <div className='space-y-2'>
                                <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Title</label>
                                <input type="text" name='title' value={updateCer.title} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='Certificate title' />
                            </div>

                            <div className='space-y-2'>
                                <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Description</label>
                                <textarea name='desc' value={updateCer.desc} onChange={(e) => handleOnChange(e)} rows={3} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors resize-none`} placeholder='Brief description' />
                            </div>

                            <div className='grid md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Date <span className='text-xs text-[#94a9c9]'>(MM-DD-YYYY)</span></label>
                                    <input type="text" name='date' value={updateCer.date} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='10-08-2023' />
                                </div>
                                <div className='space-y-2'>
                                    <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Label/Type</label>
                                    <input type="text" name='label' value={updateCer.label} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='e.g., Course, Bootcamp' />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Platform</label>
                                <input type="text" name='platform' value={updateCer.platform} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='e.g., Coursera, Udemy, Kaggle' />
                            </div>

                            <div className='space-y-2'>
                                <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Document/Certificate Link</label>
                                <input type="text" name='doc' value={updateCer.doc} onChange={(e) => handleOnChange(e)} className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} placeholder='Certificate URL' />
                            </div>
                        </div>

                        <div className={`sticky bottom-0 ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} pt-6 mt-6 border-t ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} flex gap-4`}>
                            <button onClick={() => setIsOpen(false)} className={`flex-1 py-3 px-6 ${mode === 'dark' ? 'bg-[#222f43] hover:bg-[#2a3750]' : 'bg-[#e8edf5] hover:bg-[#d4dce8]'} ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'} font-semibold rounded-xl transition-all duration-300`}>
                                Cancel
                            </button>
                            {loading ? (
                                <div className='flex-1 flex items-center justify-center py-3 px-6 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white font-semibold rounded-xl'>
                                    <PulseLoader color="#ffffff" size={8} />
                                </div>
                            ) : (
                                <button onClick={() => handleUpdatePara()} className='flex-1 py-3 px-6 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1cc2e7]/50 transform hover:scale-105 transition-all duration-300'>
                                    Update Certificate
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>}
        </AnimatePresence>
    )
}

export default CerModal
