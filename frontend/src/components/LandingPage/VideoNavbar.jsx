import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../features/darkmode/darkMode";
import { displayMsg } from "../../assets/Pop";
import { signOut } from "../../features/auth/authSlice";
import { MdOutlineDarkMode } from "react-icons/md";
import { HiLightBulb } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

function VideoNavbar() {
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

  return (
    <nav className="bg-transparent px-20 py-6 top-0 text-white relative left-0 z-10 w-[1524px]">
      <div className="container mx-auto flex items-center justify-between ">
        <div className="   text-white text-4xl font-bold cursor-pointer">ASTROSITY</div>
        <div className="flex text-lg font-normal space-x-8 text-center  items-center text-primaryText">
          <Link to="/" className={`hover:text-accent `}>
            HOME
          </Link>
          <Link to="/blogs" className={`hover:text-accent  "55555`}>
            BLOGS
          </Link>
          <button className={`hover:text-accent  `}>ABOUT US</button>
          <Link to="/blogs/create" className={`hover:text-accent  }`}>
            WRITE
          </Link>
          {isAuthenticated ? (
            <button className={"hover:text-accent   "} onClick={onSignOut}>
              SIGN OUT
            </button>
          ) : (
            <Link to="/signin" className={`hover:text-accent `}>
              SIGN IN
            </Link>
          )}

          {isAuthenticated && (
            <Link
              to={`/profile/${user._id}`}
              className={` text-4xl transition hover:scale-125`}
            >
              <FaUserCircle />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default VideoNavbar;
