import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'

import { BiUserCircle, BiShow, BiHide } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { BASE_URL } from '../helper';
import AlertContext from '../Context/AlertContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
const Login = () => {
  const navigate = useNavigate()

  const { mode } = useContext(ThemeContext)
  const { showAlert } = useContext(AlertContext)
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [showPass, setShowPass] = useState(false)
  document.title = "Aditya's Portfolio | Admin Login"
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (token) {
      navigate("/dashboard/adminprofile")
    }
    // eslint-disable-next-line
  }, [])
  const handleShowPass = () => {
    setShowPass(!showPass)
  }
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleForgotPassword = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/api/user/forgot-password`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      })
      const res = await response.json()
      console.log(res)
      if (res.success) {
        setLoading(false)
        showAlert('success', res.message)
      }
      else {
        setLoading(false)
        showAlert('error', res.message)
      }
    } catch (error) {
      setLoading(false)
      showAlert("error", error.message)
    } finally {
      setLoading(false)
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    if ((credentials.username === '' || credentials.password === "")) {
      showAlert("warning", "Please fill all fields")
    }
    else {
      const response = await fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
      });
      const res = await response.json()
      if (res.success) {
        localStorage.setItem('token', res.authtoken)
        showAlert('success', "Logged In  Successfully")
        navigate('/dashboard/adminprofile')
        setCredentials({ username: "", password: "" })
      }
      else
        showAlert('error', res.message)
    }
  }
  return (
    <section className='h-[80vh] flex justify-center items-center'>
      <div className={` ${mode === 'dark' ? 'bg-[#131c31]' : 'bg-[#e8edf5]'} p-3 flex flex-col justify-center items-center border  ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-2xl`}>
        <h1 className='text-[20px] md:text-[25px] font-[Montserrat] font-semibold text-[#94a9c9] w-[-webkit-fill-available] md:w-fit mx-2' >Login into your account</h1>
        <form className='flex flex-col justify-center items-center w-[100%]'>
          <div className={` relative h-[60px] p-2 px-4 rounded my-8 md:w-[350px] w-[85%] flex flex-col justify-start items-start `}>
            <span className='text-lg w-[45px] text-[#94a9c9]'> Username</span>
            <div className={` relative border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-[10px] w-full `}>
              <span className='absolute left-2 top-[11px]'>< BiUserCircle className='text-[#94a9c9] text-2xl' /></span>
              <input onChange={e => handleOnChange(e)} type="text" name='username' value={credentials.username} autoComplete='username' className={`text-[#94a9c9]  px-[3rem]  ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent  placeholder:text-[#94a9c9] p-3  md:w-full`} placeholder='Enter your username' />
            </div>
          </div>
          <div className={`  relative h-[60px] p-2 px-4 rounded my-8 md:w-[350px] w-[85%] flex flex-col justify-start items-start  `}>
            <span className='text-lg w-[45px] text-[#94a9c9]'>Password</span>
            <div className={` relative border ${mode === 'dark' ? 'border-[#222f43]' : 'border-[#c2d4ee]'} rounded-[10px] w-full `}>
              <span className='absolute left-2 top-[11px]'>< RiLockPasswordLine className='text-[#94a9c9] text-2xl' /></span>
              <input onChange={e => handleOnChange(e)} type={`${showPass ? 'text' : 'password'}`} name='password' autoComplete="current-password" value={credentials.password} className={` text-[#94a9c9] px-[3rem]   ${mode === 'dark' ? 'active-input' : 'active-input-light'} bg-transparent placeholder:text-[#94a9c9] p-3  md:w-full`} placeholder='Enter your password' />
              {showPass && <span onClick={handleShowPass} className='absolute transition-all duration-500 right-2 top-[11px]'>< BiHide className='text-[#94a9c9] text-2xl' /></span>}
              {!showPass && <span onClick={handleShowPass} className='absolute transition-all duration-500 right-2 top-[11px]'>< BiShow className='text-[#94a9c9] text-2xl' /></span>}
            </div>
          </div>
          <div onClick={handleForgotPassword} className='text-sm w-[86%] cursor-pointer  my-4 text-left text-[#94a9c9]'>
            Forgot Password
          </div>
          <div className='my-8'>
            <button onClick={(e) => handleLogin(e)} className={`p-2 w-[90px] text-base  ${mode === 'dark' ? 'hover:bg-[#222f43]' : 'hover:bg-[#e8edf5]'} text-[#94a9c9]  border border-cyan-400`}>Login</button>
          </div>

        </form>
      </div>
      {loading && <Loader loading={loading} />
      }
    </section>
  )
}

export default Login
