import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Severty, ShowToast } from "../utils/toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4001/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "OTP has been sent to your email.");
        ShowToast(data.message || "OTP sent successfully!", Severty.SUCCESS);
        navigate("/otp");
      } else {
        setMessage(data.message || "Something went wrong. Try again.");
        ShowToast(data.message || "OTP not sent", Severty.ERROR);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Server error. Please try again later.");
      ShowToast("Server error. Please try again later.", Severty.ERROR);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-pink-600 dark:text-pink-400 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-pink-700 dark:text-pink-300"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:border-pink-500 dark:text-white"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300"
          >
            Send OTP
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-pink-600 dark:text-pink-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
