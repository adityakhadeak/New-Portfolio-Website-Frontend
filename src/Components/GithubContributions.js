import React, { useContext, useState } from 'react'
import GitHubCalendar from 'react-github-calendar';
import { motion } from 'framer-motion'
import { fadeIn } from '../Variants'
import ThemeContext from '../Context/ThemeContext';
const GithubContributions = () => {
    const {mode}=useContext(ThemeContext)
    const currentYear = new Date().getFullYear();
    const [selectedYear, setselectedYear] = useState(currentYear)
    const customTheme = {
        light: ['#4b6e8b', '#42A5F5', '#1E88E5', '#1976D2', '#0D47A1'],
        dark: ['#607D8B', '#42A5F5', '#1E88E5', '#1976D2', '#0D47A1'],
    };
    const years=[]
    for(let i=2023;i<=currentYear;i++)
    {
        years.push(i);
    }
    const selectYear=(year)=>{
        setselectedYear(year)
    }
    return (
        <motion.div
        variants={fadeIn('up', 0.3)}
        initial='hidden'
        animate='show'
        className='md:block hidden'
        >
            <h2 className='text-[#94a9c9] text-center text-[15px] md:text-[20px] font-mono py-4  my-7 mx-2'>GitHub Contribution Graph</h2>

            <div className={`flex justify-center  ${mode==='dark'?'text-white':'text-[#344161]'} items-center px-10`}>
                <GitHubCalendar year={selectedYear} username="adityakhadeak" colorScheme={`${mode==='dark'?'dark':'light'}`}  theme={customTheme} />
            </div>
            <div className={`flex flex-row justify-center items-center  ${mode==='dark'?'text-white':'text-[#344161]'} `}>
                {years.map((year)=>(
                    <div key={year}  onClick={()=>selectYear(year)} className={`py-2 px-3 mx-1 cursor-pointer ${year===selectedYear?'hover:bg-[#2178ead4]':'hover:bg-[#172941d4]'}  ${year===selectedYear?'bg-[#2178ead4]':'bg-transparent'} rounded-sm  `}>
                        {year}
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default GithubContributions
