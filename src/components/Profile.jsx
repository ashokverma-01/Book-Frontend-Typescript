import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import defaultAvatar from "../assets/avatar.png";
import AppContext from "../context/AppContext";
import { Menu, Settings, User, LogOut } from "lucide-react";

function Profile() {
  const { authUser, handleLogout } = useContext(AppContext);
  const [isDark, setIsDark] = useState(false);

  console.log("nssdsd", authUser);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 py-16 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="bg-white dark:bg-gray-800 w-full md:w-64 shadow-md p-4 md:min-h-screen py-10">
        <div className="flex items-center justify-between mb-6 ">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            My Profile
          </h1>
          <Menu className="md:hidden text-gray-800 dark:text-white" />
        </div>

        <nav className="flex flex-col space-y-2">
          <Link
            to="/profile"
            className="px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center gap-2"
          >
            <User size={18} /> Profile
          </Link>
          <Link
            to="/edit"
            className="px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center gap-2"
          >
            <Settings size={18} /> Edit Profile
          </Link>

          <Link
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white flex items-center gap-2"
          >
            <LogOut size={24} /> Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Your Profile
          </h2>

          <div className="flex flex-col items-center space-y-4">
            <img
              src={
                authUser?.imageUrl?.trim() ? authUser.imageUrl : defaultAvatar
              }
              alt="User"
              className="w-32 h-32 rounded-full border-4 border-gray-300 dark:border-gray-600 object-cover shadow-sm"
            />

            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {authUser?.firstName} {authUser?.lastName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {authUser?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Profile;
