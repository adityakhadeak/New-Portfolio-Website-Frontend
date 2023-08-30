import React, { } from 'react'
import HeroSection from '../Components/HeroSection'
import AboutSection from '../Components/AboutSection'
import EduSection from '../Components/EduSection'
import ExpSection from '../Components/ExpSection'
import ScrollToTopOnReload from '../CustomHooks/ScrollToTopOnReload'
import Skill from '../Components/Skill'
const Home = () => {
 ScrollToTopOnReload()  
  return (
    <div className='sec-bg-color'>
      <HeroSection/>
      <AboutSection/>
      <EduSection/>
      <ExpSection/>\
      <Skill/>
    </div>
  )
}

export default Home
