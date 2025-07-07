import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { io } from "socket.io-client";

import { Severty, ShowToast } from "../utils/toast";

function AppState(props) {
  const [products, setProducts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [token, setToken] = useState(null);
  const [auth, setAuth] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const socket = io("http://localhost:4001");

  useEffect(() => {
    socket.on("getNotification", (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => {
      socket.disconnect(); // Cleanup
    };
  }, []);
  // Fetch products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const api = await axios.get("http://localhost:4001/book/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(api.data);
        setFilterData(api.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, []);

  // Fetch user profile when token is available
  useEffect(() => {
    if (token) {
      const fetchUserProfile = async () => {
        setLoading(true); // Start loading
        try {
          const res = await axios.get("http://localhost:4001/user/get", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setAuthUser(res.data.user);
          setAuth(true); // User is authenticated
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setAuth(false); // In case of error, set auth as false
        } finally {
          setLoading(false); // Stop loading
        }
      };

      fetchUserProfile();
    }
  }, [token]);

  // Check for token in local storage on mount
  useEffect(() => {
    const lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setAuth(true);
    }
  }, []);

  // Login function
  const login = async ({ email, password }) => {
    try {
      const api = await axios.post(
        "https://book-backend-typescript.onrender.com/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (api.data.user.role === "admin") {
        ShowToast(
          "Admins are not allowed to login from this page",
          Severty.ERROR
        );
        return null;
      }
      ShowToast(api.data.message, Severty.SUCCESS);
      setToken(api.data.token);
      setAuth(true);
      setAuthUser(api.data.user);
      localStorage.setItem("token", api.data.token);
      localStorage.setItem("role", api.data.user.role);
      localStorage.setItem("user", JSON.stringify(api.data.user));
      return api.data;
    } catch (error) {
      ShowToast("Login error", Severty.ERROR);
      return null;
    }
  };
  const updateProfile = async (id, formData) => {
    try {
      const res = await axios.put(
        `http://localhost:4001/user/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data.user;
    } catch (error) {
      console.error(
        "Profile update failed",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:4001/notification/get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const notifications = response.data.notifications;
        setNotifications(notifications);

        const unread = notifications.filter((notif) => !notif.isRead);
        setUnreadCount(unread.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    window.location.href = "/";
  };

  return (
    <AppContext.Provider
      value={{
        products,
        filterData,
        login,
        auth,
        authUser,
        setAuthUser,
        loading,
        updateProfile,
        handleLogout,
        notification,
        unreadCount,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppState;
