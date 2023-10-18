import { useContext, useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preloader from './Components/Preloader';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Skills from './Pages/Skills';
import About from './Pages/About';
import ThemeContext from './Context/ThemeContext';
import Projects from './Pages/Projects';
import Footer from './Components/Footer';
import NavFixed from './Components/NavFix/NavFixed';
import ManageSkill from './Components/Admin/ManageSkill';
import ManageProject from './Components/Admin/ManageProject';
function App() {
  const { mode } = useContext(ThemeContext)
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    if (mode === 'dark') {
      document.body.style.backgroundColor = '#0f172a'
      document.body.classList.remove('scrollbar-light');

      document.body.classList.add('scrollbar-dark');

      console.log(mode)
    }
    else {
      document.body.style.backgroundColor = '#f9fbff'
      document.body.classList.remove('scrollbar-dark');

      document.body.classList.add('scrollbar-light');

      console.log(mode)

    }
    setTimeout(() => {
      setLoader(false)
    }, 3000);

  }, [mode])
  return (
    <NavFixed>
      <Router>
        {loader ?
          <Preloader /> :
          <>
            <Navbar />
            <Routes>
              <Route element={<Home />} path='/' />
              <Route element={<About />} path='/about' />
              <Route element={<Skills />} path='/skills' />
              <Route element={<Contact />} path='/contact' />
              <Route element={<Projects />} path='/projects' />
              <Route element={<ManageSkill />} path='/manageskill' />
              <Route element={<ManageProject />} path='/manageproject' />
            </Routes>
              
            <Footer />

          </>

        }
      </Router>
    </NavFixed>
  );
}

export default App;
