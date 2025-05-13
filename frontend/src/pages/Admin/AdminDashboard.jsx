

// import React from "react";
// import {
//   UserGroupIcon,
//   CalendarDaysIcon,
//   CurrencyDollarIcon,
//   BookmarkIcon,
//   CheckCircleIcon,
//   XCircleIcon,
// } from "@heroicons/react/24/outline";
// import useDoctors from "../../hooks/useDoctor";
// import useAppointments from "../../hooks/useAppointments";

// export default function AdminDashboard() {
//   const { doctors, loading, error } = useDoctors();
//   const { appointments } = useAppointments();
//   const today = new Date().toDateString();
//   if (loading) {
//     return <div className="p-6 text-center text-lg">Loading...</div>;
//   }

//   return (
//     <div className="p-4 md:p-6 space-y-6 bg-[#f4f9fb] min-h-screen">
//       {/* Topbar */}

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {[
//           {
//             icon: <UserGroupIcon className="h-6 w-6 text-teal-500" />,
//             label: "Doctors",
//             value: 660,
//           },
//           {
//             icon: <UserGroupIcon className="h-6 w-6 text-teal-500" />,
//             label: "Patients",
//             value: 660,
//           },
//           {
//             icon: <CalendarDaysIcon className="h-6 w-6 text-indigo-500" />,
//             value: today,
//             label: "Today's Date",
//           },

//           {
//             icon: <BookmarkIcon className="h-6 w-6 text-pink-500" />,
//             label: "New Bookings",
//             value: 1,
//             growth: "today",
//           },
//         ].map((stat, idx) => (
//           <div key={idx} className="bg-white shadow rounded-lg p-4">
//             <div className="flex items-center space-x-4">
//               <div className="p-2 bg-gray-100 rounded-full">{stat.icon}</div>
//               <div>
//                 <div className="text-xl font-semibold">{stat.value}</div>
//                 <div className="text-sm text-gray-500">{stat.label}</div>
//                 <div className="text-xs text-teal-400 mt-1">{stat.growth}</div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Available Doctors */}
//       <div className="bg-white p-6 shadow rounded-lg">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">
//           Available Doctors
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//           {doctors.map((doc, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition duration-300"
//             >
//               <div className="flex items-center gap-4">
//                 {doc.profilePic ? (
//                   <img
//                     src={doc.profilePic}
//                     alt={doc.fullName}
//                     className="w-14 h-14 rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
//                     {doc.fullName?.charAt(0) || "D"}
//                   </div>
//                 )}
//                 <div>
//                   <h3 className="text-lg font-semibold text-teal-900">
//                     {doc.fullName}
//                   </h3>
//                   <p className="text-sm text-gray-500">{doc.specialization}</p>
//                 </div>
//               </div>
//               <button className="text-gray-400 hover:text-indigo-500 text-xl font-bold">
//                 &rarr;
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Appointments Section */}
//       <div className="bg-white p-6 shadow rounded-lg">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
//           <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
//           <input
//             type="text"
//             placeholder="Search"
//             className="border px-3 py-2 rounded w-full md:w-1/3"
//           />
//         </div>
//         <div className="space-y-4">
//           {appointments.map((app, i) => (
//             <div
//               key={i}
//               className="border rounded-lg hover:shadow transition p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
//             >
//               <div className="flex items-center gap-3 w-full md:w-1/5">
//                 <div>
//                   <p className="font-bold text-lg">
//                     {app?.patientId?.fullName || "Unknown"}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {app?.patientId?.type || "Patient"}
//                   </p>
//                 </div>
//               </div>

//               <div className="text-sm w-full md:w-1/5">
//                 <p className="text-gray-400">Time</p>
//                 <p className="font-semibold">{app.appointmentTime}</p>
//               </div>
//               <div className="text-sm w-full md:w-1/5">
//                 <p className="text-gray-400">Doctor</p>
//                 <p className="font-semibold">{app.doctorId.fullName}</p>
//               </div>
//               <div className="text-sm w-full md:w-1/5">
//                 <p className="text-teal-600 underline">
//                   {app?.patientId?.email || "N/A"}
//                 </p>
//                 <p className="text-red-500 flex items-center gap-1">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     className="w-4 h-4"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M2.25 6.75v10.5a.75.75 0 00.75.75h2.284a.75.75 0 01.538.22l2.722 2.722a.75.75 0 001.28-.53V17.25a.75.75 0 01.75-.75h7.5a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75h-14.25a.75.75 0 00-.75.75z"
//                     />
//                   </svg>
//                   {app?.patientId?.phone || "N/A"}
//                 </p>
//               </div>

//               <div className="text-sm w-full md:w-1/6">
//                 <p className="text-gray-400">Payment</p>
//                 <p className="text-green-600 font-semibold">{app.status}</p>
//               </div>

//               <div className="flex items-center gap-4 w-full md:w-auto">
//                 <div className="flex gap-2 text-teal-600">
//                   <CheckCircleIcon className="w-5 h-5" />
//                   <XCircleIcon className="w-5 h-5" />
//                 </div>
//                 <button className="bg-teal-100 text-teal-700 px-4 py-1 rounded">
//                   Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }\



import React from "react";
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
          <div key={idx} className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center space-x-4">
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-teal-900">Appointments</h2>
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search appointments..."
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
        <div className="space-y-4">
          {appointments.map((app, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-xl hover:shadow-md transition p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white"
            >
              <div className="flex items-center gap-3 w-full md:w-1/5">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
                  {app?.patientId?.fullName?.charAt(0) || "P"}
                </div>
                <div>
                  <p className="font-bold text-gray-800">
                    {app?.patientId?.fullName || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {app?.patientId?.type || "Patient"}
                  </p>
                </div>
              </div>

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
                  {app.doctorId.fullName}
                </p>
              </div>

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

              <div className="text-sm w-full md:w-1/6">
                <p className="text-gray-400 text-xs mb-1">Payment</p>
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

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full text-sm transition-colors shadow-sm">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}