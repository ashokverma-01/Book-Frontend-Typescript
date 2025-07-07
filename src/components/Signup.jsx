import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import bgImage from "../assets/bg.jfif"; // 🌄 Background image
import { Severty, ShowToast } from "../utils/toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/login";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:4001/user/signup",
        userInfo
      );
      if (res.data) {
        ShowToast("Signup Successfully", Severty.SUCCESS);
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        navigate(from, { replace: true });
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Signup failed. Try again.";
      ShowToast("Error: " + message, Severty.ERROR);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-1/2 "></div>

      <div className="w-1/2 flex items-center justify-center px-8">
        <div className="dark:bg-slate-800 dark:text-white p-8 rounded-lg max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
            Create your account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Fullname */}
            <div className="mb-4">
              <label className="block mb-1 text-pink-500">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <p className="text-sm text-pink-500">This field is required</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-pink-500">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <p className="text-sm text-pink-500">This field is required</p>
              )}
            </div>
            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 text-pink-500">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-sm text-pink-500">This field is required</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block mb-1 text-pink-500">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-sm text-pink-500">This field is required</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                type="submit"
                className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300"
              >
                Signup
              </button>

              <p className="text-sm">
                Have an account?{" "}
                <Link to="/login" className="underline text-pink-500">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
