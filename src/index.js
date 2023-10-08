import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Modes from './Components/Themes/Modes';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Modes>
      <App />
    </Modes>

  </React.StrictMode>
);


