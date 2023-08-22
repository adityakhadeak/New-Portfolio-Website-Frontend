import React from 'react';
import '../Styles/SideLinks.css';

import { BsGithub, BsLinkedin, BsInstagram, BsTwitter } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";

const SideLinks = () => {
  const socialAcc = [
    { "acc": "Github", "link": "https://www.linkedin.com/in/aditya-khade-a14bb0219/", "icon": <BsGithub /> },
    { "acc": "Linkedin", "link": "https://www.linkedin.com/in/aditya-khade-a14bb0219/", "icon": <BsLinkedin /> },
    { "acc": "Leetcode", "link": "https://www.linkedin.com/in/aditya-khade-a14bb0219/", "icon": <SiLeetcode /> },
    { "acc": "Insta", "link": "https://www.linkedin.com/in/aditya-khade-a14bb0219/", "icon": <BsInstagram /> }
  ];

  return (
    <>
      <div className='leftLinks z-[3] fixed left-[40px] bottom-0 '>
        <ul className='flex justify-center flex-col p-0 m-0 list-none items-center'>
          {
            socialAcc.map((link, index) => (
              <a key={index} href={link.link} title={link.acc} target="_blank" rel="noopener noreferrer" className='text-3xl p-[10px] relative deco hover:-translate-y-[3px] transition-all duration-[0.25s] cursor-pointer text-[#0dace4]'>
                {link.icon}
              </a>
            ))
          }
        </ul>
      </div>
      <div className='rightLinks z-[3] text-3xl  font-mono fixed right-[40px] bottom-0 '>
        <div className='rightLinksCon flex justify-center items-center'>
          <a href="mailto:khadeaditya1@gmail.com" className='text-3xl p-[5px] hover:-translate-y-[3px] @apply gradient-text relative duration-[0.25s] cursor-pointer mb-[12px]'>khadeaditya1@gmail.com</a>
        </div>
      </div>
    </>
  );
}

export default SideLinks;
