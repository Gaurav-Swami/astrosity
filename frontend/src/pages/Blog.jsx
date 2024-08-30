import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, []);
  
  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/blogs/${id}`);
      console.log(res.data.data);
      setBlog(res.data.data);
      //setComments(res.data.data.comments);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, [id]);

  return (
    <>
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

            <div className=" dark:text-primaryText text-xl">
              <div
                className="dark:text-primaryText text-black  mt-4"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>

          <Comments blog={blog} />
        </div>
      )}
    </>
  );
};

export default Blog;
