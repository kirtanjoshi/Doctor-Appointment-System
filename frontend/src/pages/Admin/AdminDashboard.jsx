// import React from "react";
// import {
//   UserGroupIcon,
//   CalendarDaysIcon,
//   CurrencyDollarIcon,
//   BookmarkIcon,
//   ClockIcon,
//   UserIcon,
//   CheckCircleIcon,
//   XCircleIcon,
// } from "@heroicons/react/24/outline";
// import useDoctors from "../../hooks/useDoctor";
// import useAppointments from "../../hooks/useAppointments";

// export default function AdminDashboard() {



//     const { doctors, loading, error } = useDoctors();
// const { appointments } = useAppointments();
 
//   if (!loading) <>Loading...</>;
//   return (
//     <div className="p-4 md:p-6 space-y-6 bg-[#f4f9fb] min-h-screen">
//       {/* Topbar */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//         <input
//           type="text"
//           placeholder="Search Doctor name or Email"
//           className="border rounded px-4 py-2 w-full md:w-1/2"
//         />
//         <div className="text-sm text-gray-600">Today's Date: 2025-05-07</div>
//       </div>
//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {[
//           {
//             icon: <UserGroupIcon className="h-6 w-6 text-blue-500" />,
//             label: "Patients",
//             value: 660,
//             growth: "+40 this month",
//           },
//           {
//             icon: <CalendarDaysIcon className="h-6 w-6 text-indigo-500" />,
//             label: "Appointments",
//             value: 230,
//             growth: "+30 this month",
//           },
//           {
//             icon: <CurrencyDollarIcon className="h-6 w-6 text-green-500" />,
//             label: "Revenue",
//             value: "$9900",
//             growth: "+20% this month",
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
//                 <div className="text-xs text-blue-400 mt-1">{stat.growth}</div>
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
//                 <img
//                   src={doc.profilePic}
//                   alt={doc.name}
//                   className="w-14 h-14 rounded-full object-cover"
//                 />
//                 <div>
//                   <h3 className="text-lg font-semibold text-blue-900">
//                     {doc.fullName}
//                   </h3>
//                   <p className="text-sm text-gray-500">{doc.specialization}</p>
//                   <p className="text-sm text-indigo-500">⭐ {doc.rating}</p>
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
//           {appointments.map((appointments, i) => (
//             <div
//               key={i}
//               className="border rounded-lg hover:shadow transition p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
//             >
//               {/* ID, Name, Type */}

//               <div className="flex items-center gap-3 w-full md:w-1/5">
//                 {/* <img
//                   src={appointments.patientId.profilePic}
//                   className="w-10 h-10 bg-blue-100 rounded-full"
//                 /> */}
//                 <div>
//                   <p className="text-sm text-blue-600 font-semibold">
//                     #{appointments._id}
//                   </p>
//                   <p className="font-bold text-lg">
//                     {appointments.patientId.fullName}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {appointments.patientId.type}
//                   </p>
//                 </div>
//               </div>

//               {/* Time */}
//               <div className="text-sm w-full md:w-1/5">
//                 <p className="text-gray-400">Time</p>
//                 <p className="font-semibold">{appointments.appointmentTime}</p>
//               </div>

//               {/* Contact */}
//               <div className="text-sm w-full md:w-1/5">
//                 <p className="text-blue-600 underline">{appointments.patientId.email}</p>
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
//                   {appointments.phone}
//                 </p>
//               </div>

//               {/* Payment */}
//               <div className="text-sm w-full md:w-1/6">
//                 <p className="text-gray-400">Payment</p>
//                 <p className="text-green-600 font-semibold">
//                   {appointments.status}
//                 </p>
//               </div>

//               {/* Icons & Button */}
//               <div className="flex items-center gap-4 w-full md:w-auto">
//                 <div className="flex gap-2 text-blue-600">
//                   <CheckCircleIcon className="w-5 h-5" />
//                   <XCircleIcon className="w-5 h-5" />
//                 </div>
//                 <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded">
//                   Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";
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

  if (loading) {
    return <div className="p-6 text-center text-lg">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-[#f4f9fb] min-h-screen">
      {/* Topbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search Doctor name or Email"
          className="border rounded px-4 py-2 w-full md:w-1/2"
        />
        <div className="text-sm text-gray-600">Today's Date: 2025-05-07</div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: <UserGroupIcon className="h-6 w-6 text-blue-500" />,
            label: "Patients",
            value: 660,
            growth: "+40 this month",
          },
          {
            icon: <CalendarDaysIcon className="h-6 w-6 text-indigo-500" />,
            label: "Appointments",
            value: 23,
            growth: "+30 this month",
          },
          {
            icon: <CurrencyDollarIcon className="h-6 w-6 text-green-500" />,
            label: "Revenue",
            value: "$9900",
            growth: "+20% this month",
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
                <div className="text-xs text-blue-400 mt-1">{stat.growth}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Available Doctors */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Available Doctors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {doctors.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition duration-300"
            >
              <div className="flex items-center gap-4">
                {doc.profilePic ? (
                  <img
                    src={doc.profilePic}
                    alt={doc.fullName}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                    {doc.fullName?.charAt(0) || "D"}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">
                    {doc.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">{doc.specialization}</p>
                  <p className="text-sm text-indigo-500">
                    ⭐ {doc.rating || "N/A"}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-indigo-500 text-xl font-bold">
                &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Appointments Section */}
      <div className="bg-white p-6 shadow rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-2 rounded w-full md:w-1/3"
          />
        </div>
        <div className="space-y-4">
          {appointments.map((app, i) => (
            <div
              key={i}
              className="border rounded-lg hover:shadow transition p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex items-center gap-3 w-full md:w-1/5">
                <div>
                  <p className="font-bold text-lg">
                    {app?.patientId?.fullName || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {app?.patientId?.type || "Patient"}
                  </p>
                </div>
              </div>

              <div className="text-sm w-full md:w-1/5">
                <p className="text-gray-400">Time</p>
                <p className="font-semibold">{app.appointmentTime}</p>
              </div>
              <div className="text-sm w-full md:w-1/5">
                <p className="text-gray-400">Doctor</p>
                <p className="font-semibold">{app.doctorId.fullName}</p>
              </div>
              <div className="text-sm w-full md:w-1/5">
                <p className="text-blue-600 underline">
                  {app?.patientId?.email || "N/A"}
                </p>
                <p className="text-red-500 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75v10.5a.75.75 0 00.75.75h2.284a.75.75 0 01.538.22l2.722 2.722a.75.75 0 001.28-.53V17.25a.75.75 0 01.75-.75h7.5a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75h-14.25a.75.75 0 00-.75.75z"
                    />
                  </svg>
                  {app?.patientId?.phone || "N/A"}
                </p>
              </div>

              <div className="text-sm w-full md:w-1/6">
                <p className="text-gray-400">Payment</p>
                <p className="text-green-600 font-semibold">{app.status}</p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex gap-2 text-blue-600">
                  <CheckCircleIcon className="w-5 h-5" />
                  <XCircleIcon className="w-5 h-5" />
                </div>
                <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded">
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
