import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AppContext from "../context/AppContext";
import bgImage from "../assets/bg.jfif";
import { getFCMToken } from "../utils/fcmToken";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await login(data);
    setLoading(false);

    if (res && res.token) {
      reset();

      const role = res.user.role;

      if (role === "user") {
        navigate("/");
      } else {
        navigate("/login");
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Left div with 50% width */}
      <div className="w-1/2 "></div>

      {/* Right div with 50% width for the form */}
      <div className="w-1/2 flex items-center justify-center px-8">
        <div className="dark:bg-slate-800 dark:text-white p-10 rounded-lg max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
            Login to your account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-pink-500">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none dark:bg-slate-700"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-sm text-pink-500 mt-1">
                  This field is required
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-pink-500">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none dark:bg-slate-700"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-sm text-pink-500 mt-1">
                  This field is required
                </p>
              )}
            </div>

            {/* Submit & Signup */}
            <div className="flex justify-between items-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-sm">
                Not registered?{" "}
                <Link to="/signup" className="text-pink-500 underline">
                  Signup
                </Link>
              </p>
            </div>
            <div className="text-sm mt-3">
              <Link to="/forget-password" className="text-pink-500 underline">
                Forgot Password ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
