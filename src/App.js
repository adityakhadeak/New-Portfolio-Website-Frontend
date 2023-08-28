import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preloader from './Components/Preloader';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Skills from './Pages/Skills';
import About from './Pages/About';
import Projects from './Pages/Projects';
function App() {
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 3000);
     
  }, [])
  return (
    <Router>
      {loader ?
        <Preloader /> :
        <>
          <Navbar />
          <Routes>
            <Route  element={<Home />} path='/' />
            <Route  element={<About />} path='/about' />
            <Route  element={<Skills />} path='/skills' />
            <Route  element={<Contact />} path='/contact' />
            <Route  element={<Projects />} path='/projects' />
          </Routes>
        </>

      }
    </Router>
  );
}

export default App;
