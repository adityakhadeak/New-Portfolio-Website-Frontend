import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AlertContext from '../../Context/AlertContext';

const AlertFunction = (props) => {
  const showAlert = (type, message) => {
    // Call the appropriate toast function
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'info') {
      toast.info(message);
    } else if (type === 'warning') {
      toast.warn(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      // Default to info if the type is not recognized
      toast.info(message);
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertFunction;
