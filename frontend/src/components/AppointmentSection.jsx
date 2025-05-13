import React, { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/UserContext";

const AppointmentSection = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } =  useContext(AuthContext);  // Use useContext properly
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchRecentAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/appointments/${user._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recent appointments");
        }
        const data = await response.json();
        const fetchedAppointments = Array.isArray(data.appointments)
          ? data.appointments
          : Array.isArray(data)
          ? data
          : [];
        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    if (user._id) {
      fetchRecentAppointments();
    }
  }, [user]);

  if (loading) {
    return <div className="py-6 text-center text-gray-500">Loading...</div>;
  }

  if (!appointments || appointments.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <h2 className="text-xl font-semibold mb-2">Your Appointments</h2>
        <p className="text-gray-600 mb-6">
          Check here for your upcoming visits.
        </p>
        <p className="text-gray-500 mb-4">No upcoming appointments</p>
        <button
          onClick={() => navigate("/find-doctors")}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Book Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Your Appointments</h2>
      <p className="text-gray-600 mb-6">
        Here are your recent or upcoming appointments.
      </p>
      {appointments.map((appointment, index) => (
        <div
          key={appointment._id || index}
          className="flex items-start p-4 bg-gray-50 rounded-lg"
        >
          <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
            <img
             
              src={appointment.doctorId.profilePic || "DR"}
              className="text-green-800 font-medium "
            ></img>
          </div>
          <div className="ml-4 flex-1">
            <h4 className="font-medium">{appointment.doctorId.fullName}</h4>
            <p className="text-sm text-gray-600">
              {appointment.doctorId.specialty}
            </p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <span>
                {new Date(appointment.appointmentDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
              <ClockIcon className="w-4 h-4 ml-3 mr-1" />
              <span>{appointment.appointmentTime}</span>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              appointment.status === "Completed"
                ? "bg-green-100 text-green-800"
                : appointment.status === "Cancelled"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {appointment.status}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentSection;
