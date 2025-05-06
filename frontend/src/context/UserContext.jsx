import React, { createContext, useState, useEffect, useContext } from "react";
const UserContext = createContext();

export const AuthContext  = () => useContext(UserContext);



const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Failed to fetch user data. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/protected/dashboard",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        console.error("Unauthorized");
       alert("Failed to fetch user data. Please log in again.");
        return;
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      alert("Failed to fetch user data. Please log in again.", error);
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const loginUser = async (token) => {
    localStorage.setItem("token", token);
    await fetchUser(); // fetch and set user data
  };

  return (
    <UserContext.Provider value={{ user, loading, setUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};


export default UserProvider;

