import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import AppointmentSection from "../../components/Patient/AppointmentSection"
import RecentAppointments from "../../components/Patient/RecentAppointmements";
import PatientInfoCard from "../../components/Patient/PatientInfoCard";

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
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Patient Dashboard</h1>
        <button
          onClick={() => navigate("/patient/find-doctors")}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-teal-800 bg-primary rounded-lg shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          + Book Appointment
         </button>
      </div>


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
              <RecentAppointments/>
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