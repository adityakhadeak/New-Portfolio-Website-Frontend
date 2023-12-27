import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../../Variants'
import '../../Styles/Common.css'
import ThemeContext from '../../Context/ThemeContext'
import { BASE_URL } from '../../helper'
import AlertContext from '../../Context/AlertContext'
import Loader from '../Loader.js'
import UserDetailsModal from './UserDetailModal.js'
const UserDetails = (props) => {
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)
    const [loading, setLoading] = useState(false)
    const { isOpen, setIsOpen, userDetails, setUserDetails } = props
    const[selectedData,setSelectedData]=useState({ name: '', profone: '', proftwo: '', profthree: '', proffour: '',currentsts:'' })
    
    const handleDetailsDelete = async (id) => {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/api/user/deleteuserdetails/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })

        const res = await response.json()
        if (res.success) {
            setLoading(false)
            showAlert('success', res.message)
            setUserDetails(userDetails.filter(details => details._id !== id))

        }
    }
    const UpdateDetails = async (name, profone, proftwo, profthree,proffour, currentsts,id) => {
        setIsOpen(true)
        setSelectedData({ name, profone, proftwo, profthree, proffour,currentsts,id })
    }

    return (
        <>
            <UserDetailsModal userDetails={userDetails} setUserDetails={setUserDetails} selectedData={selectedData} setSelectedData={setSelectedData} isOpen={isOpen} setIsOpen={setIsOpen} />

            <section className='flex flex-col justify-center items-center'>
                <motion.div
                    variants={fadeIn('left', 0.2, 10)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: true, amount: 0.7 }}
                    className=' mx-8 flex items-center justify-center text-[25px] md:text-[30px] font-[Montserrat] my-4 py-2 font-semibold'>
                    <span className='text-[#1cc2e7] text-[20px] md:text-[28px]' ></span>
                    <h2 className='text-[#94a9c9] w-[-webkit-fill-available] text-center md:w-fit mx-2'>Added Details </h2>
                </motion.div>
                {userDetails.length === 0 ? (
                    <motion.div
                        variants={fadeIn('left', `0.4`)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true, amount: 0.7 }}
                        className='flex justify-center items-center '>
                        <p className='text-[#94a9c9] w-[-webkit-fill-available] text-center md:w-fit mx-auto'>
                            No Details to display
                        </p>
                    </motion.div>
                ) : (
                    <div className='flex flex-col justify-center items-center w-fit md:w-[-webkit-fill-available] '>
                        <motion.div
                            variants={fadeIn('left', `0.4`, 10)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{ once: true, amount: 0.7 }}
                            className=' w-[295px] md:w-[500px] p-3 flex justify-center items-center rounded-lg my-5 font-mono'>

                            <img src={userDetails[0].userimage} className='md:w-[235px] w-[-webkit-fill-available] h-[300px]' alt="project-pic" />

                        </motion.div>

                        <div className='flex justify-start flex-col my-3 '>
                            <div className='my-1'>Name</div>
                            <div>{userDetails[0].name}</div>
                        </div>
                        <div className='flex justify-start flex-col my-3 '>
                            <div className='my-1'>Prof 1</div>
                            <div>{userDetails[0].prof['1st']}</div>

                        </div>
                        <div className='flex justify-start flex-col my-3 '>
                            <div className='my-1'>Prof 2</div>
                            <div>{userDetails[0].prof['2nd']}</div>

                        </div>
                        <div className='flex justify-start flex-col my-3 '>
                            <div className='my-1'>Prof 3</div>
                            <div>{userDetails[0].prof['3rd']}</div>

                        </div>
                        <div className='flex justify-start flex-col my-3 '>
                            <div className='my-1'>Prof 4</div>
                            <div>{userDetails[0].prof['4th']}</div>

                        </div>

                        <div className='flex justify-start flex-col my-3 '>
                            <div className='my-1'>Current Status</div>
                            <div>{userDetails[0].currentsts}</div>
                        </div>

                        <button onClick={() => handleDetailsDelete(userDetails[0]._id)} className={`p-2 w-[90px] text-base mx-2  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Delete</button>
                        <button onClick={()=>UpdateDetails(userDetails[0].name,userDetails[0].prof['1st'],userDetails[0].prof['2nd'],userDetails[0].prof['3rd'],userDetails[0].prof['4th'],userDetails[0].currentsts,userDetails[0]._id)} className={`p-2 w-[90px] text-base mx-2  my-4 ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'}  border border-cyan-400`}>Update</button>
                        {loading && <Loader loading={loading} />
                        }

                    </div>)
                }
            </section>
        </>
    )
}

export default UserDetails
