import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import '../Styles/Common.css'
import { BASE_URL } from '../helper'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import AboutModal from '../Components/Admin/AboutModal'
import AlertContext from '../Context/AlertContext'
const ManageAbout = () => {
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)

    const [aboutData, setaboutData] = useState([{ para: "" }])
    const [paras, setParas] = useState([])
    const [selectedPara, setSelectedPara] = useState({ para: "", id: "" })
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        fetchAboutParas()
        // eslint-disable-next-line
    }, [isOpen])

    const fetchAboutParas = async () => {
        const response = await fetch(`${BASE_URL}/api/about/fetchabout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            }
        })
        const res = await response.json()
        if (res.success) {
            setParas(res.data)
        }
    }

    const handleParaDelete = async (id) => {
        console.log("CAlled")
        console.log(id)
        const response = await fetch(`${BASE_URL}/api/about/deleteabout/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            }
        })

        const json = await response.json()
        if (json.success) {
            showAlert('success',"Paragraph Delete Successfully")
            setParas(paras.filter(para => para._id !== id))
        }
    }

    const UpdatePara = async (id, para) => {
        setIsOpen(true)
        setSelectedPara({ para: para, id: id })
    }
    const handleRemovePara = (index) => {
        const value = [...aboutData]
        value.splice(index, 1)
        setaboutData(value)
    }
    const handleOnChange = (index, e) => {
        const data = [...aboutData]
        data[index].para = e.target.value
        setaboutData(data)
    }
    const handleAddPara = () => {
        const data = [...aboutData, { para: "" }]
        setaboutData(data)
    }
    const handleSubmit = async () => {
        const response = await fetch(`http://localhost:5000/api/about/addabout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            },
            body: JSON.stringify(aboutData) // body data type must match "Content-Type" header
        });
        const res = await response.json()
        if (res.success) {
            showAlert('success',"Paragraphs Added Successfully")
            setParas([...paras, ...res.data])
        }
        setaboutData([{ para: "" }])
    }
    return (
        <div className='ml-[75px] flex flex-col justify-start items-center'>
            <motion.div
                variants={fadeIn('left', 0.2, 10)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true, amount: 0.7 }}
                className=' mx-8 flex items-center justify-center text-[25px] md:text-[30px] font-[Montserrat] my-4 py-2 font-semibold'>
                <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' ></span>
                <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>Add About Para's</h2>
            </motion.div>
            <div className='my-6 py-4 px-2 flex justify-center flex-col border w-[230px] md:w-[500px] border-[#222f43] items-center'>
                <form className='flex flex-col justify-center items-center text-[#94a9c9] min-w-[fit] rounded-lg py-12 px-10 ' method='post' encType='multipart/form-data'>
                    {aboutData.map((data, index) => (

                        <div key={index} className='flex justify-start flex-col my-3'>
                            <div className='flex justify-start flex-col my-3 '>
                                <label htmlFor={`para-${index}`} className='my-1'>Para</label>
                                <textarea type="text" name='para' value={data.para} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter your name' />
                            </div>

                            <div className='m-5 flex justify-center items-center'>
                                <button onClick={(e) => handleRemovePara(index)} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Remove</button>
                            </div>
                        </div>
                    ))}

                </form>
                <div className='flex  text-[#94a9c9]'>
                    <div className='mr-5'>
                        <button onClick={handleAddPara} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Add More </button>
                    </div>
                    <div className=''>
                        <button onClick={handleSubmit} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Submit</button>
                    </div>
                </div>
            </div>
            <AboutModal paras={paras} setParas={setParas} para={selectedPara.para} paraid={selectedPara.id} isOpen={isOpen} setIsOpen={setIsOpen} />
            <section className='flex flex-col justify-center items-center'>
                <motion.div
                    variants={fadeIn('left', 0.2, 10)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    className=' mx-8 flex items-center justify-center text-[25px] md:text-[30px] font-[Montserrat] my-4 py-2 font-semibold'>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' ></span>
                    <h2 className='text-[#94a9c9] w-[-webkit-fill-available] text-center md:w-fit mx-2'>Current Paragraphs</h2>
                </motion.div>
                <div className='my-5 grid md:grid-cols-2 grid-cols-1 gap-3'>
                    {
                        paras.map((para, index) => (
                            <motion.div
                                variants={fadeIn('left', `0.4${index}`, 10)}
                                initial='hidden'
                                whileInView={'show'}
                                viewport={{ once: true, amount: 0.7 }}
                                key={index} className=' w-[295px] md:w-[500px] bg-[#131c31] p-3 rounded-lg my-5 font-mono'>
                                <h3>Paragraph-{index + 1}</h3>
                                <p className='text-justify text-[#94a9c9] my-3 w-[fit]  leading-7  '>
                                    {para.para}

                                </p>
                                <button onClick={() => handleParaDelete(para._id)} className={`p-2 w-[90px] text-base mx-2  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Delete</button>
                                <button onClick={() => UpdatePara(para._id, para.para)} className={`p-2 w-[90px] text-base mx-2 ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Update</button>
                            </motion.div>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default ManageAbout
