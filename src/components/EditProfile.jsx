import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import { Menu, Settings, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/avatar.png";
import { Severty, ShowToast } from "../utils/toast";

function EditProfile() {
  const { authUser, updateProfile, setAuthUser, handleLogout } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(authUser?.firstName || "");
  const [lastName, setLastName] = useState(authUser?.lastName || "");
  const [email, setEmail] = useState(authUser?.email || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    if (image) {
      formData.append("image", image);
    }

    try {
      const updatedUser = await updateProfile(authUser._id, formData);

      if (!updatedUser || updatedUser.success === false) {
        throw new Error(updatedUser?.message || "Something went wrong");
      }

      setAuthUser(updatedUser.user || updatedUser);
      ShowToast(
        updatedUser.message || "Profile updated successfully",
        Severty.SUCCESS
      );

      setTimeout(() => {
        navigate("/profile", { replace: true });
      }, 1000);
    } catch (err) {
      console.error("Profile update error:", err);
      ShowToast(err.message || "Profile update failed", Severty.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-16">
      {/* Sidebar */}
      <aside className="bg-white dark:bg-gray-800 w-full md:w-64 shadow-md p-4 md:min-h-screen py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">My Profile</h1>
          <Menu className="md:hidden" />
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
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white flex items-center gap-2"
          >
            <Settings size={18} /> Edit Profile
          </Link>
          <Link
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white flex items-center gap-2"
          >
            <LogOut size={24} /> Logout
          </Link>
          {/* Dark mode toggle */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white dark:bg-gray-800 flex-1 p-6 sm:p-10 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full border dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="w-full border dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Current Avatar
              </label>
              <div className="mb-3">
                <img
                  src={
                    authUser?.imageUrl?.trim()
                      ? authUser.imageUrl
                      : defaultAvatar
                  }
                  alt="Avatar"
                  className="h-24 w-24 rounded-full object-cover border"
                />
              </div>

              <label className="block text-sm font-medium mb-1">
                Upload New Avatar
              </label>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full text-sm text-gray-500 dark:text-gray-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditProfile;
