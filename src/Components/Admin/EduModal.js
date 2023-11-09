import React, { useState, useContext, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from 'framer-motion';
import ThemeContext from '../../Context/ThemeContext.js'
import { BASE_URL } from '../../helper.js';

const EduModal = (props) => {
    const { edus, setEdus, setIsOpen, selectedEdu, isOpen } = props
    const { mode } = useContext(ThemeContext)
    const [updateEdu, setUpdateEdu] = useState({year: '', clg: '', edu: '', sts: '', link: '',id:''})

    useEffect(() => {
        setUpdateEdu({ year: selectedEdu.year, clg: selectedEdu.clg, edu: selectedEdu.edu, sts: selectedEdu.sts, link: selectedEdu.link})
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
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            },
            body: JSON.stringify(updateEdu)

        })
        const json = await response.json()
        if (json.success) {
            setEdus(edus.filter(edu => edu._id !== selectedEdu.id))
            setEdus([...edus, json.updatedData])
        }
        setIsOpen(false)
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
                                <label htmlFor={`year `} className='my-1'>Year</label>
                                <input type="text" name='year' value={updateEdu.year} onChange={(e) => handleOnChange(e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter title' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`clg `} className='my-1'>College</label>
                                <input type="text" name='clg' value={updateEdu.clg} onChange={(e) => handleOnChange(e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter Description' />
                            </div>
                            
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`edu `} className='my-1'>Education</label>
                                <input type="text" name='edu' value={updateEdu.edu} onChange={(e) => handleOnChange(e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter Platform like cousera,kaggle etc' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`sts `} className='my-1'>Status</label>
                                <input type="text" name='sts' value={updateEdu.sts} onChange={(e) => handleOnChange(e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter label course/bootcamp' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`link `} className='my-1'>Link</label>
                                <input type="text" name='link' value={updateEdu.link} onChange={(e) => handleOnChange(e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter link of doc' />
                            </div>

                        </div>

                        <div className='m-5 flex justify-center items-center'>
                            <button onClick={() => handleUpdate()} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Update</button>
                        </div>
                    </div>

                </motion.div>
            </motion.div>}
        </AnimatePresence>
    )
}

export default EduModal
