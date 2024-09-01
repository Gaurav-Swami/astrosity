import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Video from "../components/LandingPage/Video";
import HomeNavbar from "../components/LandingPage/HomeNavbar";
import Planets from "../components/LandingPage/Planets";
import { FaUserCircle } from "react-icons/fa";
import scrollToTop from "../hooks/scrollToTop";

function Home() {
  scrollToTop();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://astrosity-backend.onrender.com/blogs");
      setBlogs(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // year: "numeric",
  const setDate = (createdAt) => {
    const blogDate = new Date(createdAt);
    const options = { month: "short", day: "numeric" };
    return blogDate.toLocaleDateString("en-US", options).replace(",", "");
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="overflow-hidden mb-36">
      <HomeNavbar />
      <Video />
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex  flex-col items-center justify-center py-4">
          <div className="flex justify-center flex-col items-center mt-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-lightPrimaryText text-center dark:text-white py-8">
              Explore Our Blogs
            </h2>
            <div className="grid gird-cols-1 md:grid-cols-2 gap-5 justify-items-center">
              {blogs.map((blog) => (
                <Link key={blog._id} to={`/blogs/${blog._id}`}>
                  <div className="flex flex-col items-center gap-x-4  px-4 sm:p-1 sm:m-2 w-xl cursor-pointer sm:hover:scale-105 transition-all">
                    <img
                      className="w-[388px] sm:w-[454px] h-[300px] sm:h-[350px] object-cover rounded-t-3xl"
                      src={blog.image}
                      alt=""
                    />
                    <div className="p-4 sm:py-8 sm:px-9 w-[388px] sm:w-[454px] rounded-b-3xl  h-[250px]  flex flex-col justify-between border-2  border-t-0 dark:border-gray-900">
                      <div className="flex-col">
                        <div className=" flex dark:text-secondaryText text-lightSecondaryText items-center  mt-4">
                          <div className="inline mr-2">
                            <FaUserCircle className=" text-3xl text-lightPrimaryText dark:text-secondaryText" />
                          </div>
                          <div className="flex flex-col text-xs font-thin">
                            <div className="inline">{blog.byUser.name}</div>
                            <p className="  dark:text-secondaryText text-lightSecondaryText text-xs ">
                              {setDate(blog.createdAt)}
                            </p>
                          </div>
                        </div>
                        <span className="dark:text-primaryText text-xl   sm:text-2xl line-clamp-2 pt-4">
                          {blog.title}
                        </span>
                        <div
                          className="dark:text-secondaryText text-lightSecondaryText line-clamp-3 mt-3  text-sm sm:text-base"
                          dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* <Planets /> */}
        </div>
      )}
    </div>
  );
}

export default Home;
