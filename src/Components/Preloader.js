import React from 'react'
import logo from '../images/logo.png'
const Preloader = () => {

    
    return (
        <div  className='w-screen h-screen absolute z-20 flex justify-center items-center bg-[#0f172a]'>
            <img   className="w-24 " src={logo} alt="" />
        </div>
    )
}

export default Preloader
