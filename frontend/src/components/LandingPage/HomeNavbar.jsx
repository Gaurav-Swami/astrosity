import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
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
  const [openDrawer, setOpenDrawer] = useState(false);
  const onSignOut = () => {
    displayMsg("Logged Out", 1);
    dispatch(signOut());
    console.log("logged Out");
  };

  useEffect(() => {
    setOpenDrawer(false);
  }, [location.pathname]);

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

  return (
    <nav
      className={`dark:bg-black bg-white  shadow-md md:px-10  px-4 sm:px-20 py-3 sm:py-6 fixed top-0 left-0 right-0 z-20 transition-transform ${
        showNavbar ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="container mx-auto  md:flex md:items-center justify-center md:justify-between">
        <div className="flex justify-between items-center">
          <span className="    dark:text-white text-3xl md:text-4xl font-bold cursor-pointer">
            ASTROSITY
          </span>
          <span
            className="md:invisible cursor-pointer "
            onClick={() => {
              setOpenDrawer((prevVal) => !prevVal);
            }}
          >
            <GiHamburgerMenu className="text-3xl" />
          </span>
        </div>
        <div
          className={` font-normal md:static absolute ${
            openDrawer ? "left-0" : "left-[-1000px]"
          }  transition-all  md:text-center text-lg bg-white md:w-auto w-full top-[60px] sm:top-[84px]`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 md:items-center gap-y-3 px-2   py-2">
            <li>
              <Link
                to="/"
                className={`hover:text-accent ${
                  isActive("/") ? "text-accent " : "dark:text-white "
                }`}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className={`hover:text-accent ${
                  isActive("/blogs") ? "text-accent " : "dark:text-white "
                }`}
              >
                BLOGS
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className={`hover:text-accent ${
                  isActive("/about") ? "text-accent " : "dark:text-white "
                }`}
              >
                ABOUT US
              </Link>
            </li>
            <li>
              <Link
                to="/blogs/create"
                className={`hover:text-accent ${
                  isActive("/blogs/create")
                    ? "text-accent "
                    : "dark:text-white "
                }`}
              >
                WRITE
              </Link>
            </li>

            {isAuthenticated ? (
              <li>
                <button className={"dark:text-white "} onClick={onSignOut}>
                  SIGN OUT
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/signin"
                  className={`hover:text-accent ${
                    isActive("/signin") ? "text-accent " : "dark:text-white"
                  }`}
                >
                  SIGN IN
                </Link>
              </li>
            )}

            {isAuthenticated && (
              <li>
                <Link
                  to={`/profile/${user._id}`}
                  className={`dark:text-white text-4xl transition hover:scale-125`}
                >
                  <FaUserCircle />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
