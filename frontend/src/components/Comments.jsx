import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { displayMsg } from "../assets/Pop";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Comments = ({ blog }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const userId = useSelector((state) => state.auth.user?._id);
  const username = useSelector((state) => state.auth.user?.name);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(blog.comments);
  }, [blog]);

  const setDate = (createdAt) => {
    const commentDate = new Date(createdAt);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return commentDate.toLocaleDateString("en-US", options).replace(",", "");
  };

  const onSubmit = async (data) => {
    if (!userId) {
      displayMsg("Please Sign In", 0);
      navigate("/signin");
      return;
    }
    data.byUser = userId;
    const url = `http://localhost:3000/blogs/${blog._id}/comments`;
    try {
      const response = await axios.post(url, data);
      const { success, message } = response.data;
      if (success) {
        const newComment = {
          ...data,
          byUser: {
            _id: userId,
            name: username,
          },
          createdAt: new Date().toISOString(),
        };

        setComments((comments) => [...comments, newComment]);
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
  return (
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
              <div className="text-sm ">{comment.byUser.name}</div>
              <div className="text-xs">{setDate(comment.createdAt)} </div>
              <p className="my-4 whitespace-pre-wrap">{comment.content}</p>
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
  );
};

export default Comments;
