import React, { useState } from "react";
import bgImage from "../assets/contact2.avif";
import { Severty, ShowToast } from "../utils/toast";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4001/contact/add",
        formData
      );

      if (data) {
        ShowToast(
          data.message || "Contact Form Successfully!",
          Severty.SUCCESS
        );
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      ShowToast(
        error.response?.data?.error || "Invalid Contact",
        Severty.ERROR
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Left Side - 25% */}
      <div className="w-[20%]"></div>

      {/* Right Side - 75% */}
      <div className="w-[80%] flex items-center justify-center px-8">
        <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-pink-500 mb-6">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-pink-600 dark:text-pink-300">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:border-pink-500 dark:text-white"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-pink-600 dark:text-pink-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:border-pink-500 dark:text-white"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-pink-600 dark:text-pink-300">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:border-pink-500 dark:text-white"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
