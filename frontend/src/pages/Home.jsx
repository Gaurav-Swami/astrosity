import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Video from "../components/LandingPage/Video";
import HomeNavbar from "../components/LandingPage/HomeNavbar";
import Planets from "../components/LandingPage/Planets";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/blogs");
      setBlogs(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const setDate = (createdAt) => {
    const blogDate = new Date(createdAt);
    const options = { year: "numeric", month: "short", day: "numeric" };
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
        <div className="flex  flex-col items-center justify-center ">
          <div className="flex justify-center flex-col items-center mt-4">
            <h2 className="text-4xl font-bold text-lightPrimaryText text-center dark:text-white py-8">
              Explore Our Blogs
            </h2>
            <div className="grid grid-cols-2 gap-5 justify-items-center">
              {blogs.map((blog) => (
                <Link key={blog._id} to={`/blogs/${blog._id}`}>
                  <div className="flex flex-col items-center gap-x-4  p-1 m-2 w-xl cursor-pointer hover:scale-105 transition-all">
                    <img
                      className="w-[454px] h-[350px] object-cover rounded-t-3xl"
                      src={blog.image}
                      alt=""
                    />
                    <div className="py-8 px-9 w-[454px] rounded-b-3xl  h-[313px]  flex flex-col justify-between border-2  border-t-0 dark:border-gray-900">
                      <div className="flex-col">
                        <p className="  dark:text-secondaryText text-lightSecondaryText text-sm mb-2">
                          {setDate(blog.createdAt)}
                        </p>
                        <span className="dark:text-primaryText  text-2xl line-clamp-2">
                          {blog.title}
                        </span>
                        <div
                          className="dark:text-secondaryText text-lightSecondaryText line-clamp-3 mt-3"
                          dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Planets />
        </div>
      )}
    </div>
  );
}

export default Home;
