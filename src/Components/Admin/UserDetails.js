import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../../Variants'
import '../../Styles/Common.css'
import ThemeContext from '../../Context/ThemeContext'
import { BASE_URL } from '../../helper'
import AlertContext from '../../Context/AlertContext'
import Loader from '../Loader.js'
import UserDetailsModal from './UserDetailModal.js'
const UserDetails = (props) => {
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)
    const [loading, setLoading] = useState(false)
    const { isOpen, setIsOpen, userDetails, setUserDetails } = props
    const[selectedData,setSelectedData]=useState({ name: '', profone: '', proftwo: '', profthree: '', proffour: '',currentsts:'' })
    
    const handleDetailsDelete = async (id) => {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/api/user/deleteuserdetails/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })

        const res = await response.json()
        if (res.success) {
            setLoading(false)
            showAlert('success', res.message)
            setUserDetails(userDetails.filter(details => details._id !== id))

        }
    }
    const UpdateDetails = async (name, profone, proftwo, profthree,proffour, currentsts,id) => {
        setIsOpen(true)
        setSelectedData({ name, profone, proftwo, profthree, proffour,currentsts,id })
    }

    return (
        <>
            <UserDetailsModal userDetails={userDetails} setUserDetails={setUserDetails} selectedData={selectedData} setSelectedData={setSelectedData} isOpen={isOpen} setIsOpen={setIsOpen} />

            <section className='max-w-6xl mx-auto mt-12'>
                <motion.div
                    variants={fadeIn('down', 0.2)}
                    initial='hidden'
                    animate='show'
                    className='mb-6'>
                    <h2 className={`text-2xl md:text-3xl font-bold ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>Profile Details</h2>
                    <p className='text-[#94a9c9] text-sm mt-1'>Your current profile information</p>
                </motion.div>
                {userDetails.length === 0 ? (
                    <motion.div
                        variants={fadeIn('up', 0.4)}
                        initial='hidden'
                        animate='show'
                        className={`${mode === 'dark' ? 'bg-[#131c31]' : 'bg-white'} rounded-2xl shadow-lg p-12 text-center border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                        <div className='text-6xl mb-4'>👤</div>
                        <p className='text-[#94a9c9] text-lg'>No profile details added yet</p>
                        <p className='text-[#94a9c9]/70 text-sm mt-2'>Add your details using the form above</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={fadeIn('up', 0.4)}
                        initial='hidden'
                        animate='show'
                        className={`${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-2xl shadow-xl border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} overflow-hidden`}>
                        
                        <div className='grid md:grid-cols-3 gap-8 p-6 md:p-8'>
                            {/* Profile Image Section */}
                            <div className='md:col-span-1 flex justify-center items-start'>
                                <div className='relative group'>
                                    <div className='absolute inset-0 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300'></div>
                                    <img 
                                        src={userDetails[0].userimage} 
                                        className='relative w-full max-w-[280px] h-[320px] object-cover rounded-2xl border-4 border-[#1cc2e7]/30 shadow-xl' 
                                        alt="profile" 
                                    />
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className='md:col-span-2 space-y-6'>
                                <div className='grid md:grid-cols-2 gap-6'>
                                    <div className={`${mode === 'dark' ? 'bg-[#0a0e1a]' : 'bg-[#f5f7fb]'} p-5 rounded-xl border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                                        <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} mb-2 block`}>Full Name</label>
                                        <p className='text-[#94a9c9] text-lg font-medium'>{userDetails[0].name}</p>
                                    </div>

                                    <div className={`${mode === 'dark' ? 'bg-[#0a0e1a]' : 'bg-[#f5f7fb]'} p-5 rounded-xl border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                                        <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} mb-2 block`}>Current Status</label>
                                        <p className='text-[#94a9c9] text-lg font-medium'>{userDetails[0].currentsts}</p>
                                    </div>
                                </div>

                                <div className={`${mode === 'dark' ? 'bg-[#0a0e1a]' : 'bg-[#f5f7fb]'} p-5 rounded-xl border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                                    <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'} mb-3 flex items-center`}>
                                        <span className='w-1 h-5 bg-gradient-to-b from-[#1cc2e7] to-[#0bccd3] rounded-full mr-2'></span>
                                        Professions
                                    </label>
                                    <div className='grid md:grid-cols-2 gap-4'>
                                        <div className='flex items-center gap-2'>
                                            <span className='bg-[#1cc2e7]/20 text-[#1cc2e7] text-xs font-bold px-2 py-1 rounded'>1</span>
                                            <p className='text-[#94a9c9]'>{userDetails[0].prof['1st']}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span className='bg-[#1cc2e7]/20 text-[#1cc2e7] text-xs font-bold px-2 py-1 rounded'>2</span>
                                            <p className='text-[#94a9c9]'>{userDetails[0].prof['2nd']}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span className='bg-[#1cc2e7]/20 text-[#1cc2e7] text-xs font-bold px-2 py-1 rounded'>3</span>
                                            <p className='text-[#94a9c9]'>{userDetails[0].prof['3rd']}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span className='bg-[#1cc2e7]/20 text-[#1cc2e7] text-xs font-bold px-2 py-1 rounded'>4</span>
                                            <p className='text-[#94a9c9]'>{userDetails[0].prof['4th']}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex gap-4 pt-4'>
                                    <button 
                                        onClick={() => UpdateDetails(userDetails[0].name, userDetails[0].prof['1st'], userDetails[0].prof['2nd'], userDetails[0].prof['3rd'], userDetails[0].prof['4th'], userDetails[0].currentsts, userDetails[0]._id)} 
                                        className='flex-1 py-3 px-6 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1cc2e7]/50 transform hover:scale-105 transition-all duration-300'>
                                        Update Details
                                    </button>
                                    <button 
                                        onClick={() => handleDetailsDelete(userDetails[0]._id)} 
                                        className='flex-1 py-3 px-6 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 hover:border-red-500 rounded-xl font-semibold transition-all duration-300'>
                                        Delete Details
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {loading && <Loader loading={loading} />
                        }

                    </motion.div>)
                }
            </section>
        </>
    )
}

export default UserDetails
