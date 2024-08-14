import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { displayMsg } from "../assets/Pop";
import axios from "axios";
import { signIn } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const url = "http://localhost:3000/auth/signin";
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { success, jwtToken, user, message } = response.data;
        if (success) {
          console.log("Success block reached");
          console.log("Message:", message);
          dispatch(signIn({ user, token: jwtToken }));
          displayMsg(message, 1);
          setTimeout(() => navigate("/"), 1000);
        } else {
          displayMsg(message, 0);
        }
      } catch (error) {
        if (error.response) {
          console.log(error, "...");
          displayMsg(error.response.data.message || "An error occurred", 0);
        } else if (error.request) {
          displayMsg("No response from the server", message, 0);
        } else {
          displayMsg("An error occurred", 0);
        }
      }
    }
  };

  return (
    <div className="dark:bg-black bg-lightSecondaryBg min-h-screen flex flex-col items-center justify-center px-4">
      <div className="dark:bg-primaryBg bg-lightPrimaryBg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="dark:text-primaryText text-lightPrimaryText text-2xl font-semibold mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="mb-4">
            <label
              className="block dark:text-secondaryText text-lightSecondaryText mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 dark:bg-secondaryBg bg-lightSecondaryBg dark:text-primaryText text-lightSecondaryText border dark:border-secondaryBg border-gray-300 rounded"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
            />
            <div className="h-5 mt-1">
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label className="block dark:text-secondaryText text-lightSecondaryText mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 dark:bg-secondaryBg bg-lightSecondaryBg dark:text-primaryText text-lightSecondaryText border dark:border-secondaryBg border-gray-300 rounded"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <div className="h-5 mt-1">
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-accent text-primaryBg hover:bg-black hover:text-accent hover:border-accent rounded border border-secondaryBg   hover:border transition duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 dark:text-secondaryText text-lightSecondaryText text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-accent hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
