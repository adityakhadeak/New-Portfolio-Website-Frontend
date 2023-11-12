import React, { useState } from 'react'
import ThemeContext from '../../Context/ThemeContext'
const Modes = (props) => {
    const [mode, setMode] = useState('dark')

    const changeMode=()=>{
        if(mode==='dark')
        setMode('light')
      else
      setMode('dark')
    }
  return (
    <ThemeContext.Provider value={{mode ,changeMode}}>
        {props.children}
    </ThemeContext.Provider>
  )
}

export default Modes
