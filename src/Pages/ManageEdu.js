import React, { useContext, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import '../Styles/Common.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
const ManageEdu = () => {
    const { mode } = useContext(ThemeContext)
    const [eduData, seteduData] = useState([{ year:'',clg:'',edu:'',sts:'',link:'' }])



    const handleRemoveEdu = (index) => {
        const value = [...eduData]
        value.splice(index, 1)
        seteduData(value)
    }
    const handleOnChange = (index, e) => {
        const data = [...eduData]
        data[index][e.target.name]=e.target.value
        seteduData(data)
    }

const handleAddEdu=()=>{
    const data=[...eduData,{ year:'',clg:'',edu:'',sts:'',link:'' }]
    seteduData(data)
}

    const handleSubmit = async () => {
        const response = await fetch(`http://localhost:5000/api/edu/addedu`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            },
             body: JSON.stringify(eduData) // body data type must match "Content-Type" header
        });
        const res = await response.json()
        console.log(res)
        seteduData([{ year:'',clg:'',edu:'',sts:'',link:'' }])
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
                <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>Add Details About Education</h2>
            </motion.div>
            <div className='my-6 py-4 px-2 flex justify-center flex-col items-center'>
                <form className='flex flex-col justify-center items-center text-[#94a9c9] w-[100%] rounded-lg py-12 px-10 border border-[#222f43]' method='post' encType='multipart/form-data'>
                    {eduData.map((data, index) => (
                       <>    <h1 className='font-bold text-2xl text-center'>Form-{index+1}</h1>

                        <div key={index} className='flex justify-start flex-col my-3'>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`year-${index}`} className='my-1'>Year <span>format-(2021-2025)</span></label>
                                <input type="text" name='year' value={data.year} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter year' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`clg-${index}`} className='my-1'>College/School</label>
                                <input type="text" name='clg' value={data.clg} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter college' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`edu-${index}`} className='my-1'>Education</label>
                                <input type="text" name='edu' value={data.edu} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter education' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`sts-${index}`} className='my-1'>Status</label>
                                <input type="text" name='sts' value={data.sts} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter current status' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`para-${index}`} className='my-1'>Link</label>
                                <input type="text" name='link' value={data.link} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter link of clg/school' />
                            </div>

                            <div className='m-5 flex justify-center items-center'>
                                <button onClick={(e)=>handleRemoveEdu(index)} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Remove</button>
                            </div>
                        </div>
                        </> 
                    ))}

                </form>
                <div className='flex text-[#94a9c9]'>
                    <div className='m-5'>
                        <button onClick={handleAddEdu} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Add More </button>
                    </div>
                    <div className='m-5'>
                        <button onClick={handleSubmit} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageEdu
