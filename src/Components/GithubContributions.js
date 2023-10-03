import React from 'react'
import GitHubCalendar from 'react-github-calendar';

const GithubContributions = () => {
    const customTheme = {
        light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
        dark: ['#607D8B', '#42A5F5', '#1E88E5', '#1976D2', '#0D47A1'],
    };
    return (
        <div>
            <h2 className='text-[#94a9c9] text-center text-[15px] md:text-[20px] font-mono py-4  my-7 mx-2'>GitHub Contribution Graph</h2>

            <div className='flex justify-center text-white items-center px-10'>
                <GitHubCalendar username="adityakhadeak" colorScheme='dark' theme={customTheme} />
            </div>
        </div>
    )
}

export default GithubContributions
