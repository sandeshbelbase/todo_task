import React, { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster = ({ message }) => {
  useEffect(() => {
    toast(<p style={{ fontSize: 16 }}>{message}</p>, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      type: "success",
    });
  }, [message]);

  return <ToastContainer />;
};
export default Toaster;
