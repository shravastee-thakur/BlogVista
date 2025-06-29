import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const getRefreshToken = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/user/refresh",
          {},
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setAccessToken(res.data.accessToken);
        }
      } catch (error) {
        console.error("Failed to get refresh token");
      }
    };
    getRefreshToken();
  }, []);

  const login = async (userData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        userData,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        setAccessToken(res.data.accessToken);
        setUserId(res.data.id);
        alert(res.data.message);
        return true;
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const createBlog = async (formData) => {
    try {
      formData.append("author", userId);
      const res = await axios.post(
        "http://localhost:5000/api/v1/post/createPost",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      if (res.data.success) {
        setBlog(res.data.newPost);
        alert(res.data.message);
        return true;
      }
    } catch (error) {
      console.error("Submission error for creating blog:", error);
    }
  };

  const logout = async () => {
    if (!accessToken) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setAccessToken(null);
        setUserId(null);
        alert(res.data.message);
        return true;
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };
  return (
    <>
      <AuthContext.Provider
        value={{ accessToken, userId, login, logout, blog, createBlog }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
