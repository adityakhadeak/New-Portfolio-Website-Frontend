import React, { useState, useContext, useEffect } from 'react'
import ThemeContext from '../Context/ThemeContext'
import AlertContext from '../Context/AlertContext'
import { motion } from 'framer-motion'
import { fadeIn } from '../Variants'
import { BiShow, BiHide, BiCheckCircle } from "react-icons/bi";
import { RiLockPasswordLine, RiShieldCheckLine } from "react-icons/ri";
import { BASE_URL } from '../helper';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import PulseLoader from 'react-spinners/PulseLoader';

const ResetPassword = () => {
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)
    const [password, setPassword] = useState({ newPassword: "", confirmPassword: "" })
    const [showNewPass, setShowNewPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const [userInfo, setUserInfo] = useState({ name: "", email: "" });
    const [pageLoading, setPageLoading] = useState(true);
    const [resetLoading, setResetLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    
    document.title = "Reset Password | Aditya's Portfolio"

    useEffect(() => {
        try {
            const decoded = jwtDecode(token);
            setUserInfo({ name: decoded.user.name, email: decoded.user.email });
        } catch (error) {
            showAlert("error", "Invalid token");
            console.error("Invalid token:", error);
        } finally {
            setPageLoading(false);
        }
    }, [token]);

    const handleOnChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        if (password.newPassword === "" || password.confirmPassword === "") {
            showAlert("warning", "Please fill all fields")
        } else if (password.newPassword.length < 8) {
            showAlert("warning", "Password must be at least 8 characters")
        } else if (password.newPassword !== password.confirmPassword) {
            showAlert("error", "Passwords do not match")
        } else {
            try {
                setResetLoading(true)
                const response = await fetch(`${BASE_URL}/api/user/reset-password?token=${token}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: userInfo.email, password })
                });
                const res = await response.json()
                if (res.success) {
                    showAlert('success', "Password reset successfully")
                    setTimeout(() => {
                        navigate('/login')
                    }, 1500)
                } else {
                    showAlert('error', res.message)
                }
            } catch (error) {
                showAlert('error', 'An error occurred during password reset')
            } finally {
                setResetLoading(false)
            }
        }
    }

    if (pageLoading) {
        return (
            <section className={`min-h-screen flex justify-center items-center ${mode === 'dark' ? 'bg-gradient-to-br from-[#0f172a] to-[#1e293b]' : 'bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0]'}`}>
                <PulseLoader color="#1cc2e7" size={15} />
            </section>
        )
    }

    return (
        <section className={`min-h-screen flex justify-center items-center py-12 px-4 ${mode === 'dark' ? 'bg-gradient-to-br from-[#0f172a] to-[#1e293b]' : 'bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0]'}`}>
            <motion.div 
                variants={fadeIn('up', 0.2)}
                initial='hidden'
                animate='show'
                className={`w-full max-w-md ${mode === 'dark' ? 'bg-gradient-to-br from-[#131c31] to-[#0f1824]' : 'bg-white'} rounded-3xl shadow-2xl p-8 border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                
                {/* Header */}
                <div className='text-center mb-8'>
                    <motion.div
                        variants={fadeIn('down', 0.3)}
                        initial='hidden'
                        animate='show'
                        className='inline-block p-4 rounded-full bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] mb-4'>
                        <RiShieldCheckLine className='text-white text-5xl' />
                    </motion.div>
                    <motion.h1 
                        variants={fadeIn('up', 0.4)}
                        initial='hidden'
                        animate='show'
                        className={`text-3xl md:text-4xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>
                        Reset Password
                    </motion.h1>
                    <motion.p 
                        variants={fadeIn('up', 0.5)}
                        initial='hidden'
                        animate='show'
                        className='text-[#94a9c9] text-sm'>
                        Create a new secure password for {userInfo.email}
                    </motion.p>
                </div>

                {/* Form */}
                <motion.form 
                    variants={fadeIn('up', 0.6)}
                    initial='hidden'
                    animate='show'
                    onSubmit={handleResetPassword}
                    className='space-y-6'>
                    
                    {/* New Password Field */}
                    <div>
                        <label className='block text-[#94a9c9] text-sm font-medium mb-2'>New Password</label>
                        <div className={`relative group`}>
                            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-[#94a9c9] group-focus-within:text-[#1cc2e7] transition-colors'>
                                <RiLockPasswordLine className='text-2xl' />
                            </span>
                            <input 
                                onChange={handleOnChange} 
                                type={showNewPass ? 'text' : 'password'} 
                                name='newPassword' 
                                autoComplete="new-password" 
                                value={password.newPassword} 
                                className={`w-full pl-14 pr-14 py-4 rounded-xl border ${mode === 'dark' ? 'bg-[#0f1824] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-[#f8fafc] border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20 transition-all`} 
                                placeholder='Enter new password (min 8 characters)' 
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPass(!showNewPass)}
                                className='absolute right-4 top-1/2 -translate-y-1/2 text-[#94a9c9] hover:text-[#1cc2e7] transition-colors'>
                                {showNewPass ? <BiHide className='text-2xl' /> : <BiShow className='text-2xl' />}
                            </button>
                        </div>
                        {password.newPassword.length > 0 && (
                            <div className='mt-2 space-y-1'>
                                <div className={`text-xs flex items-center gap-2 ${password.newPassword.length >= 8 ? 'text-green-500' : 'text-[#94a9c9]'}`}>
                                    <BiCheckCircle />
                                    <span>At least 8 characters</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className='block text-[#94a9c9] text-sm font-medium mb-2'>Confirm Password</label>
                        <div className={`relative group`}>
                            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-[#94a9c9] group-focus-within:text-[#1cc2e7] transition-colors'>
                                <RiLockPasswordLine className='text-2xl' />
                            </span>
                            <input 
                                onChange={handleOnChange} 
                                type={showConfirmPass ? 'text' : 'password'} 
                                name='confirmPassword' 
                                autoComplete="new-password" 
                                value={password.confirmPassword} 
                                className={`w-full pl-14 pr-14 py-4 rounded-xl border ${mode === 'dark' ? 'bg-[#0f1824] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-[#f8fafc] border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20 transition-all`} 
                                placeholder='Confirm your new password' 
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                                className='absolute right-4 top-1/2 -translate-y-1/2 text-[#94a9c9] hover:text-[#1cc2e7] transition-colors'>
                                {showConfirmPass ? <BiHide className='text-2xl' /> : <BiShow className='text-2xl' />}
                            </button>
                        </div>
                        {password.confirmPassword.length > 0 && (
                            <div className='mt-2'>
                                <div className={`text-xs flex items-center gap-2 ${password.newPassword === password.confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
                                    <BiCheckCircle />
                                    <span>{password.newPassword === password.confirmPassword ? 'Passwords match' : 'Passwords do not match'}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Reset Button */}
                    <button 
                        type="submit"
                        disabled={resetLoading}
                        className={`w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] hover:shadow-lg hover:shadow-[#1cc2e7]/50 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none flex items-center justify-center gap-3`}>
                        {resetLoading ? (
                            <>
                                <PulseLoader color="white" size={10} />
                                <span>Resetting Password...</span>
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </motion.form>

                {/* Footer */}
                <motion.div 
                    variants={fadeIn('up', 0.7)}
                    initial='hidden'
                    animate='show'
                    className={`mt-8 pt-6 border-t ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'}`}>
                    <p className='text-center text-[#94a9c9] text-sm'>
                        Remember your password? <button onClick={() => navigate('/login')} className='text-[#1cc2e7] hover:text-[#0bccd3] font-medium'>Login</button>
                    </p>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default ResetPassword
