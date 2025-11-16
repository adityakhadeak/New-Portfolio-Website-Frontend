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
import AlertFunction from './Components/Alert/AlertFunctions';
import Dashboard from './Pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login';
import FetchAll from './Components/FetchAll/FetchAll';
import ResetPassword from './Pages/ResetPassword';
import ScrollToTop from './Components/ScrollToTop';

function App() {
  const { mode } = useContext(ThemeContext)
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    if (mode === 'dark') {
      document.body.style.backgroundColor = '#0f172a'
      document.body.classList.remove('scrollbar-light');

      document.body.classList.add('scrollbar-dark');

    }
    else {
      document.body.style.backgroundColor = '#f9fbff'
      document.body.classList.remove('scrollbar-dark');

      document.body.classList.add('scrollbar-light');

    }
    setTimeout(() => {
      setLoader(false)
    }, 3000);

  }, [mode])
  return (
  
    <AlertFunction>
      <NavFixed>
        <FetchAll>
        <Router>
          <ScrollToTop />
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
                <Route element={<Dashboard />} path="/dashboard/*" />
                <Route element={<Login />} path="login" />
                <Route element={<ResetPassword />} path="/reset-password" />


              </Routes>

              <Footer />

            </>

          }
        </Router>
        </FetchAll>
      </NavFixed>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode}
      />
    </AlertFunction>
    

  );
}

export default App;
