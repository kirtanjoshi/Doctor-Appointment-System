// src/hooks/usepatients.js
import { useState, useEffect } from "react";

const useAppointments = () => {
  const [appointments, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/appointments`);
        const data = await response.json();
        setPatients(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching patients:", err);
      }
    };

    fetchAppointments();
  }, []);

  return { appointments, loading, error };
};

export default useAppointments;
