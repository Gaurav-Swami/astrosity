import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { displayMsg } from "../assets/Pop";

import { FaUserCircle } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";

const Blog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.user._id);

  const setDate = (createdAt) => {
    const blogDate = new Date(createdAt);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return blogDate.toLocaleDateString("en-US", options).replace(",", "");
  };

  const onSubmit = async (data) => {
    data.byUser = userId;
    const url = `http://localhost:3000/blogs/${blog._id}/comments`;
    try {
      const response = await axios.post(url, data);
      const { success, message } = response.data;
      if (success) {
        setComments((comments) => [...comments, data]);
        console.log("Blog created");
        console.log("Message:", message);
        displayMsg(message, 1);
        reset();
      }
    } catch (err) {
      if (err.response) {
        console.log(err, "...");
        displayMsg(err.response.data.message || "An error occurred", 0);
      } else if (err.request) {
        displayMsg("No response from the server", message, 0);
      } else {
        displayMsg("An error occurred", 0);
      }
    }
  };

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/blogs/${id}`);
      console.log(res.data.data);
      setBlog(res.data.data);
      setComments(res.data.data.comments);
      console.log(blog);
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
          <div className="w-[940px] mb-20 flex flex-col  px-24 border border-gray-300 dark:border-secondaryBg py-10">
            <form
              className="flex flex-col  gap-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <span className="dark:text-primaryText text-xl ">Comments</span>
              <hr className="border-t dark:border-secondaryBg dark:border-t border-gray-300" />
              <textarea
                rows={4}
                type="text"
                placeholder="Write a comment..."
                {...register("content", {
                  required: "Comment is required",
                  minLength: {
                    value: 1,
                    message: "comment must be at least 1 characters long",
                  },
                  maxLength: {
                    value: 500,
                    message: "The comment must be only 500 characters long",
                  },
                })}
                className="dark:bg-black p-4 border border-gray-300 dark:border-secondaryBg mt-4 dark:text-primaryText"
              ></textarea>
              <button className=" hover:bg-accent hover:text-black dark:border-accent ml-auto px-4 py-[6px] border border-accent text-accent transition duration-200 ">
                Comment
              </button>
            </form>
            <div className="">
              {comments.map((comment) => (
                <div
                  className="dark:text-primaryText flex gap-x-2 mb-6 text-lightSecondaryText"
                  key={comment._id}
                >
                  <div>
                    <FaUserCircle className="text-4xl" />
                  </div>
                  <div className="">
                    <div className="text-xs ">someone</div>
                    <div className="text-xs">{setDate(comment.createdAt)} </div>
                    <p className="my-4 whitespace-pre-wrap">
                      {comment.content}
                    </p>
                    <div className="text-base ">
                      <button className=" mr-4 ">
                        <CiHeart className=" inline text-2xl" /> Like
                      </button>
                      <button className=" ">
                        <PiShareFatLight className=" inline text-2xl   " /> Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
