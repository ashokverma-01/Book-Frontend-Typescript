import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Severty, ShowToast } from "../utils/toast";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4001/user/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        ShowToast(
          data.message || "OTP Verified Successfully!",
          Severty.SUCCESS
        );
        setMessage("✅ OTP verified successfully.");
        navigate("/reset-password");
      } else {
        setMessage(`❌ ${data.message}`);
        ShowToast(data.message || "Invalid OTP", Severty.ERROR);
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setMessage("❌ Server error. Please try again later.");
      ShowToast("Server error. Please try again later.", Severty.ERROR);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-pink-600 dark:text-pink-400 mb-6">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              OTP
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:border-pink-500 dark:text-white"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300"
          >
            Verify OTP
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

export default Otp;
