import React from 'react';
import '../Styles/SideLinks.css';
import { motion } from 'framer-motion';
import { fadeIn } from '../Variants';
import github from '../images/Social/github.svg'
import linkedin from '../images/Social/linkedin.svg'
import leetcode from '../images/Social/leetcode.svg'
import insta from '../images/Social/insta.svg'
import twitter from '../images/Social/twitter.svg'
const SideLinks = () => {
  const socialAcc = [
    { "acc": "Github", "link": "https://github.com/adityakhadeak", "icon": github },
    { "acc": "Linkedin", "link": "https://www.linkedin.com/in/aditya-khade-a14bb0219/", "icon": linkedin },
    { "acc": "Leetcode", "link": "https://leetcode.com/adityakhadeak/", "icon": leetcode},
    { "acc": "Insta", "link": "https://www.instagram.com/aditya_khade_ak/", "icon": insta },
    {"acc": "Twitter", "link": "https://twitter.com/Aditya_khade_ak", "icon": twitter }
  ];

  return (
    <>
      <motion.div variants={fadeIn('up',1)}
                            initial='hidden'
                            whileInView={'show'}
                            viewport={{once:false,amount:0.7}} className='leftLinks z-[3] fixed left-[40px] bottom-0 '>
        <ul className='flex justify-center flex-col p-0 m-0 list-none items-center'>
          {
            socialAcc.map((link, index) => (
              <a key={index}  href={link.link} title={link.acc} target="_blank" rel="noopener noreferrer" className='  text-[25px] p-[10px] relative deco hover:-translate-y-[3px] transition-all duration-[0.25s] cursor-pointer text-[#0dace4]'>
                <img className='w-[25px]' src={link.icon} alt="" />
              </a>
            ))
          }
        </ul>
      </motion.div>
      <motion.div
      variants={fadeIn('up',1)}
      initial='hidden'
      whileInView={'show'}
      viewport={{once:false,amount:0.7}} className='rightLinks z-[3] text-[25px]  font-mono fixed right-[40px] bottom-0 '>
        <div className=' rightLinksCon flex justify-center items-center'>
          <a href="mailto:khadeaditya1@gmail.com" className='text-[25px] p-[5px] hover:-translate-y-[3px] @apply gradient-text relative duration-[0.25s] cursor-pointer mb-[12px]'>khadeaditya1@gmail.com</a>
        </div>
      </motion.div>
    </>
  );
}

export default SideLinks;
