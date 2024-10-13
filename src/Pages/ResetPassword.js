import React, { useState, useContext, useEffect } from 'react'
import ThemeContext from '../Context/ThemeContext'
import AlertContext from '../Context/AlertContext'
import { BiShow, BiHide } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { BASE_URL } from '../helper';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
const ResetPassword = () => {
    const { mode } = useContext(ThemeContext)
    const { showAlert } = useContext(AlertContext)
    const [password, setPassword] = useState({ newPassword: "", confirmPassword: "" })
    const [showPass, setShowPass] = useState(false)
    const [userInfo, setUserInfo] = useState({ name: "", email: "" });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    document.title = "Reset Password | Aditya's Portfolio"

    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    useEffect(() => {
        try {
          const decoded = jwtDecode(token);
          setUserInfo({ name: decoded.user.name, email: decoded.user.email });
        } catch (error) {
          showAlert("Invalid token");
          console.error("Invalid token:", error);
        } finally {
          setLoading(false);
        }
      }, [token]);
      
    const handleOnChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        if (password.newPassword === "" || password.confirmPassword === "") {
            showAlert("warning", "Please fill all fields")
        } else if (password.newPassword !== password.confirmPassword) {
            showAlert("error", "Passwords do not match")
        } else {
            const response = await fetch(`${BASE_URL}/api/user/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(password)
            });
            const res = await response.json()
            if (res.success) {
                showAlert('success', "Password reset successfully")
                navigate('/login')
            } else {
                showAlert('error', res.message)
            }
        }
    }
    

    return (
        <section className='h-[80vh] flex justify-center items-center'>
            <div className={` ${mode === 'dark' ? 'bg-[#131c31]' : 'bg-[#e8edf5]'} p-3 flex flex-col justify-center items-center border  ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-2xl`}>
                <h1 className='text-[20px] md:text-[25px] font-[Montserrat] font-semibold text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2'>Reset your password</h1>
                <form className='flex flex-col justify-center items-center w-[100%]' onSubmit={handleResetPassword}>
                    <div className={`relative h-[60px] p-2 px-4 rounded my-8 md:w-[350px] w-[85%] flex flex-col justify-start items-start`}>
                        <span className='text-lg  text-[#94a9c9]'>New Password</span>
                        <div className={`relative border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-[10px] w-full`}>
                            <span className='absolute left-2 top-[11px]'><RiLockPasswordLine className='text-[#94a9c9] text-2xl' /></span>
                            <input onChange={handleOnChange} type={`${showPass ? 'text' : 'password'}`} name='newPassword' autoComplete="new-password" value={password.newPassword} className={`text-[#94a9c9] px-[3rem] ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3 md:w-full`} placeholder='Enter your new password' />
                            {showPass ? (
                                <span onClick={handleShowPass} className='absolute right-2 top-[11px]'><BiHide className='text-[#94a9c9] text-2xl' /></span>
                            ) : (
                                <span onClick={handleShowPass} className='absolute right-2 top-[11px]'><BiShow className='text-[#94a9c9] text-2xl' /></span>
                            )}
                        </div>
                    </div>

                    <div className={`relative h-[60px] p-2 px-4 rounded my-8 md:w-[350px] w-[85%] flex flex-col justify-start items-start`}>
                        <span className='text-lg  text-[#94a9c9]'>Confirm Password</span>
                        <div className={`relative border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-[10px] w-full`}>
                            <span className='absolute left-2 top-[11px]'><RiLockPasswordLine className='text-[#94a9c9] text-2xl' /></span>
                            <input onChange={handleOnChange} type={`${showPass ? 'text' : 'password'}`} name='confirmPassword' autoComplete="new-password" value={password.confirmPassword} className={`text-[#94a9c9] px-[3rem] ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3 md:w-full`} placeholder='Confirm your new password' />
                            {showPass ? (
                                <span onClick={handleShowPass} className='absolute right-2 top-[11px]'><BiHide className='text-[#94a9c9] text-2xl' /></span>
                            ) : (
                                <span onClick={handleShowPass} className='absolute right-2 top-[11px]'><BiShow className='text-[#94a9c9] text-2xl' /></span>
                            )}
                        </div>
                    </div>

                    <div className='my-8'>
                        <button type="submit" className={`p-2 w-[150px] text-base ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'} text-[#94a9c9] border border-cyan-400`}>Reset Password</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ResetPassword
