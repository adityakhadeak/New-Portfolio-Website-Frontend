import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import '../Styles/Common.css'
import { fadeIn } from '../Variants'
import { motion } from 'framer-motion'
import { BASE_URL } from '../helper'
import CerModal from '../Components/Admin/CerModal'
import AlertContext from '../Context/AlertContext'
import { useNavigate } from 'react-router-dom'
const ManageCer = () => {
    const navigate=useNavigate()
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)
    const [cerData, setcerData] = useState([{ title: '', desc: '', date: '', platform: '', label: '', doc: '' }])
    const [cers, setCers] = useState([])
    const [selectedCer, setSelectedCer] = useState({ title: '', desc: '', date: '', platform: '', label: '', doc: '', id: "" })

    const [isOpen, setIsOpen] = useState(false)


    const token=localStorage.getItem('token')

    useEffect(() => {
        if ( token== null) {
            navigate("/login")
        }
        else{
            fetchAboutCers()
        }
        // eslint-disable-next-line
    }, [isOpen])

    const fetchAboutCers = async () => {
        const response = await fetch(`${BASE_URL}/api/cer/fetchcertificates`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            }
        })
        const res = await response.json()
        if (res.success) {
            setCers(res.data)
        }
    }

    const handleCerDelete = async (id) => {
        console.log("CAlled")
        console.log(id)
        const response = await fetch(`${BASE_URL}/api/cer/deletecer/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            }
        })

        const json = await response.json()
        if (json.success) {
            setCers(cers.filter(cer => cer._id !== id))
        }
    }

    const UpdateCer = async (title, desc, date, platform, label, doc, id) => {
        setIsOpen(true)
        setSelectedCer({ title, desc, date, platform, label, doc, id })
    }
    const handleRemoveexp = (index) => {
        const value = [...cerData]
        value.splice(index, 1)
        setcerData(value)
    }
    const handleOnChange = (index, e) => {
        const data = [...cerData]
        data[index][e.target.name] = e.target.value
        setcerData(data)
    }

    const handleAddexp = () => {
        const data = [...cerData, { title: '', desc: '', date: '', platform: '', label: '', doc: '' }]
        setcerData(data)
    }

    const handleSubmit = async () => {

        const response = await fetch(`http://localhost:5000/api/cer/addcertificate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            },
            body: JSON.stringify(cerData) // body data type must match "Content-Type" header
        });
        const res = await response.json()
        console.log(res)
        if (res.success) {
            setCers([...cers, ...res.data])
            setcerData([{ title: '', desc: '', date: '', platform: '', label: '', doc: '' }])
            showAlert('success',"Certificate details Added")
        }
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
                <h2 className='text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>Add Details Of Certificates</h2>
            </motion.div>
            <div className='my-6 py-4 px-2 flex justify-center flex-col border w-[230px] md:w-[500px] border-[#222f43] items-center'>
                <form className='flex flex-col justify-center items-center text-[#94a9c9] w-[100%] rounded-lg py-12 px-10' method='post' encType='multipart/form-data'>
                    {cerData.map((data, index) => (
                        <div key={index}>    <h1 className='font-bold text-2xl text-center'>Form-{index + 1}</h1>

                            <div className='flex justify-start flex-col my-3'>
                                <div className='flex justify-start flex-col my-3 '>
                                    <label htmlFor={`title `} className='my-1'>Title</label>
                                    <input type="text" name='title' value={data.title} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter title' />
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <label htmlFor={`desc `} className='my-1'>Description</label>
                                    <input type="text" name='desc' value={data.desc} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter Description' />
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <label htmlFor={`data `} className='my-1'>Date <span>format-(10-08-2023)</span></label>
                                    <input type="text" name='date' value={data.date} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter Date' />
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <label htmlFor={`platform `} className='my-1'>Platform</label>
                                    <input type="text" name='platform' value={data.platform} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter Platform like cousera,kaggle etc' />
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <label htmlFor={`label `} className='my-1'>Label</label>
                                    <input type="text" name='label' value={data.label} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter label course/bootcamp' />
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <label htmlFor={`doclabel `} className='my-1'>Doc</label>
                                    <input type="text" name='doc' value={data.doc} onChange={(e) => handleOnChange(index, e)} className={` ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  border border-[#222f43] rounded-lg md:w-[330px]`} placeholder='Enter link of doc' />
                                </div>

                                <div className='m-5 flex justify-center items-center'>
                                    <button onClick={(e) => handleRemoveexp(index)} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Remove</button>
                                </div>
                            </div>
                        </div>
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
            <CerModal cers={cers} setCers={setCers} selectedCer={selectedCer} setSelectedCer={setSelectedCer} isOpen={isOpen} setIsOpen={setIsOpen} />

            <section className='flex flex-col justify-center items-center'>
                <motion.div
                    variants={fadeIn('left', 0.2, 10)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    className=' mx-8 flex items-center justify-center text-[25px] md:text-[30px] font-[Montserrat] my-4 py-2 font-semibold'>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' ></span>
                    <h2 className='text-[#94a9c9] w-[-webkit-fill-available] text-center md:w-fit mx-2'>Current Certificates</h2>
                </motion.div>
                {cers.length === 0 ? (
                    <motion.div
                        variants={fadeIn('left', `0.4`)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.7 }}
                        className='flex justify-center items-center'>
                        <p className='text-[#94a9c9] w-[-webkit-fill-available] text-center md:w-fit mx-auto'>
                            No Certificates to display
                        </p>
                    </motion.div>
                ) : (
                    <div className='my-5 grid md:grid-cols-2 grid-cols-1 gap-3'>
                        {
                            cers.map((cer, index) => (
                                <motion.div
                                    variants={fadeIn('left', `0.4${index}`, 10)}
                                    initial='hidden'
                                    whileInView={'show'}
                                    viewport={{ once: true, amount: 0.7 }}
                                    key={index} className=' w-[295px] md:w-[500px] bg-[#131c31] p-3 rounded-lg my-5 font-mono'>
                                    <h3>Certificate-{index + 1}</h3>
                                    <div className='flex justify-start flex-col my-3 '>
                                        <div className='my-1'>Title</div>
                                        <div>{cer.title}</div>
                                    </div>
                                    <div className='flex justify-start flex-col my-3 '>
                                        <div className='my-1'>Description</div>
                                        <div>{cer.desc}</div>

                                    </div>
                                    <div className='flex justify-start flex-col my-3 '>
                                        <div className='my-1'>Date <span>format-(10-08-2023)</span></div>
                                        <div>{cer.date}</div>
                                    </div>
                                    <div className='flex justify-start flex-col my-3 '>
                                        <div className='my-1'>Platform</div>
                                        <div>{cer.platform}</div>
                                    </div>
                                    <div className='flex justify-start flex-col my-3 '>
                                        <div htmlFor={`label `} className='my-1'>Label</div>
                                        <div>{cer.label}</div>
                                    </div>
                                    <div className='flex justify-start flex-col my-3 '>
                                        <div htmlFor={`doclabel `} className='my-1'>Doc</div>
                                        <div>{cer.doc}</div>

                                    </div>
                                    <button onClick={() => handleCerDelete(cer._id)} className={`p-2 w-[90px] text-base mx-2  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Delete</button>
                                    <button onClick={() => UpdateCer(cer.title, cer.desc, cer.date, cer.platform, cer.label, cer.doc, cer._id)} className={`p-2 w-[90px] text-base mx-2 ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Update</button>
                                </motion.div>
                            ))
                        }
                    </div>)
                }
            </section>
        </div>
    )
}

export default ManageCer
