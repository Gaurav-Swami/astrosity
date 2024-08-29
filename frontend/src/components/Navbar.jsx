import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../features/darkmode/darkMode";
import { displayMsg } from "../assets/Pop";
import { signOut } from "../features/auth/authSlice";
import { MdOutlineDarkMode } from "react-icons/md";
import { HiLightBulb } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const onSignOut = () => {
    displayMsg("Logged Out", 1);
    dispatch(signOut());
    console.log("logged Out");
  };
  if (location.pathname === "/") {
    return null; // Don't render the navbar
  }

  return (
    <nav className="dark:bg-black bg-white  px-20  py-6 fixed top-0 left-0 right-0 z-10 shadow-md ]">
      <div className="container mx-auto flex items-center justify-between ">
        <div
          className="text-black  dark:text-white text-4xl font-bold cursor-pointer"
          onClick={() => dispatch(toggleDarkMode())}
        >
          ASTROSITY
        </div>
        <div className="flex font-normal space-x-8 text-center  items-center text-lg">
          <Link
            to="/"
            className={`hover:text-accent ${
              isActive("/") ? "text-accent " : "dark:text-white "
            }`}
          >
            HOME
          </Link>
          <Link
            to="/blogs"
            className={`hover:text-accent ${
              isActive("/blogs") ? "text-accent " : "dark:text-white "
            }`}
          >
            BLOGS
          </Link>
          <Link to="/aboutus"
            className={`hover:text-accent ${
              isActive("/about") ? "text-accent " : "dark:text-white "
            }`}
          >
            ABOUT US
          </Link>
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
          {isAuthenticated ? (
            <button className={"dark:text-white "} onClick={onSignOut}>
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
              className={`dark:text-white text-4xl transition hover:scale-125`}
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
