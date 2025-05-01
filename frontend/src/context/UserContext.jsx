import React, { createContext, useState, useEffect, useContext } from "react";
// Create a Context
const UserContext = createContext();

import { useNavigate } from "react-router-dom";

// Custom Hook to access User Context
export const useUser = () => useContext(UserContext);


const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    
    const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:4000/api/protected/dashboard",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Dashboard data:", data);

        if (response.ok) {
          setUser(data);
          console.log("User", user);
        } else {
          alert(data.message || "Failed to fetch dashboard data.");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
