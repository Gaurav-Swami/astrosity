import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { displayMsg } from "../../assets/Pop";
import { signOut } from "../../features/auth/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

function VideoNavbar() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [openDrawer, setOpenDrawer] = useState(false);
  const isActive = (path) => location.pathname === path;
  const onSignOut = () => {
    displayMsg("Logged Out", 1);
    dispatch(signOut());
    console.log("logged Out");
  };

  return (
    <nav className="bg-transparent px-4 md:px-10 sm:px-20 py-4 sm:py-6 top-0 text-white relative left-0 z-20 ">
      <div className="container mx-auto md:flex md:items-center justify-center md:justify-between ">
        <div className="flex justify-between items-center">
          <span className="    text-white text-3xl md:text-4xl font-bold cursor-pointer">
            ASTROSITY
          </span>
          <span
            className="md:invisible cursor-pointer"
            onClick={() => {
              setOpenDrawer((prevVal) => !prevVal);
            }}
          >
           <GiHamburgerMenu className="text-xl"/>
          </span>
        </div>

        <div
          className={` font-normal md:static absolute z-10 ${
            openDrawer ? "right-0" : "right-[-600px]"
          } md:text-center text-lg transition-all md:w-auto w-full bg-black text-white md:text-white top-20`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 md:items-center gap-y-2 p-2">
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
                  className={`dark:text-white`}

                >
                  <span  className="md:invisible visible text-lg">PROFILE</span>
                  {/* <span className="invisible md:visible text-4xl"><FaUserCircle /></span> */}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default VideoNavbar;
