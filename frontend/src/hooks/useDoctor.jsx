// src/hooks/useDoctors.js
import { useState, useEffect } from "react";

const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/doctors");
        const data = await response.json();
        setDoctors(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  return { doctors, loading, error };
};

export default useDoctors;
