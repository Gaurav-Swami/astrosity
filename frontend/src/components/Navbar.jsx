import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../features/darkmode/darkMode";
import { displayMsg, Pop } from "../assets/Pop";
import { signOut } from "../features/auth/authSlice";
import { MdOutlineDarkMode } from "react-icons/md";
import { HiLightBulb } from "react-icons/hi";
import { LuUserCircle2 } from "react-icons/lu";

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

  return (
    <nav className="dark:bg-primaryBg bg-lightPrimaryBg  px-20  py-4 fixed top-0 left-0 right-0 z-10 ">
      <div className="container mx-auto flex items-center justify-between ">
        <div className="text-black dark:text-primaryText  text-2xl font-bold">
          ASTROSITY
        </div>
        <div className="flex space-x-4 text-center  items-center">
          <button
            className={`hover:text-Accent text-xl dark:text-primaryText  transition hover:scale-125`}
            onClick={() => dispatch(toggleDarkMode())}
          >
            {isDarkMode ? <HiLightBulb /> : <MdOutlineDarkMode />}
          </button>

          <Link
            to="/"
            className={`hover:text-accent ${
              isActive("/") ? "text-accent " : "dark:text-primaryText "
            }`}
          >
            HOME
          </Link>
          <button
            className={`hover:text-accent dark:text-primaryText
              }`}
          >
            BLOGS
          </button>
          <button
            className={`hover:text-accent dark:text-primaryText
              }`}
          >
            ABOUT
          </button>
          <Link
            to="/blogs/create"
            className={`hover:text-accent dark:text-primaryText`}
          >
            CREATE
          </Link>
          {isAuthenticated ? (
            <button className={"dark:text-primaryText "} onClick={onSignOut}>
              SIGN OUT
            </button>
          ) : (
            <Link
              to="/signin"
              className={`hover:text-accent ${
                isActive("/signin") ? "text-accent " : "dark:text-primaryText"
              }`}
            >
              SIGNIN
            </Link>
          )}

          {isAuthenticated && (
            <Link
              to={`/profile/${user._id}`}
              className={`dark:text-primaryText text-2xl transition hover:scale-125`}
            >
              <LuUserCircle2 />
              
              
            </Link>
          )}
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
