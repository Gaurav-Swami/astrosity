import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { PiHeartStraightLight, PiHeartStraightFill } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { displayMsg } from "../assets/Pop";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Base.js";

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
    const updatedComments = blog.comments.map((comment) => ({
      ...comment,
      liked: false,
    }));
    setComments(updatedComments);
  }, [blog]);

  const setDate = (createdAt) => {
    const commentDate = new Date(createdAt);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return commentDate.toLocaleDateString("en-US", options).replace(",", "");
  };

  const handleLike = async (commentId) => {
    console.log(commentId);

    const updatedComments = comments.map((comment) =>
      comment._id == commentId
        ? {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          }
        : comment
    );
    setComments(updatedComments);
    const updatedComment = updatedComments.find(
      (comment) => comment._id == commentId
    );

    const url = `${BASE_URL}/blogs/${blog._id}/comments/${commentId}/toggle-like`;
    try {
      const response = await axios.post(url, { liked: updatedComment.liked });
      const { success, message } = response.data;
      console.log(message);
    } catch (err) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    if (!userId) {
      displayMsg("Please Sign In", 0);
      navigate("/signin");
      return;
    }
    data.byUser = userId;
    const url = `${BASE_URL}/blogs/${blog._id}/comments`;
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
          liked: false,
          likes: 0,
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
        displayMsg("No response from the server", 0);
      } else {
        displayMsg("An error occurred", 0);
      }
    }
  };
  return (
    <div className="lg:w-[940px] w-full  mb-5 md:mb-20 flex flex-col px-4  sm:px-24 border border-gray-300 dark:border-secondaryBg py-4 sm:py-10">
      <form
        className="flex flex-col  gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="dark:text-primaryText text-lg sm:text-xl ">
          Comments
        </span>
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
              <FaUserCircle className="text-3xl sm:text-4xl " />
            </div>
            <div className="">
              <div className="text-sm ">{comment.byUser.name}</div>
              <div className="text-xs">{setDate(comment.createdAt)} </div>
              <p className="my-4 whitespace-pre-wrap text-sm sm:text-base ">
                {comment.content}
              </p>
              <div className="text-base flex justify-between w-36">
                <button
                  className=" mr-4 "
                  onClick={() => handleLike(comment._id)}
                >
                  {comment.liked ? (
                    <PiHeartStraightFill className="inline text-xl sm:text-2xl mr-2 text-red-600 hover:scale-125 transition-all" />
                  ) : (
                    <PiHeartStraightLight className="text-xl sm:text-2xl inline mr-2 hover:scale-125 transition-all" />
                  )}
                  {comment.likes}
                </button>
                <button className=" ">
                  <PiShareFatLight className=" inline font-thin text-xl sm:text-2x mr-2  hover:scale-125 transition-all" />
                  Share
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
