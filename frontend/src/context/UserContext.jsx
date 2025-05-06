import React, { createContext, useState, useEffect, useContext } from "react";

// Create and export context hook
const UserContext = createContext();
export const useAuth = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user info from protected route
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/protected/dashboard", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        console.warn("Unauthorized: Token invalid or expired.");
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  // Run once on mount to check for token
  useEffect(() => {
    fetchUser();
  }, []);

  // Called after successful login
  const loginUser = async (token) => {
    localStorage.setItem("token", token);
    await fetchUser();
  };

  return (
    <UserContext.Provider value={{ user, loading, loginUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
