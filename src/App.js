import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Preloader from './Components/Preloader';
import Home from './Components/Home';
function App() {
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    },3000);
  }, [])
  return (
    <Router>
      {loader ?
        <Preloader /> :
        <>
          <Navbar />
          <Home/>
        </>

      }
    </Router>
  );
}

export default App;
