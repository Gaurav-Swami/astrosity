import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/blogs/${id}`);
      console.log(res.data.data);
      setBlog(res.data.data);
      console.log(blog);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <>
      {" "}
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center w-full overflow-x-hidden h-full mt-16">
          <div className="max-w-[940px] flex-col gap-y-7 my-20 flex  px-24 border border-gray-300 dark:border-secondaryBg py-16">
            <p className="text-lightPrimaryText dark:text-primaryText text-4xl font-bold">
              {blog.title}
            </p>
            <img
              className=" w-full h-auto object-cover "
              src={blog.image}
              alt=""
            />

            <p className=" dark:text-primaryText text-xl">
              <div
                className="dark:text-primaryText text-black  mt-4"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </p>
          </div>
          <form className="w-[940px] mb-20 flex flex-col gap-y-4  px-24 border border-gray-300 dark:border-secondaryBg py-10">
            <span className="dark:text-primaryText text-xl ">Comments</span>
            <hr className="border-t dark:border-secondaryBg dark:border-t border-gray-300" />
            <textarea rows={4} type="text" placeholder="Write a comment..." className="dark:bg-black p-4 border border-gray-300 dark:border-secondaryBg mt-4 dark:text-primaryText"></textarea>
            <button className=" hover:bg-accent hover:text-black dark:border-accent ml-auto px-4 py-[6px] border border-accent text-accent transition duration-200 ">Comment</button>
          </form>

        </div>
      )}
    </>
  );
};

export default Blog;
