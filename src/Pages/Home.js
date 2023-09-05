import React, { } from 'react'
import HeroSection from '../Components/HeroSection'
import AboutSection from '../Components/AboutSection'
import EduSection from '../Components/EduSection'
import ExpSection from '../Components/ExpSection'
import ScrollToTopOnReload from '../CustomHooks/ScrollToTopOnReload'
import Skill from '../Components/Skill'
import Projects from '../Components/Projects'
const Home = () => {
 ScrollToTopOnReload()  
  return (
    <div className='sec-bg-color'>
      <HeroSection/>
      <AboutSection/>
      <EduSection/>
      <ExpSection/>
      <Skill/>
      <Projects/>
    </div>
  )
}

export default Home
