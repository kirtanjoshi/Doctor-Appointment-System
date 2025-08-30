import React, { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/UserContext";

const RecentAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const { user ,loading } = useContext(AuthContext); // Use useContext properly
   const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchRecentAppointments = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/appointments/patient/${user._id}`
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
          console.log("Recent",fetchedAppointments);
        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
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
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-teal bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Book Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.filter((appointment) => appointment.status != "Pending") ==
      0 ? (
        <div className="text-center text-gray-500 py-4">
          No completed or cancelled appointments yet.
        </div>
      ) : (
        appointments
          .filter((appointment) => appointment.status != "Pending")

          .map((appointment) => (
            <div
              key={appointment._id}
              className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <img src={appointment.doctorId.profilePic} className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                
              </img>
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
                  <span>{appointment.time}</span>
                </div>
              </div>
              <div className="ml-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    appointment.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : appointment.status === "Cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default RecentAppointments;