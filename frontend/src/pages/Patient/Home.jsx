import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../config/api";
const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return alert("No token found. Please login.");
      }

      try {
        const res = await fetch(`${API_BASE_URL}/protected/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data);
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

    fetchDashboard();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <div className="bg-gray-100 p-4 rounded shadow">
          <p>
            <strong>Message:</strong> {user.msg}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Home;
