import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

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
        <div className="flex justify-center mt-16">
          <div className="flex-col flex w-[550px] lg:w-[990px] gap-y-2 lg:gap-y-5 rounded">
            {blogs.map((blog) => (
              <Link key={blog._id} to={`/blogs/${blog._id}`}>
                <div className="flex flex-col lg:flex-row items-center lg:gap-4 gap-2 p-1 m-2 w-xl cursor-pointer">
                  <img
                    className="lg:w-[470px] w-[550px] h-[300px] lg:h-[350px] object-cover"
                    src={blog.image}
                    alt=""
                  />
                  <div className="py-5 lg:py-8 lg:px-9 flex-col flex-1 lg:w-[480px] w-full h-[355px]">
                    <p className="  dark:text-secondaryText text-lightSecondaryText text-sm lg:mb-6 mb-4">
                      {setDate(blog.createdAt)}
                    </p>
                    <span className="dark:text-primaryText  text-2xl">
                      {blog.title}
                    </span>
                    <div
                      className="dark:text-secondaryText text-lightSecondaryText line-clamp-3 mt-2 lg:mt-4"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                    <hr className="border-t dark:border-secondaryBg border-gray-300 my-6 lg:my-10" />
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

export default Home;
