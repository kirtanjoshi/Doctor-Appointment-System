import React, { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import {
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  DocumentIcon,
  UserCircleIcon,
  PlusIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import API_BASE_URL from "../../config/api";

const AppointmentSection = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentAppointments = async () => {
      try {
        const response = await fetch(
          `http://${API_BASE_URL}/appointments/patient/${user._id}`
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

const handleCancel = async (appointmentId) => {
  if (!appointmentId) return;

  setCancelLoading(true);
  try {
    const token = localStorage.getItem("token"); // or get it from context if stored there

    const response = await fetch(`${API_BASE_URL}/appointments/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ send the token here
      },
      body: JSON.stringify({ bookingId: appointmentId }),
    });

    console.log(appointmentId);

    if (!response.ok) {
      throw new Error("Failed to cancel appointment");
    }

    const result = await response.json();

    // Update local state
    setAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app._id === appointmentId ? { ...app, status: "Cancelled" } : app
      )
    );

    alert(result.message || "Appointment cancelled successfully");
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    alert("Failed to cancel appointment. Please try again.");
  } finally {
    setCancelLoading(false);
  }
};

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
          onClick={() => navigate("/patient/find-doctors")}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Book Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Upcoming Appointments
        </h2>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex-shrink-0">
              <img
                src={appointment.doctorId.profilePic}
                alt={appointment.doctorId.fullName}
                className="h-12 w-12 rounded-full"
              />
            </div>
            <div className="ml-4 flex-grow">
              <p className="font-medium text-gray-900">
                {appointment.doctorId.fullName}
              </p>
              <p className="text-sm text-gray-600">
                {appointment.doctorId.specialization}
              </p>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span className="mr-3">{appointment.appointmentDate}</span>
                <ClockIcon className="w-4 h-4 mr-1" />
                <span>{appointment.appointmentTime}</span>
              </div>
            </div>
            <div className="ml-4 flex flex-col items-end">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  appointment.status === "Confirmed"
                    ? "bg-green-100 text-green-800"
                    : appointment.status === "Cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {appointment.status}
              </span>
            </div>
            <div className="ml-4 flex items-center">
              
            {(appointment.status === "Confirmed" ||
              appointment.status === "Pending") && (
              <button
                onClick={() => handleCancel(appointment._id)}
                disabled={cancelLoading}
                className="mt-0 flex items-center text-sm text-red-600 hover:text-red-800 font-medium focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                {cancelLoading ? "Cancelling..." : "Cancel"}
              </button>
            )}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentSection;
