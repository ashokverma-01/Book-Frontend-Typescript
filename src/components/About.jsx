import React from "react";
import bgImage from "../assets/about.webp"; // Background image
import profileImage from "../assets/profile.jpeg"; // Static profile image

const About = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Right side - 70% */}
      <div className="w-[70%] flex items-center justify-center px-6 py-12">
        <div className="w-[90%] bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-10 space-y-6">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-pink-500 shadow-md"
            />
          </div>

          <h1 className="text-4xl font-bold text-center text-pink-500 dark:text-pink-400">
            About Me
          </h1>

          {/* Info Section */}
          <div className="space-y-4">
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Name:</span> Ashok Kumar Verma
              </p>
            </div>
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Email:</span> ak228308@email.com
              </p>
            </div>
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Mobile :</span> +91-9636366250
              </p>
            </div>
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Role:</span> MERN Stack
                Developer
              </p>
            </div>
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Static Address:</span> Near
                Mansarovar, Jaipur, Rajasthan
              </p>
            </div>
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Company Address:</span>{" "}
                avfitnes96 Pvt. Ltd., Jaipur, Rajasthan
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="text-center mt-6">
            <p className="text-md text-gray-500 dark:text-gray-400">
              Passionate about building full-stack web applications and helping
              others grow in tech. Let's connect!
            </p>
          </div>
        </div>
      </div>
      <div className="w-[30%]"></div>
    </div>
  );
};

export default About;
