import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";
import Theme from "../components/Theme";
import defaultAvatar from "../assets/avatar.png";
import NotificationDropdown from "../components/NotificationDropdown";

function Navbar() {
  const { authUser, notification } = useContext(AppContext);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/course">Course</a>
      </li>
      <li>
        <a href="/contact">Contact</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
    </>
  );

  return (
    <>
      <div
        className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 ${
          sticky
            ? "shadow-md bg-base-200 dark:bg-slate-700 dark:text-white transition-all duration-300"
            : "dark:bg-slate-800 dark:text-white"
        }`}
      >
        <div className="navbar">
          {/* Left - Logo & Dropdown */}
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-pink-500 text-black dark:text-white rounded-lg"
              >
                {navItems}
              </ul>
            </div>
            <a
              href="/"
              className="text-2xl font-bold cursor-pointer text-black dark:text-white"
            >
              BookStore
            </a>
          </div>

          {/* Center - Full menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-black dark:text-white">
              {navItems}
            </ul>
          </div>

          {/* Right - Search, Theme, Auth */}
          <div className="navbar-end space-x-3">
            {/* 🔍 Search */}
            <div className="hidden md:block">
              <label className="px-3 py-2 border rounded-md flex items-center gap-2">
                <input
                  type="text"
                  className="grow outline-none rounded-md px-1 dark:bg-slate-900 dark:text-white"
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>

            {/* 🌗 Theme toggle */}
            <Theme />

            <NotificationDropdown notifications={notification} />

            {/* 👤 Auth (Profile or Login) */}
            {authUser ? (
              <Link to="/profile">
                <img
                  src={
                    authUser?.imageUrl?.trim()
                      ? authUser.imageUrl
                      : defaultAvatar
                  }
                  alt="User"
                  className="w-8 h-8 rounded-full mx-auto border object-cover cursor-pointer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultAvatar;
                  }}
                />
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
