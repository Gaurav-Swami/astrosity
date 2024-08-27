import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../features/darkmode/darkMode";
import { displayMsg } from "../../assets/Pop";
import { signOut } from "../../features/auth/authSlice";
import { MdOutlineDarkMode } from "react-icons/md";
import { HiLightBulb } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onSignOut = () => {
    displayMsg("Logged Out", 1);
    dispatch(signOut());
    console.log("logged Out");
  };

  return (
    <nav
      className={`dark:bg-black bg-white shadow-md  px-20 py-6 fixed top-0 left-0 right-0 z-10 transition-transform ${
        showNavbar ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className=" cursor-pointer text-black dark:text-white text-4xl font-bold" onClick={() => dispatch(toggleDarkMode())}>
          ASTROSITY
        </div>
        <div className="flex text-lg font-normal space-x-8 text-center items-center">
          

          <Link
            to="/"
            className={`hover:text-accent ${
              isActive("/") ? "text-accent " : "dark:text-white "
            }`}
          >
            HOME
          </Link>
          <Link to="/blogs" className="hover:text-accent dark:text-white">
            BLOGS
          </Link>
          <button className="hover:text-accent dark:text-white">
            ABOUT US
          </button>
          <Link to="/blogs/create" className="hover:text-accent dark:text-white">
            WRITE
          </Link>
          {isAuthenticated ? (
            <button className="dark:text-white" onClick={onSignOut}>
              SIGN OUT
            </button>
          ) : (
            <Link
              to="/signin"
              className={`hover:text-accent ${
                isActive("/signin") ? "text-accent " : "dark:text-white"
              }`}
            >
              SIGN IN
            </Link>
          )}

          {isAuthenticated && (
            <Link
              to={`/profile/${user._id}`}
              className="dark:text-white text-4xl transition hover:scale-125"
            >
              <FaUserCircle />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;