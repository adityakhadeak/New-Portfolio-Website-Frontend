import React, { useContext, useEffect, useState } from 'react'
import EduModal from './EduModal'
import { BASE_URL } from '../../helper'
import { fadeIn } from '../../Variants'
import { motion } from 'framer-motion'
import ThemeContext from '../../Context/ThemeContext'
import AlertContext from '../../Context/AlertContext'
import { useNavigate } from 'react-router-dom'
const EduDetails = (props) => {
    const navigate=useNavigate()   
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)
    const { isOpen, setIsOpen, edus, setEdus } = props
    const [selectedEdu, setSelectedEdu] = useState({ year: '', clg: '', edu: '', sts: '', link: '', id: '' })

    const token=localStorage.getItem('token')

    useEffect(() => {
        if ( token== null) {
            navigate("/login")
        }
        else{
            fetchEdus()
        }
        // eslint-disable-next-line
    }, [isOpen])
  
    const fetchEdus = async () => {
        const response = await fetch(`${BASE_URL}/api/edu/fetchedu`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const res = await response.json()
        if (res.success) {
            setEdus(res.data)
        }
    }

    const handleEduDelete = async (id) => {
        console.log("CAlled")
        console.log(id)
        const response = await fetch(`${BASE_URL}/api/edu/deleteedu/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
             }
        })

        const json = await response.json()
        if (json.success) {
            setEdus(edus.filter(edu => edu._id !== id))
            showAlert('success',"Education Deleted Successfully")

        }
    }

    const UpdateEdu = async (year, clg, edu, sts, link, id) => {
        setIsOpen(true)
        setSelectedEdu({ year, clg, edu, sts, link, id })
    }
    return (
        <>
            <EduModal edus={edus} setEdus={setEdus} selectedEdu={selectedEdu} setSelectedEdu={setSelectedEdu} isOpen={isOpen} setIsOpen={setIsOpen} />

            <section className='flex flex-col justify-center items-center'>
                <motion.div
                    variants={fadeIn('left', 0.2, 10)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    className=' mx-8 flex items-center justify-center text-[25px] md:text-[30px] font-[Montserrat] my-4 py-2 font-semibold'>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' ></span>
                    <h2 className='text-[#94a9c9] w-[-webkit-fill-available] text-center md:w-fit mx-2'>Current Education Details</h2>
                </motion.div>
                {edus.length === 0 ? (
                    <motion.div
                        variants={fadeIn('left', `0.4`)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.7 }}
                        className='flex justify-center items-center'>
                        <p className='text-[#94a9c9] w-[-webkit-fill-available] text-center md:w-fit mx-auto'>
                            No details to display
                        </p>
                    </motion.div>
                ) :
                    (
                        <div className='my-5 grid md:grid-cols-2 grid-cols-1 gap-3'>
                            {
                                edus.map((edu, index) => (
                                    <motion.div
                                        variants={fadeIn('left', `0.4${index}`, 10)}
                                        initial='hidden'
                                        whileInView={'show'}
                                        viewport={{ once: true, amount: 0.7 }}
                                        key={index} className=' w-[295px] md:w-[500px] bg-[#131c31] p-3 rounded-lg my-5 font-mono'>
                                        <h3>Education-{index + 1}</h3>
                                        <div className='flex justify-start flex-col my-3 '>
                                            <div className='my-1'>Year</div>
                                            <div>{edu.year}</div>
                                        </div>
                                        <div className='flex justify-start flex-col my-3 '>
                                            <div className='my-1'>College</div>
                                            <div>{edu.clg}</div>

                                        </div>

                                        <div className='flex justify-start flex-col my-3 '>
                                            <div className='my-1'>Education</div>
                                            <div>{edu.edu}</div>
                                        </div>
                                        <div className='flex justify-start flex-col my-3 '>
                                            <div htmlFor={`label `} className='my-1'>status</div>
                                            <div>{edu.sts}</div>
                                        </div>
                                        <div className='flex justify-start flex-col my-3 '>
                                            <div htmlFor={`doclabel `} className='my-1'>Link</div>
                                            <div>{edu.link}</div>

                                        </div>
                                        <button onClick={() => handleEduDelete(edu._id)} className={`p-2 w-[90px] text-base mx-2  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Delete</button>
                                        <button onClick={() => UpdateEdu(edu.year, edu.clg, edu.edu, edu.sts, edu.link, edu._id)} className={`p-2 w-[90px] text-base mx-2 ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Update</button>
                                    </motion.div>
                                ))
                            }
                        </div>)
                }
            </section>
        </>
    )
}

export default EduDetails
