import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/UserContext";

// Icons
import {
  CalendarIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  DocumentIcon,
  ClockIcon,
  UserCircleIcon,
  PlusIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const stats = [
    {
      icon: CalendarIcon,
      count: 2,
      title: "Upcoming Appointments",
      subtitle: "Next appointment in 3 days",
      borderColor: "border-teal-500",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-500",
    },
    {
      icon: DocumentTextIcon,
      count: 6,
      title: "Medical Records",
      subtitle: "Last updated 3 days ago",
      borderColor: "border-indigo-500",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-500",
    },
    {
      icon: ChatBubbleLeftIcon,
      count: 5,
      title: "Unread Messages",
      subtitle: "From Dr. Sarah Johnson",
      borderColor: "border-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      icon: DocumentIcon,
      count: 3,
      title: "Prescriptions",
      subtitle: "Renewal needed",
      borderColor: "border-emerald-500",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
  ];

  const recentAppointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      doctorInitials: "SJ",
      specialty: "Cardiology",
      date: "Feb 15, 2024",
      time: "10:00 AM",
      status: "Completed",
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      doctorInitials: "MC",
      specialty: "Dermatology",
      date: "Feb 10, 2024",
      time: "2:30 PM",
      status: "Cancelled",
    },
  ];

  const recentMessages = [
    {
      id: 1,
      senderName: "Dr. Sarah Johnson",
      senderInitials: "SJ",
      content:
        "Your test results are ready. Please schedule a follow-up appointment.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      senderName: "Dr. Michael Chen",
      senderInitials: "MC",
      content:
        "Thank you for your visit. Remember to apply the prescribed cream twice daily.",
      time: "1 day ago",
      unread: false,
    },
  ];

  const recentRecords = [
    {
      id: 1,
      title: "Blood Test Results",
      description: "Complete blood count and lipid profile",
      date: "Feb 15, 2024",
    },
    {
      id: 2,
      title: "Chest X-Ray",
      description: "Annual check-up radiography report",
      date: "Feb 10, 2024",
    },
  ];

  // StatsCard Component
  const StatsCard = ({
    icon: Icon,
    count,
    title,
    subtitle,
    borderColor,
    bgColor,
    iconColor,
  }) => {
    return (
      <div
        className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${borderColor} hover:shadow-md transition-all duration-300`}
      >
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-800">{count}</p>
            <h3 className="text-sm font-medium text-gray-700">{title}</h3>
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          </div>
          <div className={`${bgColor} p-3 rounded-full`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </div>
    );
  };

  // PatientInfoCard Component
  const PatientInfoCard = () => {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
        <div className="flex items-center">
          <div className="bg-teal-100 rounded-full p-3">
            <UserCircleIcon className="h-10 w-10 text-teal-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.fullName || "John Doe"}
            </h2>
            <div className="flex flex-wrap gap-4 mt-1">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-600">Age:</span>{" "}
                {user?.age || "35"} years
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-600">Blood Group:</span>{" "}
                {user?.bloodGroup || "O+"}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-600">Patient ID:</span>{" "}
                {user?._id?.substring(0, 8) || "P-12345"}
              </p>
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <BellIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 text-sm font-medium text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Upcoming Appointments Component
  const AppointmentSection = () => {
    const upcomingAppointments = [
      {
        id: 1,
        doctorName: "Dr. Emily Watson",
        specialty: "Pediatrician",
        date: "May 18, 2025",
        time: "09:30 AM",
        status: "Confirmed",
        image: "/api/placeholder/48/48",
      },
      {
        id: 2,
        doctorName: "Dr. Alex Hoffman",
        specialty: "Neurologist",
        date: "May 25, 2025",
        time: "02:15 PM",
        status: "Pending",
        image: "/api/placeholder/48/48",
      },
    ];

    if (upcomingAppointments.length === 0) {
      return (
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <h2 className="text-xl font-semibold mb-2">Your Appointments</h2>
          <p className="text-gray-600 mb-6">
            Check here for your upcoming visits.
          </p>
          <p className="text-gray-500 mb-4">No upcoming appointments</p>
          <button
            onClick={() => navigate("/find-doctors")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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
          <button
            onClick={() => navigate("/find-doctors")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <PlusIcon className="w-4 h-4 mr-1" /> Book Appointment
          </button>
        </div>

        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex-shrink-0">
                <img
                  src={appointment.image}
                  alt={appointment.doctorName}
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <div className="ml-4 flex-grow">
                <p className="font-medium text-gray-900">
                  {appointment.doctorName}
                </p>
                <p className="text-sm text-gray-600">{appointment.specialty}</p>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span className="mr-3">{appointment.date}</span>
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>{appointment.time}</span>
                </div>
              </div>
              <div className="ml-4">
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
            </div>
          ))}
        </div>
      </div>
    );
  };

  // RecentAppointments Component
  const RecentAppointments = ({ appointments }) => {
    return (
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-800 font-medium">
                {appointment.doctorInitials}
              </span>
            </div>
            <div className="ml-4 flex-grow">
              <p className="font-medium text-gray-900">
                {appointment.doctorName}
              </p>
              <p className="text-sm text-gray-600">{appointment.specialty}</p>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span className="mr-3">{appointment.date}</span>
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
        ))}
      </div>
    );
  };

  // RecentMessages Component
  const RecentMessages = ({ messages }) => {
    return (
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center mb-2">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-800 font-medium text-xs">
                  {message.senderInitials}
                </span>
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">
                  {message.senderName}
                </p>
                <p className="text-xs text-gray-500">{message.time}</p>
              </div>
              {message.unread && (
                <div className="ml-auto">
                  <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 pl-11">{message.content}</p>
          </div>
        ))}
        <button className="w-full py-2 text-sm font-medium text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors">
          View All Messages
        </button>
      </div>
    );
  };

  // RecentRecords Component
  const RecentRecords = ({ records }) => {
    return (
      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-8 w-8 text-indigo-500" />
              </div>
              <div className="ml-3 flex-grow">
                <p className="font-medium text-gray-900">{record.title}</p>
                <p className="text-sm text-gray-600">{record.description}</p>
              </div>
              <div className="text-xs text-gray-500">{record.date}</div>
            </div>
          </div>
        ))}
        <button className="w-full py-2 text-sm font-medium text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors">
          View All Records
        </button>
      </div>
    );
  };

  if (loading)
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (!user)
    return (
      <div className="p-8 text-center text-gray-500">No user data found.</div>
    );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <PatientInfoCard />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <AppointmentSection />

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="border-b pb-4 mb-6">
            <div className="flex space-x-8">
              {["appointments", "records", "messages"].map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
                    activeTab === tab
                      ? "text-teal-600 border-teal-600"
                      : "text-gray-500 border-transparent hover:text-teal-600"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "appointments" && "Recent Appointments"}
                  {tab === "records" && "Medical Records"}
                  {tab === "messages" && "Messages"}
                </button>
              ))}
            </div>
          </div>

          <div>
            {activeTab === "appointments" && (
              <RecentAppointments appointments={recentAppointments} />
            )}
            {activeTab === "records" && (
              <RecentRecords records={recentRecords} />
            )}
            {activeTab === "messages" && (
              <RecentMessages messages={recentMessages} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
