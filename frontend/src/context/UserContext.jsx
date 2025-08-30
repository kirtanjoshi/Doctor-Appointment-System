
// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();
export const AuthContext = UserContext;

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user object from backend
  const [loading, setLoading] = useState(true); // to show loader
  const [role, setRole] = useState(null); // patient | doctor | admin

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (!token || !storedRole) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/protected/${storedRole}/dashboard`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType.includes("application/json")) {
        throw new Error("Invalid response from server");
      }

      const data = await response.json();
      setUser(data[storedRole]); // e.g., data.patient, data.admin, data.doctor
      setRole(storedRole);
      console.log("User data fetched:", data[storedRole]);
    } catch (error) {
      console.error("Fetch user failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (token, accountType) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", accountType);
    await fetchUser();
  };


  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    setRole(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, role, loading, setUser, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
