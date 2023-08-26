import React from 'react'
import HeroSection from '../Components/HeroSection'
import AboutSection from '../Components/AboutSection'
import EduSection from '../Components/EduSection'
const Home = () => {
  return (
    <div className='sec-bg-color'>
      <HeroSection/>
      <AboutSection/>
      <EduSection/>
    </div>
  )
}

export default Home
