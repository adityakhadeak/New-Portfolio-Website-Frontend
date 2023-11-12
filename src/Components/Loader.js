import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PulseLoader from "react-spinners/PulseLoader";


const Loader = (props) => {
const {loading}=props
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, duration: 0.4 }}
                className=' flex justify-center items-center fixed z-[1000] top-0 left-0 w-[100%] h-[100vh] backdrop-blur-sm bg-[#131c316f]'>
                < PulseLoader
                    color={"#0bccd3"}
                    loading={loading}
                    speedMultiplier={1}
                    cssOverride={{ margin: "10px 0" }}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </motion.div>
        </AnimatePresence>


    )
}

export default Loader
