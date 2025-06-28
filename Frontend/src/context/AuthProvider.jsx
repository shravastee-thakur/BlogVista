import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);

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
          setAccessToken(accessToken);
        }
      } catch (error) {
        console.error("Failed to get refresh token");
      }
    };
    getRefreshToken();
  }, []);

  const login = async (userData) => {
    const res = await axios.post(
      "http://localhost:5000/api/v1/user/login",
      userData,
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    if (res.data.success) {
      setAccessToken(accessToken);
      setUserId(res.data.id);
      alert(res.data.message);
      return true;
    }
  };
  return (
    <>
      <AuthContext.Provider value={{ accessToken, userId, login }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
