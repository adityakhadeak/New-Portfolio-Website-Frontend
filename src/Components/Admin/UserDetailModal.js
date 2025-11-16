import React, { useState, useContext, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from 'framer-motion';
import ThemeContext from '../../Context/ThemeContext.js'
import { BASE_URL } from '../../helper.js';
import AlertContext from '../../Context/AlertContext.js';
import PulseLoader from 'react-spinners/PulseLoader.js';

const UserDetailsModal = (props) => {
    const {  setIsOpen,setUserDetails,selectedData, userDetails, isOpen } = props
    const [loading, setLoading] = useState(false)
    const { mode } = useContext(ThemeContext)
    const {showAlert}=useContext(AlertContext)
    const [image, setImage] = useState(null)

    const [updatedData, setUpdatedData] = useState({ name: '', profone: '', proftwo: '', profthree: '', proffour: '',currentsts:'' })

    useEffect(() => {
        setUpdatedData({ name: selectedData.name, profone: selectedData.profone, proftwo: selectedData.proftwo, profthree:selectedData.profthree, proffour: selectedData.proffour,currentsts:selectedData.currentsts })
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
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value })
    }
    const handleImgOnChange = (file) => {
        setImage(file)
    }

    const handleUpdate = async () => {
        setLoading(true)
        console.log(updatedData)
        const formData = new FormData()
        formData.append('name', updatedData.name)
        formData.append('profone', updatedData.profone)
        formData.append('proftwo', updatedData.proftwo)
        formData.append('profthree', updatedData.profthree)
        formData.append('proffour', updatedData.proffour)
        formData.append('currentsts', updatedData.currentsts)
        formData.append('image', image)
console.log(formData)
        const response = await fetch(`${BASE_URL}/api/user/updateuserdetails/${selectedData.id}`, {
            method: "PUT",
            headers: {
                "auth-token": localStorage.getItem('token')
             },
            body: formData

        })
        console.log(response)
        const json = await response.json()
        if (json.success) {
            setUserDetails(userDetails.filter(detail => detail._id !== selectedData.id))
            setUserDetails([...userDetails, json.updatedData])
            setLoading(false)
            setIsOpen(false)
            showAlert('success',"Details Updated Successfully")
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
                        <h2 className='text-xl md:text-2xl font-bold text-white'>Update Profile Details</h2>
                        <button onClick={() => setIsOpen(false)} className='text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300'>
                            <RxCross2 size={24} />
                        </button>
                    </div>
                    <div className='p-6 max-h-[70vh] overflow-y-auto'>
                        <div className='flex justify-start flex-col my-3'>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`duration `} className='my-1'>Name</label>
                                <input type="text" name='name' value={updatedData.name} onChange={(e) => handleOnChange(e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter title' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`title `} className='my-1'>Prof 1</label>
                                <input type="text" name='profone' value={updatedData.profone} onChange={(e) => handleOnChange(e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter Description' />
                            </div>
                            
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`company `} className='my-1'>Prof 2</label>
                                <input type="text" name='proftwo' value={updatedData.proftwo} onChange={(e) => handleOnChange(e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter Platform like cousera,kaggle etc' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`techstack `} className='my-1'>Prof 3</label>
                                <input type="text" name='profthree' value={updatedData.profthree} onChange={(e) => handleOnChange(e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter label course/bootcamp' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`link `} className='my-1'>Prof 4</label>
                                <input type="text" name='proffour' value={updatedData.proffour} onChange={(e) => handleOnChange(e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter link of doc' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`doc `} className='my-1'>Current Status</label>
                                <input type="text" name='currentsts' value={updatedData.currentsts} onChange={(e) => handleOnChange(e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter link of doc' />
                            </div>

                            <div className='flex justify-start flex-col'>
                            <label htmlFor={`image`} className='my-1'>Image</label>
                            <input type="file" accept='image/*' name='image' onChange={(e) => handleImgOnChange(e.target.files[0])} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3   md:w-[330px]`} placeholder='Enter skill name' />
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
                                <button onClick={() => handleUpdate()} className='flex-1 py-3 px-6 bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1cc2e7]/50 transform hover:scale-105 transition-all duration-300'>
                                    Update Details
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>}
        </AnimatePresence>
    )
}

export default UserDetailsModal
