import React, { useContext, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import '../Styles/Common.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
const ManageAbout = () => {
    const { mode } = useContext(ThemeContext)
    const [aboutData, setaboutData] = useState([{ para: "" }])



    const handleRemovePara = (index) => {
        const value = [...aboutData]
        value.splice(index, 1)
        setaboutData(value)
    }
    const handleOnChange = (index, e) => {
        const data = [...aboutData]
        data[index].para=[e.target.value]
        setaboutData(data)
    }

const handleAddPara=()=>{
    const data=[...aboutData,{ para: "" }]
    setaboutData(data)
}

    const handleSubmit = async () => {

        const response = await fetch(`http://localhost:5000/api/project/addproject`, {
            method: "POST",
            headers: {
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            },
            // body: formData // body data type must match "Content-Type" header
        });
        const res = await response.json()
        console.log(res)
        setaboutData([{ para: "" }])
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
                <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>Add About Para's</h2>
            </motion.div>
            <div className='my-6 py-4 px-2 flex justify-center flex-col items-center'>
                <form className='flex flex-col justify-center items-center text-[#94a9c9] w-[100%] rounded-lg py-12 px-10 border border-[#222f43]' method='post' encType='multipart/form-data'>
                    {aboutData.map((data, index) => (

                        <div key={index} className='flex justify-start flex-col my-3'>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`para-${index}`} className='my-1'>Para</label>
                                <input type="text" name='para' value={data.para} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                            </div>

                            <div className='m-5 flex justify-center items-center'>
                                <button onClick={(e)=>handleRemovePara(index)} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Remove</button>
                            </div>
                        </div>
                    ))}

                </form>
                <div className='flex text-[#94a9c9]'>
                    <div className='m-5'>
                        <button onClick={handleAddPara} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Add More </button>
                    </div>
                    <div className='m-5'>
                        <button onClick={handleSubmit} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageAbout
