



// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../../context/UserContext";
// import {
//   MapPinIcon,
//   CalendarDaysIcon,
//   ClockIcon,
//   CheckCircleIcon,
//   XCircleIcon,
//   MagnifyingGlassIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   UserCircleIcon,
// } from "@heroicons/react/24/outline";

// // Utility Components
// function StatCard({ icon, value, label }) {
//   return (
//     <div className="rounded-xl border border-gray-100 p-4 text-center shadow-sm bg-white hover:shadow-md transition-all duration-300">
//       <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-2">
//         {icon}
//       </div>
//       <h3 className="text-lg font-bold text-gray-800">{value}</h3>
//       <p className="text-xs text-gray-500">{label}</p>
//     </div>
//   );
// }

// // Main Component
// export default function DoctorDashboard() {
//   const { user, loading } = useContext(AuthContext);
//   const [appointments, setAppointments] = useState([]);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const today = new Date().toDateString();
//   const nextSlot = "9:00 AM";

//   // Calendar Utilities
//   const getDaysInMonth = (year, month) =>
//     new Date(year, month + 1, 0).getDate();
//   const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

//   const generateCalendarDays = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();
//     const daysInMonth = getDaysInMonth(year, month);
//     const firstDay = getFirstDayOfMonth(year, month);

//     const days = [];
//     for (let i = 0; i < firstDay; i++) {
//       days.push({ day: null, isCurrentMonth: false });
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const currentDate = new Date(year, month, day);
//       days.push({
//         day,
//         isCurrentMonth: true,
//         isToday: currentDate.toDateString() === new Date().toDateString(),
//         isSelected: selectedDate.toDateString() === currentDate.toDateString(),
//       });
//     }

//     return days;
//   };

//   const getWeekdays = () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const getMonthName = (date) =>
//     date.toLocaleString("default", { month: "long" });

//   const prevMonth = () =>
//     setCurrentMonth(
//       new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
//     );

//   const nextMonth = () =>
//     setCurrentMonth(
//       new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
//     );

//   const handleDateClick = (day) => {
//     if (day.isCurrentMonth && day.day) {
//       setSelectedDate(
//         new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.day)
//       );
//     }
//   };

//   useEffect(() => {
//     if (!user) return;

//     const fetchAppointments = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:4000/api/appointments/doctor/${user._id}`
//         );
//         const data = await res.json();
//         setAppointments(data);
//       } catch (err) {
//         console.error("Failed to fetch appointments:", err);
//       }
//     };

//     fetchAppointments();
//   }, [user]);

//   // Early Loading or User Null Return
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-indigo-600 font-medium">Loading...</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-gray-500 font-medium">No user data found.</p>
//       </div>
//     );
//   }

//   const calendarDays = generateCalendarDays();
//   const weekdays = getWeekdays();

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 space-y-6 text-sm">
//       {/* Doctor Profile Card */}
//       <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col lg:flex-row items-center gap-6">
//         <div className="relative">
//           {user?.profilePic ? (
//             <img
//               src={user.profilePic}
//               alt="doctor"
//               className="w-28 h-28 object-cover rounded-full border-4 border-indigo-100 shadow-sm"
//             />
//           ) : (
//             <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center border-4 border-indigo-100 shadow-sm">
//               <UserCircleIcon className="w-16 h-16 text-indigo-300" />
//             </div>
//           )}
//           <span className="absolute bottom-1 right-1 w-5 h-5 bg-teal-500 border-2 border-white rounded-full"></span>
//         </div>

//         <div className="text-center lg:text-left flex-1 space-y-1">
//           <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
//           <p className="text-indigo-600 font-medium">{user.specialization}</p>
//           <p className="text-gray-500 text-sm">Speaks: English, Nepali</p>
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
//             <span className="w-2 h-2 bg-teal-500 rounded-full mr-1"></span>
//             Available
//           </span>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
//           <StatCard
//             icon={<MapPinIcon className="h-5 w-5 text-indigo-600" />}
//             value={appointments.length}
//             label="Total Patients"
//           />
//           <StatCard
//             icon={<ClockIcon className="h-5 w-5 text-indigo-600" />}
//             value={nextSlot}
//             label="Next Slot"
//           />
//           <StatCard
//             icon={<CalendarDaysIcon className="h-5 w-5 text-indigo-600" />}
//             value={today}
//             label="Today's Date"
//           />
//         </div>
//       </div>

//       {/* Calendar and Appointment Section */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {/* Today's Appointments */}
//         <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-md">
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h3 className="text-xl font-bold text-gray-800">
//                 Today's Appointments
//               </h3>
//               <p className="text-sm text-gray-500">
//                 Manage your schedule efficiently
//               </p>
//             </div>
//             <span className="text-indigo-500 font-medium">
//               {appointments.length} Total
//             </span>
//           </div>

//           <div className="space-y-4">
//             {appointments.length === 0 ? (
//               <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl">
//                 <CalendarDaysIcon className="mx-auto h-12 w-12 text-gray-300" />
//                 <p className="mt-2 text-sm text-gray-500">
//                   No appointments scheduled
//                 </p>
//               </div>
//             ) : (
//               appointments.map((app, i) => (
//                 <div
//                   key={i}
//                   className="p-4 flex justify-between items-center border rounded-xl shadow-sm hover:shadow-md transition-all bg-white"
//                 >
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={app?.patientId?.profilePic || "P"}
//                       className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold"
//                     ></img>
//                     <div>
//                       <p className="font-medium text-gray-800">
//                         {app?.patientId?.fullName}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {app?.patientId?.type || "Patient"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="text-sm">
//                     <p className="text-gray-400 text-xs">Time</p>
//                     <p className="font-medium text-gray-700">
//                       {app.appointmentTime}
//                     </p>
//                   </div>

//                   <div className="flex gap-2 items-center">
//                     <span
//                       className={`text-xs px-2 py-0.5 rounded-full font-medium
//                       ${
//                         app.status === "Paid"
//                           ? "bg-teal-100 text-teal-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {app.status}
//                     </span>
//                     <button className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 hover:bg-teal-100">
//                       <CheckCircleIcon className="w-5 h-5" />
//                     </button>
//                     <button className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100">
//                       <XCircleIcon className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//         {/* Calendar */}
//         <div className="bg-white p-4 rounded-2xl shadow-md">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-sm font-bold text-gray-800">My Calendar</h3>
//             <span className="text-xs text-white bg-indigo-500 px-2 py-1 rounded-full">
//               {new Date().toLocaleDateString("en-US", {
//                 month: "short",
//                 year: "numeric",
//               })}
//             </span>
//           </div>

//           <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-2">
//             {/* Calendar Header */}
//             <div className="flex justify-between items-center mb-2">
//               <button
//                 onClick={prevMonth}
//                 className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow hover:bg-indigo-50"
//               >
//                 <ChevronLeftIcon className="w-3 h-3 text-gray-600" />
//               </button>
//               <span className="text-xs font-medium text-gray-800">
//                 {getMonthName(currentMonth)} {currentMonth.getFullYear()}
//               </span>
//               <button
//                 onClick={nextMonth}
//                 className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow hover:bg-indigo-50"
//               >
//                 <ChevronRightIcon className="w-3 h-3 text-gray-600" />
//               </button>
//             </div>

//             {/* Weekdays */}
//             <div className="grid grid-cols-7 mb-1">
//               {weekdays.map((day) => (
//                 <div
//                   key={day}
//                   className="text-xs text-center text-gray-500 font-medium"
//                 >
//                   {day[0]}
//                 </div>
//               ))}
//             </div>

//             {/* Days */}
//             <div className="grid grid-cols-7 gap-1">
//               {calendarDays.map((day, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleDateClick(day)}
//                   className={`text-xs h-7 flex items-center justify-center rounded-lg
//                   ${!day.isCurrentMonth ? "text-gray-300" : "cursor-pointer"}
//                   ${
//                     day.isToday && !day.isSelected
//                       ? "bg-indigo-100 text-indigo-700"
//                       : ""
//                   }
//                   ${
//                     day.isSelected
//                       ? "bg-indigo-500 text-white font-semibold"
//                       : ""
//                   }
//                   ${
//                     day.isCurrentMonth && !day.isToday && !day.isSelected
//                       ? "hover:bg-indigo-50"
//                       : ""
//                   }`}
//                 >
//                   {day.day}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


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
} from "@heroicons/react/24/outline";

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

// Main Component
export default function DoctorDashboard() {
  const { user, loading } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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
          `http://localhost:4000/api/appointments/doctor/${user._id}`
        );
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    };

    fetchAppointments();
  }, [user]);

const handleCancelAppointment = async (appointmentId) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/appointments/cancel",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointmentId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to cancel appointment");
    }

    const result = await response.json();
    console.log("Appointment cancelled:", result);

    // Optional: Refresh appointments list after cancel
    setAppointments((prev) =>
      prev.map((app) =>
        app._id === appointmentId ? { ...app, status: "Cancelled" } : app
      )
    );
  } catch (error) {
    console.error("Error cancelling appointment:", error);
  }
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

  return (
    <div className="min-h-screen p-6 space-y-6 text-sm">
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
          <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
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
                    <div>
                      <p className="font-medium text-gray-800">
                        {app?.patientId?.fullName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {app?.patientId?.type || "Patient"}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="text-gray-400 text-xs">Time</p>
                    <p className="font-medium text-gray-700">
                      {app.appointmentTime}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium 
                      ${
                        app.status === "Paid"
                          ? "bg-teal-100 text-teal-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {app.status}
                    </span>
                    <button className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 hover:bg-teal-100">
                      <CheckCircleIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(app._id)}
                      className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      <XCircleIcon className="w-5 h-5" />
                    </button>
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
