import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../../helper'
import { fadeIn } from '../../Variants'
import { motion } from 'framer-motion'
import ThemeContext from '../../Context/ThemeContext'
import ExpModal from './ExpModal'
const ExpDetails = (props) => {
    const { mode } = useContext(ThemeContext)
    const { isOpen, setIsOpen, exps, setExps } = props
    const [selectedExp, setSelectedExp] = useState({ duration: '', title: '', company: '', techstack: '', link: '', doc: '', id: '' })

    useEffect(() => {
        fetchExps()
        // eslint-disable-next-line
    }, [isOpen])


    const fetchExps = async () => {
        const response = await fetch(`${BASE_URL}/api/exp/fetchexp`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            }
        })
        const res = await response.json()
        if (res.success) {
            setExps(res.data)
        }
    }

    const handleExpDelete = async (id) => {
        console.log("CAlled")
        console.log(id)
        const response = await fetch(`${BASE_URL}/api/exp/deleteexp/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOTg5NjA1NjE1YjRkY2M3MTg4YWEwIn0sImlhdCI6MTY5NzI2OTgyN30.sxqnzWQB7hJNplDzraLglz88qjyR_x72mKo1OIF8wk4'
            }
        })

        const json = await response.json()
        if (json.success) {
            setExps(exps.filter(exp => exp._id !== id))
        }
    }

    const UpdateExp = async (duration, title, company, techstack, link, doc, id) => {
        setIsOpen(true)
        setSelectedExp({ duration, title, company, techstack, link, doc, id })
    }
    return (
        <>
            <ExpModal exps={exps} setExps={setExps} selectedExp={selectedExp} setSelectedExp={setSelectedExp} isOpen={isOpen} setIsOpen={setIsOpen} />

            <section className='flex flex-col justify-center items-center'>
                <motion.div
                    variants={fadeIn('left', 0.2, 10)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    className=' mx-8 flex items-center justify-center text-[25px] md:text-[30px] font-[Montserrat] my-4 py-2 font-semibold'>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' ></span>
                    <h2 className='text-[#94a9c9] w-[-webkit-fill-available] text-center md:w-fit mx-2'>Current Experience Details</h2>
                </motion.div>
                {exps.length == 0 ? (
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
                ) : (<div className='my-5 grid md:grid-cols-2 grid-cols-1 gap-3'>
                    {
                        exps.map((exp, index) => (
                            <motion.div
                                variants={fadeIn('left', `0.4${index}`, 10)}
                                initial='hidden'
                                whileInView={'show'}
                                viewport={{ once: true, amount: 0.7 }}
                                key={index} className=' w-[295px] md:w-[500px] bg-[#131c31] p-3 rounded-lg my-5 font-mono'>
                                <h3>Experience-{index + 1}</h3>
                                <div className='flex justify-start flex-col my-3 '>
                                    <div className='my-1'>Duration</div>
                                    <div>{exp.duration}</div>
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <div className='my-1'>Title</div>
                                    <div>{exp.title}</div>

                                </div>

                                <div className='flex justify-start flex-col my-3 '>
                                    <div className='my-1'>Company</div>
                                    <div>{exp.company}</div>
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <div htmlFor={`label `} className='my-1'>TechStack</div>
                                    <div>{exp.techstack}</div>
                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <div htmlFor={`doclabel `} className='my-1'>Link</div>
                                    <div>{exp.link}</div>

                                </div>
                                <div className='flex justify-start flex-col my-3 '>
                                    <div htmlFor={`doclabel `} className='my-1'>Doc</div>
                                    <div>{exp.doc}</div>

                                </div>
                                <button onClick={() => handleExpDelete(exp._id)} className={`p-2 w-[90px] text-base mx-2  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Delete</button>
                                <button onClick={() => UpdateExp(exp.duration, exp.title, exp.company, exp.techstack, exp.link, exp.doc, exp._id)} className={`p-2 w-[90px] text-base mx-2 ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Update</button>
                            </motion.div>
                        ))
                    }
                </div>)
                }
            </section>
        </>
    )
}

export default ExpDetails
