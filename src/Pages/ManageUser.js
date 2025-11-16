import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import PulseLoader from "react-spinners/PulseLoader";
import '../Styles/Common.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import { BASE_URL } from '../helper'
import AlertContext from '../Context/AlertContext'
import { useNavigate } from 'react-router-dom'
import UserDetails from '../Components/Admin/UserDetails';
const ManageUser = () => {
    const navigate=useNavigate()
    const { mode } = useContext(ThemeContext)
    const [loading, setLoading] = useState(false)
    const { showAlert } = useContext(AlertContext)
    const [userData, setUserData] = useState({ name: '', profone: '', proftwo: '', profthree: '', proffour: '',currentsts:'' })
    const [image, setImage] = useState(null)
    const [userDetails, setUserDetails] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    document.title="Aditya's Portfolio | Manage Admin Details"
    const handleOnChange = (name, value) => {
        const data = { ...userData, [name]: value }
        setUserData(data)
    }

    const handleImgOnChange = (file) => {
        setImage(file)
    }
    
    const token=localStorage.getItem('token')
    useEffect(() => {
        if ( token== null) {
            navigate("/login")
        }
        else{
            fetchUserDetails()
        }
        // eslint-disable-next-line
    }, [])
    const fetchUserDetails = async () => {
        const response = await fetch(`${BASE_URL}/api/user/fetchuserdetails`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const res = await response.json()
        if (res.success) {
            setUserDetails(res.data)
        }
    }
    const handleSubmit = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append('name', userData.name)
        formData.append('profone', userData.profone)
        formData.append('proftwo', userData.proftwo)
        formData.append('profthree', userData.profthree)
        formData.append('proffour', userData.proffour)
        formData.append('currentsts', userData.currentsts)
        formData.append('image', image)

        const response = await fetch(`${BASE_URL}/api/user/adduserdetails`, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem('token')},
            body: formData
        });
        const res = await response.json()
        if(res.success)
        {
        showAlert('success',res.message)
        setUserData({ name: '', profone: '', proftwo: '', profthree: '', proffour: '',currentsts:'' })
        setImage(null)
        setUserDetails([...userDetails,...res.data])
        setLoading(false)
        }
        
    }
    return (
        <div className={`min-h-screen ${mode === 'dark' ? 'bg-[#0a0f1e]' : 'bg-[#e8edf5]'} md:ml-[75px] px-4 md:px-8 py-8`}>
            <motion.div
                variants={fadeIn('down', 0.2)}
                initial='hidden'
                animate='show'
                className='mb-8'>
                <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>
                    Manage User Details
                </h1>
                <p className='text-[#94a9c9] text-sm md:text-base'>Update your profile information and professions</p>
            </motion.div>
            <motion.div
                variants={fadeIn('up', 0.3)}
                initial='hidden'
                animate='show'
                className={`max-w-4xl mx-auto ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                <form method='post' encType='multipart/form-data' className='space-y-6'>
                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className='space-y-2'>
                            <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Full Name</label>
                            <input 
                                type="text" 
                                name='name' 
                                value={userData.name} 
                                onChange={(e) => handleOnChange(e.target.name, e.target.value)} 
                                className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} 
                                placeholder='Enter your full name' 
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Primary Profession</label>
                            <input 
                                type="text" 
                                name='profone' 
                                value={userData.profone} 
                                onChange={(e) => handleOnChange(e.target.name, e.target.value)} 
                                className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} 
                                placeholder='e.g., Full Stack Developer' 
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Secondary Profession</label>
                            <input 
                                type="text" 
                                name='proftwo' 
                                value={userData.proftwo} 
                                onChange={(e) => handleOnChange(e.target.name, e.target.value)} 
                                className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} 
                                placeholder='e.g., UI/UX Designer' 
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Tertiary Profession</label>
                            <input 
                                type="text" 
                                name='profthree' 
                                value={userData.profthree} 
                                onChange={(e) => handleOnChange(e.target.name, e.target.value)} 
                                className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} 
                                placeholder='e.g., Content Creator' 
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Quaternary Profession</label>
                            <input 
                                type="text" 
                                name='proffour' 
                                value={userData.proffour} 
                                onChange={(e) => handleOnChange(e.target.name, e.target.value)} 
                                className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} 
                                placeholder='e.g., Tech Blogger' 
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Current Status</label>
                            <input 
                                type="text" 
                                name='currentsts' 
                                value={userData.currentsts} 
                                onChange={(e) => handleOnChange(e.target.name, e.target.value)} 
                                className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f5f8fc] text-[#131c31]'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#1cc2e7] transition-colors`} 
                                placeholder='e.g., Available for work' 
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label className={`text-sm font-semibold ${mode === 'dark' ? 'text-[#b9e0f2]' : 'text-[#131c31]'}`}>Profile Picture</label>
                        <input 
                            type="file" 
                            accept='image/*' 
                            name='image' 
                            onChange={(e) => handleImgOnChange(e.target.files[0])} 
                            className={`w-full ${mode === 'dark' ? 'bg-[#0a0f1e] text-white file:bg-[#1cc2e7] file:text-white' : 'bg-[#f5f8fc] text-[#131c31] file:bg-[#1cc2e7] file:text-white'} border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-lg px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold hover:file:bg-[#0bccd3] transition-colors`} 
                        />
                        <p className='text-xs text-[#94a9c9] mt-1'>Recommended: Square image, min 400x400px</p>
                    </div>

                    <div className='flex justify-end pt-4'>
                        {loading ? (
                            <div className='flex items-center gap-2 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white px-6 py-3 rounded-xl'>
                                <PulseLoader color="#ffffff" size={8} />
                            </div>
                        ) : (
                            <button 
                                type='button'
                                onClick={handleSubmit} 
                                disabled={userDetails.length >= 1}
                                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${userDetails.length >= 1 ? 'bg-[#94a9c9]/20 text-[#94a9c9] cursor-not-allowed' : 'bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white hover:shadow-lg hover:scale-105'}`}>
                                {userDetails.length >= 1 ? 'Details Already Added' : 'Save User Details'}
                            </button>
                        )}
                    </div>
                </form>
            </motion.div>
            <UserDetails isOpen={isOpen}  setIsOpen={setIsOpen} userDetails={userDetails} setUserDetails={setUserDetails} />
        </div>
    )
}

export default ManageUser
