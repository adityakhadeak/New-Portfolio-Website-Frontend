import React, { useContext } from 'react'
import HeroSection from '../Components/HeroSection'
import AboutSection from '../Components/AboutSection'
import EduSection from '../Components/EduSection'
import ExpSection from '../Components/ExpSection'
import ScrollToTopOnReload from '../CustomHooks/ScrollToTopOnReload'
import Skill from '../Components/Skill'
import Projects from '../Components/ProjectsSection'
import ThemeContext from '../Context/ThemeContext'
import ContactSection from '../Components/ContactSection'
import  AchievementSection  from '../Components/AchievementSection.js'

const Home = () => {
  const {mode}=useContext(ThemeContext)
  document.title="Aditya's Portfolio | Home"

 ScrollToTopOnReload()  
  return (
    <div className={`${mode==='dark'?'bg-[#0f172a]':'bg-[#f9fbff]'}`}>
      <HeroSection/>
      <AboutSection/>
      <EduSection/>
      <ExpSection/>
      <Skill/>
      <Projects/>
      {/* <AchievementSection/> */}
      <ContactSection/>
    </div>
  )
}

export default Home
