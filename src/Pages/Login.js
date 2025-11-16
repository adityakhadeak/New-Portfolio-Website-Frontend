import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import { motion } from 'framer-motion'
import { fadeIn } from '../Variants'
import { BiUserCircle, BiShow, BiHide } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { BASE_URL } from '../helper';
import AlertContext from '../Context/AlertContext';
import { useNavigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import Loader from '../Components/Loader';

const Login = () => {
  const navigate = useNavigate()
  const { mode } = useContext(ThemeContext)
  const { showAlert } = useContext(AlertContext)
  const [pageLoading, setPageLoading] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)
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
      setForgotLoading(true)
      const response = await fetch(`${BASE_URL}/api/user/forgot-password`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      })
      const res = await response.json()
      if (res.success) {
        showAlert('success', res.message)
      } else {
        showAlert('error', res.message)
      }
    } catch (error) {
      showAlert("error", error.message)
    } finally {
      setForgotLoading(false)
    }
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()
    if ((credentials.username === '' || credentials.password === "")) {
      showAlert("warning", "Please fill all fields")
    } else {
      try {
        setLoginLoading(true)
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
          showAlert('success', "Logged In Successfully")
          navigate('/dashboard/adminprofile')
          setCredentials({ username: "", password: "" })
        } else {
          showAlert('error', res.message)
        }
      } catch (error) {
        showAlert('error', 'An error occurred during login')
      } finally {
        setLoginLoading(false)
      }
    }
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
            <BiUserCircle className='text-white text-5xl' />
          </motion.div>
          <motion.h1 
            variants={fadeIn('up', 0.4)}
            initial='hidden'
            animate='show'
            className={`text-3xl md:text-4xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-[#131c31]'}`}>
            Welcome Back
          </motion.h1>
          <motion.p 
            variants={fadeIn('up', 0.5)}
            initial='hidden'
            animate='show'
            className='text-[#94a9c9] text-sm'>
            Sign in to access your dashboard
          </motion.p>
        </div>

        {/* Form */}
        <motion.form 
          variants={fadeIn('up', 0.6)}
          initial='hidden'
          animate='show'
          onSubmit={handleLogin}
          className='space-y-6'>
          
          {/* Username Field */}
          <div>
            <label className='block text-[#94a9c9] text-sm font-medium mb-2'>Username</label>
            <div className={`relative group`}>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-[#94a9c9] group-focus-within:text-[#1cc2e7] transition-colors'>
                <BiUserCircle className='text-2xl' />
              </span>
              <input 
                onChange={handleOnChange} 
                type="text" 
                name='username' 
                value={credentials.username} 
                autoComplete='username' 
                className={`w-full pl-14 pr-4 py-4 rounded-xl border ${mode === 'dark' ? 'bg-[#0f1824] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-[#f8fafc] border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20 transition-all`} 
                placeholder='Enter your username' 
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className='block text-[#94a9c9] text-sm font-medium mb-2'>Password</label>
            <div className={`relative group`}>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-[#94a9c9] group-focus-within:text-[#1cc2e7] transition-colors'>
                <RiLockPasswordLine className='text-2xl' />
              </span>
              <input 
                onChange={handleOnChange} 
                type={showPass ? 'text' : 'password'} 
                name='password' 
                autoComplete="current-password" 
                value={credentials.password} 
                className={`w-full pl-14 pr-14 py-4 rounded-xl border ${mode === 'dark' ? 'bg-[#0f1824] border-[#222f43] focus:border-[#1cc2e7]' : 'bg-[#f8fafc] border-[#c2d4ee] focus:border-[#1cc2e7]'} text-[#94a9c9] placeholder:text-[#94a9c9]/50 focus:outline-none focus:ring-2 focus:ring-[#1cc2e7]/20 transition-all`} 
                placeholder='Enter your password' 
              />
              <button
                type="button"
                onClick={handleShowPass}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-[#94a9c9] hover:text-[#1cc2e7] transition-colors'>
                {showPass ? <BiHide className='text-2xl' /> : <BiShow className='text-2xl' />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className='text-right'>
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={forgotLoading}
              className='text-[#1cc2e7] hover:text-[#0bccd3] text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2'>
              {forgotLoading ? (
                <>
                  <PulseLoader color="#1cc2e7" size={6} />
                  <span>Sending...</span>
                </>
              ) : (
                'Forgot Password?'
              )}
            </button>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            disabled={loginLoading}
            className={`w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#1cc2e7] to-[#0bccd3] hover:shadow-lg hover:shadow-[#1cc2e7]/50 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none flex items-center justify-center gap-3`}>
            {loginLoading ? (
              <>
                <PulseLoader color="white" size={10} />
                <span>Logging in...</span>
              </>
            ) : (
              'Login'
            )}
          </button>
        </motion.form>

        {/* Footer */}
        <motion.div 
          variants={fadeIn('up', 0.7)}
          initial='hidden'
          animate='show'
          className='mt-8 pt-6 border-t ${mode === "dark" ? "border-[#222f43]" : "border-[#c2d4ee]"}'>
          <p className='text-center text-[#94a9c9] text-sm'>
            Protected by industry-standard encryption
          </p>
        </motion.div>
      </motion.div>
      
      {pageLoading && <Loader loading={pageLoading} />}
    </section>
  )
}

export default Login
