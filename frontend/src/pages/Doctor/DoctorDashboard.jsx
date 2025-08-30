
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import {
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserCircleIcon,
  BellIcon,
  BellAlertIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import API_BASE_URL from "../../config/api";
// Utility Components
function StatCard({ icon, value, label }) {
  return (
    <div className="rounded-xl border border-gray-100 p-4 text-center shadow-sm bg-white hover:shadow-md transition-all duration-300">
      <div className="w-10 h-10 bg-[#dff3f3] rounded-full flex items-center justify-center mx-auto mb-2">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800">{value}</h3>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

// Format relative time for notifications
function formatRelativeTime(date) {
  const now = new Date();
  const diff = now - new Date(date);

  // Convert to appropriate time units
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// Main Component
export default function DoctorDashboard() {
  const { user, loading } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [cancelLoading, setCancelLoading] = useState(false);
  const [completeLoading, setCompletedLoading] = useState(false);


  // 🔔 Notification State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("doctorNotifications");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("doctorNotifications", JSON.stringify(notifications));
  }, [notifications]);
  const [showNotifications, setShowNotifications] = useState(false);

  const today = new Date().toDateString();
  const nextSlot = "9:00 AM";

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      days.push({
        day,
        isCurrentMonth: true,
        isToday: currentDate.toDateString() === new Date().toDateString(),
        isSelected: selectedDate.toDateString() === currentDate.toDateString(),
      });
    }

    return days;
  };

  const getWeekdays = () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const getMonthName = (date) =>
    date.toLocaleString("default", { month: "long" });

  const prevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  const nextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );

  const handleDateClick = (day) => {
    if (day.isCurrentMonth && day.day) {
      setSelectedDate(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.day)
      );
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/appointments/doctor/${user?._id}`
        );
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    };

    fetchAppointments();
  }, [user]);

  // 🔔 Real-time appointment notification using Socket.io
  useEffect(() => {
    if (!user?._id) return;

    const socket = io(`${API_BASE_URL}`);
    console.log("🔌 Connecting to socket server...");

    socket.emit("register", user._id);
    console.log("🧾 Registered doctor with socket:", user._id);

    socket.on("new-appointment", (data) => {
      console.log("📬 New appointment received via socket:", data);
      toast(data.message);
      setAppointments((prev) => [...prev, data.appointment]);
      setNotifications((prev) => [
        ...prev,
        { message: data.message, data: data.appointment, time: new Date() },
      ]);
    });

     socket.on("appointment-cancelled", (data) => {
       console.log("🚫 Appointment cancelled received via socket:", data);
       toast.warn(data.message);
       setAppointments((prev) =>
         prev.filter((app) => app._id !== data.appointment._id)
       );
       setNotifications((prev) => [
         ...prev,
         { message: data.message, data: data.appointment, time: new Date() },
       ]);
     });

    return () => {
      console.log("🔌 Socket disconnected.");
      socket.disconnect();
    };
  }, [user?._id]);

  
  
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


   const handleCompleted= async (appointmentId) => {
     if (!appointmentId) return;

     setCompletedLoading(true);
     try {
       const token = localStorage.getItem("token"); // or get it from context if stored there

       const response = await fetch(`${API_BASE_URL}/appointments/completed`, {
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
           app._id === appointmentId ? { ...app, status: "Completed" } : app
         )
       );

       alert(result.message || "Appointment completed successfully");
     } catch (error) {
       console.error("Error completing appointment:", error);
       alert("Failed to complete appointment. Please try again.");
     } finally {
       setCompletedLoading(false);
     }
   };


  const handleClearNotification = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#dff3f3] flex items-center justify-center">
        <p className="text-teal-600 font-medium">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#dff3f3] flex items-center justify-center">
        <p className="text-gray-500 font-medium">No user data found.</p>
      </div>
    );
  }

  const calendarDays = generateCalendarDays();
  const weekdays = getWeekdays();

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#dff3f3]">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-6 text-sm">
      {/* 🔔 Enhanced Notification Bell Icon */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full bg-white shadow-md hover:bg-[#dff3f3] transition-all duration-300"
            aria-label="Notifications"
          >
            {notifications.length > 0 ? (
              <BellAlertIcon className="w-6 h-6 text-teal-600" />
            ) : (
              <BellIcon className="w-6 h-6 text-teal-600" />
            )}
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full ring-2 ring-white">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-lg z-50 overflow-hidden transition-all duration-300 transform origin-top-right">
              <div className="px-4 py-3 bg-gradient-to-r from-teal-50 to-[#dff3f3] border-b border-teal-100 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-teal-800 font-semibold">Notifications</h3>
                  {notifications.length > 0 && (
                    <button
                      onClick={() => setNotifications([])}
                      className="text-xs flex items-center text-teal-600 hover:text-red-500 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4 mr-1" />
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-200 scrollbar-track-gray-50">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 flex flex-col items-center">
                    <BellIcon className="w-10 h-10 text-gray-300 mb-2" />
                    <p className="text-sm">No new notifications</p>
                  </div>
                ) : (
                  notifications
                    .slice()
                    .reverse()
                    .map((notif, index) => (
                      <div
                        key={index}
                        className="relative p-4 border-b border-gray-100 hover:bg-[#f5fdfd] transition-colors group"
                      >
                        <div className="flex items-start">
                          <div className="mr-3 mt-1 flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                              <CalendarDaysIcon className="w-4 h-4 text-teal-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 font-medium break-words">
                              {notif.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatRelativeTime(notif.time)}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              handleClearNotification(
                                notifications.length - 1 - index
                              )
                            }
                            className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4 text-gray-400 hover:text-red-500"
                          >
                            <XCircleIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>

              <div className="p-2 bg-gradient-to-r from-[#dff3f3] to-teal-50 rounded-b-2xl">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-full py-2 rounded-xl text-xs font-medium text-teal-600 hover:bg-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Section and the rest of your component remains the same */}
      {/* Profile */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col lg:flex-row items-center gap-6">
        <div className="relative">
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="doctor"
              className="w-28 h-28 object-cover rounded-full border-4 border-[#dff3f3] shadow-sm"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-[#dff3f3] flex items-center justify-center border-4 border-[#dff3f3] shadow-sm">
              <UserCircleIcon className="w-16 h-16 text-teal-300" />
            </div>
          )}
          <span className="absolute bottom-1 right-1 w-5 h-5 bg-teal-500 border-2 border-white rounded-full"></span>
        </div>

        <div className="text-center lg:text-left flex-1 space-y-1">
          <h2 className="text-xl font-bold text-gray-800">{user?.fullName}</h2>
          <p className="text-teal-600 font-medium">{user.specialization}</p>
          <p className="text-gray-500 text-sm">Speaks: English, Nepali</p>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-1"></span>
            Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
          <StatCard
            icon={<MapPinIcon className="h-5 w-5 text-teal-600" />}
            value={appointments.length}
            label="Total Patients"
          />
          <StatCard
            icon={<ClockIcon className="h-5 w-5 text-teal-600" />}
            value={nextSlot}
            label="Next Slot"
          />
          <StatCard
            icon={<CalendarDaysIcon className="h-5 w-5 text-teal-600" />}
            value={today}
            label="Today's Date"
          />
        </div>
      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Appointments */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Today's Appointments
              </h3>
              <p className="text-sm text-gray-500">
                Manage your schedule efficiently
              </p>
            </div>
            <span className="text-teal-600 font-medium">
              {appointments.length} Total
            </span>
          </div>

          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl">
                <CalendarDaysIcon className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-2 text-sm text-gray-500">
                  No appointments scheduled
                </p>
              </div>
            ) : (
              appointments.map((app, i) => (
                <div
                  key={i}
                  className="p-4 flex justify-between items-center border rounded-xl shadow-sm hover:shadow-md transition-all bg-white"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={app?.patientId?.profilePic || "P"}
                      className="w-10 h-10 rounded-full bg-[#dff3f3] flex items-center justify-center text-teal-600 font-bold"
                    />
                    <div className="w-22">
                      <p className="font-medium text-gray-800">
                        {app?.patientId?.fullName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {app?.patientId?.type || "Patient"}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm w-20">
                    <p className="text-gray-400 text-xs">Time</p>
                    <p className="font-medium text-gray-700">
                      {app.appointmentTime || "No time"}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium 
                      ${
                        app.status === "Completed"
                          ? "bg-teal-100 text-teal-800"
                          : app.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
`}
                    >
                      {app.status}
                    </span>

                    {app.status == "Completed" ? (
                      <button
                        disabled={true}
                        onClick={() => handleCompleted(app._id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-teal-100"
                      >
                        <CheckCircleIcon className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCompleted(app._id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-500 hover:bg-teal-100"
                      >
                        <CheckCircleIcon className="w-5 h-5" />
                      </button>
                    )}
                    {app.status == "Cancelled" ? (
                      <button
                        onClick={() => handleCancel(app._id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center  bg-gray-100 text-gray-500 hover:bg-teal-100"
                      >
                        <XCircleIcon className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        disabled={true}
                        onClick={() => handleCancel(app._id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <XCircleIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-800">My Calendar</h3>
            <span className="text-xs text-white bg-teal-500 px-2 py-1 rounded-full">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="bg-gradient-to-br from-[#dff3f3] to-white rounded-xl p-2">
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={prevMonth}
                className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow hover:bg-[#dff3f3]"
              >
                <ChevronLeftIcon className="w-3 h-3 text-gray-600" />
              </button>
              <span className="text-xs font-medium text-gray-800">
                {getMonthName(currentMonth)} {currentMonth.getFullYear()}
              </span>
              <button
                onClick={nextMonth}
                className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow hover:bg-[#dff3f3]"
              >
                <ChevronRightIcon className="w-3 h-3 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-1">
              {weekdays.map((day) => (
                <div
                  key={day}
                  className="text-xs text-center text-gray-500 font-medium"
                >
                  {day[0]}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className={`text-xs h-7 flex items-center justify-center rounded-lg 
                    ${!day.isCurrentMonth ? "text-gray-300" : "cursor-pointer"}
                    ${
                      day.isToday && !day.isSelected
                        ? "bg-[#dff3f3] text-teal-700"
                        : ""
                    }
                    ${
                      day.isSelected
                        ? "bg-teal-500 text-white font-semibold"
                        : ""
                    }
                    ${
                      day.isCurrentMonth && !day.isToday && !day.isSelected
                        ? "hover:bg-[#dff3f3]"
                        : ""
                    }
                  `}
                >
                  {day.day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}