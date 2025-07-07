import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Severty, ShowToast } from "../utils/toast";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email || !password || !confirmPassword) {
      return setError("All fields are required.");
    }

    try {
      const res = await axios.post(
        "http://localhost:4001/user/reset-password",
        {
          email,
          password,
          confirmPassword,
        }
      );

      ShowToast(
        res.data.message || "Password reset successful",
        Severty.SUCCESS
      );
      setMessage(res.data.message);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong. Try again.";
      setError(errorMessage);
      ShowToast(errorMessage, Severty.ERROR);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-pink-600 dark:text-pink-400 mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-pink-700 dark:text-pink-300">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:border-pink-500 dark:text-white"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-pink-700 dark:text-pink-300">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:border-pink-500 dark:text-white"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-pink-700 dark:text-pink-300">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:border-pink-500 dark:text-white"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300"
          >
            Reset Password
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-green-600 dark:text-green-400">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-4 text-sm text-center text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
