import React, { useState, useContext, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from 'framer-motion';
import ThemeContext from '../../Context/ThemeContext.js'
import { BASE_URL } from '../../helper.js';

const AboutModal = (props) => {
    const { paras, setParas, setIsOpen, para, paraid, isOpen } = props
    const { mode } = useContext(ThemeContext)
    const [aboutPara, setaboutPara] = useState({ para: '' })

    useEffect(() => {
        setaboutPara({ para: para })
    }, [isOpen])

    const handleOnChange = (e) => {
        setaboutPara({ ...aboutPara, [e.target.name]: e.target.value })
    }
    console.log(para, paraid)
    const handleUpdatePara = async () => {
        const response = await fetch(`${BASE_URL}/api/about/updateabout/${paraid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            },
            body: JSON.stringify(aboutPara)

        })
        const json = await response.json()
        if (json.success) {
            setParas(paras.filter(para1 => para1._id != paraid))
            setParas([...paras, json.updatedAbout])
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
                    <div>
                        <div className='flex justify-start flex-col my-3 p-4 '>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`para`} className='my-1'>Para</label>
                                <textarea type="text" name='para' value={aboutPara.para} onChange={(e) => handleOnChange(e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                            </div>

                            <div className='m-5 flex justify-center items-center'>
                                <button onClick={() => handleUpdatePara()} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Update</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>}
        </AnimatePresence>
    )
}

export default AboutModal
