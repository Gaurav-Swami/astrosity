import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { BASE_URL } from "../utils/Base";

function ShowBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/blogs`);
      setBlogs(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const setDate = (createdAt) => {
    const blogDate = new Date(createdAt);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return blogDate.toLocaleDateString("en-US", options).replace(",", "");
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex  flex-col items-center justify-center mt-12 sm:mt-20 sm:py-0 py-4 px-2 sm:px-0">
          <div className="flex-col flex sm:w-[550px] w-full lg:w-[990px] gap-y-2 lg:gap-y-5 rounded">
            {blogs.map((blog) => (
              <Link key={blog._id} to={`/blogs/${blog._id}`}>
                <div className="flex flex-col lg:flex-row items-center lg:gap-4 gap-2 p-1 sm:m-2 w-xl cursor-pointer">
                  <img
                    className="lg:w-[470px] w-full sm:w-[550px] h-[250px] lg:h-[350px] object-cover"
                    src={blog.image}
                    alt=""
                  />
                  <div className="py-2 lg:py-8 lg:px-9 flex-col flex-1 lg:w-[480px]  w-full h-[355px]">
                    <p className="  dark:text-secondaryText text-lightSecondaryText text-sm lg:mb-6 mb-3 sm:mb-4">
                      {setDate(blog.createdAt)}
                    </p>
                    <span className="dark:text-primaryText text-xl sm:text-2xl">
                      {blog.title}
                    </span>
                    <div
                      className="dark:text-secondaryText text-lightSecondaryText line-clamp-3 mt-2 lg:mt-4 text-sm sm:text-base"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                    <hr className="border-t dark:border-gray-800 dark:border-t-[0.5px] border-gray-300 my-4 md:my-6 lg:my-10" />
                    <span className="hover:border-b hover:border-accent cursor-pointer text-accent ">
                      Read More
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ShowBlogs;
