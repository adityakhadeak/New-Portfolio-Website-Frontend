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
        <div>
            <motion.div
                variants={fadeIn('left', 0.2, 10)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.7 }}
                className=' mx-8 flex items-center justify-center text-[25px] md:text-[30px] font-[Montserrat] my-4 py-2 font-semibold'>
                <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' ></span>
                <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>Add User Details </h2>
            </motion.div>
            <div className='my-6 py-4 px-2 flex justify-center flex-col items-center'>
                <form className='flex flex-col justify-center items-center text-[#94a9c9] md:w-fit w-[-webkit-fill-available]  rounded-lg py-1 px-4 border border-[#222f43]' method='post' encType='multipart/form-data'>

                    <div className='flex justify-start flex-col my-3 w-[-webkit-fill-available]'>
                        <div className='flex justify-start flex-col my-3 '>
                            <label htmlFor={`skill`} className='my-1'>Name</label>
                            <input type="text" name='name' value={userData.name} onChange={(e) => handleOnChange(e.target.name, e.target.value)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                        </div>
                        <div className='flex justify-start flex-col my-3 '>
                            <label htmlFor={`skill`} className='my-1'>Prof 1</label>
                            <input type="text" name='profone' value={userData.profone} onChange={(e) => handleOnChange(e.target.name, e.target.value)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                        </div>
                        <div className='flex justify-start flex-col my-3 '>
                            <label htmlFor={`skill`} className='my-1'>Prof 2</label>
                            <input type="text" name='proftwo' value={userData.proftwo} onChange={(e) => handleOnChange(e.target.name, e.target.value)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                        </div>
                        <div className='flex justify-start flex-col my-3 '>
                            <label htmlFor={`skill`} className='my-1'>Prof 3</label>
                            <input type="text" name='profthree' value={userData.profthree} onChange={(e) => handleOnChange(e.target.name, e.target.value)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                        </div>
                        <div className='flex justify-start flex-col my-3 '>
                            <label htmlFor={`skill`} className='my-1'>Prof 4</label>
                            <input type="text" name='proffour' value={userData.proffour} onChange={(e) => handleOnChange(e.target.name, e.target.value)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                        </div>
                        <div className='flex justify-start flex-col my-3 '>
                            <label htmlFor={`skill`} className='my-1'>Current Status</label>
                            <input type="text" name='currentsts' value={userData.currentsts} onChange={(e) => handleOnChange(e.target.name, e.target.value)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                        </div>
                      
                        <div className='flex justify-start flex-col'>
                            <label htmlFor={`image`} className='my-1'>Image</label>
                            <input type="file" accept='image/*' name='image' onChange={(e) => handleImgOnChange(e.target.files[0])} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3   md:w-[330px]`} placeholder='Enter skill name' />
                        </div>
                       
                    </div>
                </form>
                <div className='flex text-[#94a9c9]'>
                    <div className='m-5'>

                    {loading ? < PulseLoader
                            color={"#0bccd3"}
                            loading={loading}
                            speedMultiplier={1}
                            cssOverride={{ margin: "10px 0" }}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        /> :<button onClick={handleSubmit} disabled={userDetails.length>=1?true:false}  className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'} border border-cyan-400`}  >Submit</button>

                        }
                    
                    </div>
                </div>
            </div>
            <UserDetails isOpen={isOpen}  setIsOpen={setIsOpen} userDetails={userDetails} setUserDetails={setUserDetails} />
        </div>
    )
}

export default ManageUser
