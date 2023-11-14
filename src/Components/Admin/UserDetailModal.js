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
            showAlert('success',"Deatails Updated Successfully")
        }
    }
    return (
        <AnimatePresence>
            {isOpen && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, duration: 0.4 }}
                className=' flex justify-center items-center fixed z-[1000] top-0 left-0 w-[100%] h-[100vh] backdrop-blur-sm bg-[#131c316f]'>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0, transition: { duration: .3 } }}
                    className={`modal mx-auto  md:w-[400px] bg-[#131c31] relative border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-[10px] `}>
                    <div className='absolute right-2 top-2'>
                        <RxCross2 onClick={() => setIsOpen(false)} />
                    </div>
                    <div className='flex justify-start flex-col my-3 p-4 h-[400px] overflow-scroll '>
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

                        <div className='m-5 flex justify-center items-center'>
                        {loading?< PulseLoader
                        color={"#0bccd3"}
                        loading={loading}
                        speedMultiplier={1}
                        cssOverride={{ margin: "10px 0" }}
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />:<button onClick={() => handleUpdate()} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Update</button>


                    }
                        </div>
                    </div>

                </motion.div>
            </motion.div>}
        </AnimatePresence>
    )
}

export default UserDetailsModal
