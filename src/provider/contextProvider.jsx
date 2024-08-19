import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// Create a Context
const ContextProviderContext = createContext();

// Context Provider Component
const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userDetail, setUserDetail] = useState([]);

  const localToken = (newToken) => {
    if (newToken == null) {
      localStorage.removeItem("token");
      setToken(null);
      setUserDetail([]);
      return;
    } else {
      localStorage.setItem("token", newToken);
      setToken(newToken);
    }
  };
  const getUserDetail = async () => {
    try {
      await axios
        .get(import.meta.env.VITE_BASE_API + "/api/userInfo", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setUserDetail(res.data.data);
        });
    } catch (error) {
      console.error(error.response.data.error[0]);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, [token]);

  return (
    <ContextProviderContext.Provider
      value={{ token, localToken, userDetail, getUserDetail }}
    >
      {children}
    </ContextProviderContext.Provider>
  );
};

export { ContextProviderContext, ContextProvider };
