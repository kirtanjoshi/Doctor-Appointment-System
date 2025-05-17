import {React, useState} from "react";
import { Users, CalendarDays, Bookmark } from "lucide-react";
import {
  UserGroupIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  BookmarkIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import useDoctors from "../../hooks/useDoctor";
import useAppointments from "../../hooks/useAppointments";

export default function AdminDashboard() {
  const { doctors, loading, error } = useDoctors();
  const [searchTerm, setSearchTerm] = useState("");

  const { appointments } = useAppointments();
  const today = new Date().toDateString();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-teal-50">
        <div className="p-8 rounded-xl bg-white shadow-lg flex items-center gap-3">
          <div className="w-4 h-4 bg-teal-500 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-teal-500 rounded-full animate-pulse delay-150"></div>
          <div className="w-4 h-4 bg-teal-500 rounded-full animate-pulse delay-300"></div>
          <span className="text-lg font-medium text-teal-800 ml-2">
            Loading...
          </span>
        </div>
      </div>
    );
  }

   const filteredAppointments = appointments.filter((app) => {
     const term = searchTerm.toLowerCase();
     return (
       app?.patientId?.fullName?.toLowerCase().includes(term) ||
       app?.patientId?.email?.toLowerCase().includes(term) ||
       app?.patientId?.phone?.toLowerCase().includes(term) ||
       app?.doctorId?.fullName?.toLowerCase().includes(term)
     );
   });

  return (
    <div className="p-6 md:p-8 space-y-8  min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-teal-900">Admin Dashboard</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: <UserGroupIcon className="h-6 w-6 text-teal-500" />,
            label: "Doctors",
            value: 660,
          },
          {
            icon: <UserGroupIcon className="h-6 w-6 text-teal-500" />,
            label: "Patients",
            value: 660,
          },
          {
            icon: <CalendarDaysIcon className="h-6 w-6 text-indigo-500" />,
            value: today,
            label: "Today's Date",
          },

          {
            icon: <BookmarkIcon className="h-6 w-6 text-pink-500" />,
            label: "New Bookings",
            value: 1,
            growth: "today",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white flex items-center justify -center  shadow rounded-lg p-4"
          >
            <div className="flex items-center justify -center space-x-4">
              <div className="p-2 bg-gray-100 rounded-full">{stat.icon}</div>
              <div>
                <div className="text-xl font-semibold">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className="text-xs text-teal-400 mt-1">{stat.growth}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Available Doctors */}
      <div className="bg-white p-6 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-teal-900 border-b pb-4">
          Available Doctors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {doctors.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-5 border border-gray-100 rounded-xl hover:shadow-lg transition duration-300 bg-white"
            >
              <div className="flex items-center gap-4">
                {doc.profilePic ? (
                  <img
                    src={doc.profilePic}
                    alt={doc.fullName}
                    className="w-16 h-16 rounded-xl object-cover shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {doc.fullName?.charAt(0) || "D"}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-teal-900">
                    {doc.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">{doc.specialization}</p>
                </div>
              </div>
              <button className="text-teal-500 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-full p-2 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Appointments Section */}
      <div className="bg-white p-6 shadow-lg rounded-2xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-teal-900">Appointments</h2>
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-50 rounded-full border-0 shadow-sm focus:ring-2 focus:ring-teal-300 focus:outline-none w-full"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Appointment Cards */}
        <div className="space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((app, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-xl hover:shadow-md transition p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white"
              >
                {/* Patient Info */}
                <div className="flex items-center gap-3 w-full md:w-1/5">
                  <img
                    src={app?.patientId?.profilePic}
                    className="w-12 h-12 rounded-full bg-teal-100"
                    alt="Patient"
                  />
                  <div>
                    <p className="font-bold text-gray-800">
                      {app?.patientId?.fullName || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {app?.patientId?.type || "Patient"}
                    </p>
                  </div>
                </div>

                {/* Appointment Time */}
                <div className="text-sm w-full md:w-1/5">
                  <p className="text-gray-400 text-xs mb-1">Appointment Time</p>
                  <p className="font-semibold text-gray-700 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {app.appointmentTime}
                  </p>
                </div>

                {/* Doctor Info */}
                <div className="text-sm w-full md:w-1/5">
                  <p className="text-gray-400 text-xs mb-1">Doctor</p>
                  <p className="font-semibold text-gray-700 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {app?.doctorId?.fullName}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="text-sm w-full md:w-1/5">
                  <p className="text-gray-400 text-xs mb-1">Contact</p>
                  <p className="text-teal-600 flex items-center gap-1 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {app?.patientId?.email || "N/A"}
                  </p>
                  <p className="text-gray-700 flex items-center gap-1 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {app?.patientId?.phone || "N/A"}
                  </p>
                </div>

                {/* Status */}
                <div className="text-sm w-full ml-10 md:w-1/6">
                  <p className="text-gray-400 text-xs mb-2">Booking</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : app.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">
              No appointments found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}