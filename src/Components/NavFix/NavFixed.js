import React, { useEffect, useState } from 'react'
import NavFixContext from '../../Context/NavFixContext'
const NavFixed = (props) => {

    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
       

        window.addEventListener('scroll', handleScroll);

        // Clean up by removing the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);

        };
        // eslint-disable-next-line
    }, []);

    const handleScroll = () => {
        // Define the scroll position or section offset where you want the change to occur
        const triggerPosition = 55; // Adjust this value as needed
        const scrollPosition = window.scrollY || window.pageYOffset;

        // Check if the scroll position is greater than or equal to the trigger position
        if (scrollPosition >= triggerPosition) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };

    return (
        <NavFixContext.Provider value={{isFixed}}>
            {props.children}
        </NavFixContext.Provider>
    )
}

export default NavFixed
