// Dashboard.jsx
import React, { useState } from "react";

import {
  CalendarIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import AppointmentSection from "../components/AppointmentSection";
import RecentAppointments from "../components/RecentAppointments";
import RecentMessages from "../components/RecentMessages";
import RecentRecords from "../components/RecentRecords";
// import Sidebar from "../components/Sidebar";
import PatientInfoCard from "../components/PatientInfoCard";



import { useContext } from "react";
import { AuthContext } from "../context/UserContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const navigate = useNavigate();
 const { user, loading }  = useContext(AuthContext); 


  const stats = [
    {
      icon: CalendarIcon,
      count: 0,
      title: "Upcoming Appointments",
      subtitle: "Next appointment in 3 days",
      borderColor: "border-primary",
    },
    {
      icon: DocumentTextIcon,
      count: 0,
      title: "Medical Records",
      subtitle: "Last updated 3 days ago",
      borderColor: "border-orange-400",
    },
    {
      icon: ChatBubbleLeftIcon,
      count: 5,
      title: "Unread Messages",
      subtitle: "From Dr. Sarah Johnson",
      borderColor: "border-blue-400",
    },
    {
      icon: DocumentIcon,
      count: 5,
      title: "Prescriptions",
      subtitle: "Renewal needed",
      borderColor: "border-green-400",
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

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user) return <div className="p-4">No user data found.</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Patient Dashboard</h1>
        <button
          onClick={() => navigate("/find-doctors")}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          + Book Appointment
        </button>
      </div>
      <Patien
        tInfoCard />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <AppointmentSection
        title="Upcoming Appointments"
        description="Your scheduled appointments with healthcare providers"
      />

      <div className="bg-white p-6 mt-8 rounded-xl shadow-sm">
        <div className="border-b pb-4 mb-4">
          <div className="flex space-x-6">
            {["appointments", "records", "messages"].map((tab) => (
              <button
                key={tab}
                className={`pb-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
                  activeTab === tab
                    ? "text-primary border-primary"
                    : "text-gray-500 border-transparent hover:text-primary"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "appointments" && "Recent Appointments"}
                {tab === "records" && "Recent Records"}
                {tab === "messages" && "Recent Messages"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {activeTab === "appointments" && (
            <RecentAppointments appointments={recentAppointments} />
          )}
          {activeTab === "records" && <RecentRecords records={recentRecords} />}
          {activeTab === "messages" && (
            <RecentMessages messages={recentMessages} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
