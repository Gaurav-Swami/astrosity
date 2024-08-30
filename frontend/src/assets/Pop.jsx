import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

import React from "react";
import { ToastContainer, toast, Flip } from "react-toastify";

const Msg = ({ closeToast, toastProps, msg, check }) => (
  <div className="flex items-center gap-2">
    {check ? (
      <FaCheckCircle className="text-green-600 text-lg" />
    ) : (
      <FaTimesCircle className="text-red-600 text-lg" />
    )}
    {msg}
  </div>
);
export const displayMsg = (msg, check) => {
 

  toast(<Msg msg={msg} check={check} />, {
    position: "bottom-right",
    autoClose: 3500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Flip,
  });
};
export const Pop = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <div>
      <ToastContainer theme={isDarkMode?'dark':'light'}/>
    </div>
  );
};
