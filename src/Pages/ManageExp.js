import React, { useContext, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import '../Styles/Common.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
const ManageExp = () => {
    const { mode } = useContext(ThemeContext)
    const [expData, setexpData] = useState([{ duration:'',title:'',company:'',techstack:'',link:'',doc:'' }])



    const handleRemoveexp = (index) => {
        const value = [...expData]
        value.splice(index, 1)
        setexpData(value)
    }
    const handleOnChange = (index, e) => {
        const data = [...expData]
        data[index][e.target.name]=[e.target.value]
        setexpData(data)
    }

const handleAddexp=()=>{
    const data=[...expData,{ duration:'',title:'',company:'',techstack:'',link:'',doc:'' }]
    setexpData(data)
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
        setexpData([{ duration:'',title:'',company:'',techstack:'',link:'',doc:'' }])
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
                    {expData.map((data, index) => (
                       <>    <h1 className='font-bold text-2xl text-center'>Form-{index+1}</h1>

                        <div key={index} className='flex justify-start flex-col my-3'>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`duration-${index}`} className='my-1'>Duration <span>format-(2021-2025)</span></label>
                                <input type="text" name='duration' value={data.duration} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter duration' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`title-${index}`} className='my-1'>Title</label>
                                <input type="text" name='title' value={data.title} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter college' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`company-${index}`} className='my-1'>Company</label>
                                <input type="text" name='company' value={data.company} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter expcation' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`techstack-${index}`} className='my-1'>Tech Stack</label>
                                <input type="text" name='techstack' value={data.techstack} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter current status' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`link-${index}`} className='my-1'>Link</label>
                                <input type="text" name='link' value={data.link} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter link of title/school' />
                            </div>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`doclink-${index}`} className='my-1'>Doc Link</label>
                                <input type="text" name='doc' value={data.doc} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter link of title/school' />
                            </div>

                            <div className='m-5 flex justify-center items-center'>
                                <button onClick={(e)=>handleRemoveexp(index)} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Remove</button>
                            </div>
                        </div>
                        </> 
                    ))}

                </form>
                <div className='flex text-[#94a9c9]'>
                    <div className='m-5'>
                        <button onClick={handleAddexp} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Add More </button>
                    </div>
                    <div className='m-5'>
                        <button onClick={handleSubmit} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageExp
