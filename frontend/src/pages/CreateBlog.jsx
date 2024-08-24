import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { displayMsg } from "../assets/Pop";
import axios from "axios";
import TextEditor from "../components/TextEditor";

function CreateBlog() {
  const [content, setContent] = useState("Write something about Astronomy");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userId = useSelector((state) => state.auth.user._id);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (content) {
      try {
        if (!data.image) {
          data.image =
            "https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=600";
        }
        data.content = content;
        data.user_id = userId;
        const url = "http://localhost:3000/blogs";

        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { message, success } = response.data;
        //yahan se baaki hai
        if (success) {
          console.log("Blog created");
          console.log("Message:", message);
          displayMsg(message, 1);
          navigate("/");
        } else {
          displayMsg(message, 0);
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
    }
  };
  return (
    <div className="flex justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row gap-x-6 dark:border-secondaryBg dark:border-[0.5px] border  border-lightPrimaryText  p-6  dark:text-primaryText text-lightSecondaryText mt-20  w-[1150px]  h-fit"
      >
        <div>
          <label className="" htmlFor="title">
            Content:
          </label>

          {/* <div className="h-5 mt-1">
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
        <textarea
          rows="6"
          type="text"
          id="Content"
          className=" border border-gray-300 dark:border-secondaryBg dark:bg-primaryBg "
          {...register("content", {
            required: "Content is required",
            minLength: {
              value: 10,
              message: "The content must be at least 10 characters long",
            },
          })}
        /> */}
          <div className="h-5 mt-1">
            {!content && (
              <p className="text-red-500 text-sm">{"Content is required"}</p>
            )}
          </div>
          <TextEditor setContent={setContent} content = {content} />
        </div>
        <div className="flex flex-col w-[400px] gap-y-2">
          <label className="" htmlFor="title">
            Title:
          </label>
          <div className="h-5 mt-1">
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <input
            type="text"
            id="title"
            className="h-10 border border-gray-300 dark:border-secondaryBg dark:bg-primaryBg"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
              maxLength: {
                value: 100,
                message: "The title must be only 100 characters long",
              },
            })}
          />
          <label className="" htmlFor="title">
            Image:
          </label>
          <div className="h-5 mt-1">
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>
          <input
            type="text"
            id="image"
            className=" h-10 border border-gray-300 dark:border-secondaryBg dark:bg-primaryBg"
            {...register("image")}
          />
          <button
            type="submit"
            className="mt-8 w-full py-2 bg-accent text-primaryBg hover:bg-black hover:text-accent hover:border-accent  border border-secondaryBg   hover:border transition duration-200"
          >
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
