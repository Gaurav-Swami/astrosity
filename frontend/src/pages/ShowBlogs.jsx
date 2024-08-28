import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function ShowBlogs() {
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
        <div className="flex justify-center flex-col items-center mt-28">
          <div className="grid grid-cols-2 gap-5 justify-items-center">
            {blogs.map((blog) => (
              <Link key={blog._id} to={`/blogs/${blog._id}`}>
                <div className="flex flex-col items-center gap-x-4  p-1 m-2 w-xl cursor-pointer">
                  <img
                    className="w-[454px] h-[350px] object-cover"
                    src={blog.image}
                    alt=""
                  />
                  <div className="py-8 px-9 w-[454px]  h-[313px]  flex flex-col justify-between border border-t-0 dark:border-gray-700">
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
      )}
    </>
  );
}

export default ShowBlogs;
