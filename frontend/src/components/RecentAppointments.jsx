// import React from 'react';
// import { useState, useEffect } from "react";
// import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

// const RecentAppointments = () => {
//      const [appointments, setAppointments] = useState([]);

  
//   useEffect(() => {
//       const fetchRecentAppointments = async () => {
//         const response = await fetch("http://localhost:4000/api/doctors");
//         if (!response.ok) {
//           throw new Error("Failed to fetch recent appointments");
//         }
//         const data = await response.json();
//         // console.log("Recent Appointments:", data);
//        setAppointments(
//          Array.isArray(data.appointments) ? data.appointments : []
//        );

//         //  setAppointments(Array.isArray(data) ? data : data.appointment);
//     };
//     fetchRecentAppointments();
//    },[]);


  
  
//   if (!appointments || appointments.length === 0) {
//     return (
//       <div className="py-6 text-center text-gray-500">
//         No recent appointments
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4 bg-red-200">
//       {appointments.map((appointment) => (
//         <div key={appointment._id} className="flex items-start p-4 bg-gray-50 rounded-lg">
//           <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
//             <span className="text-primary font-medium">{appointment.doctorInitials}</span>
//           </div>
//           <div className="ml-4 flex-1">
//             <h4 className="font-medium">{appointment.doctorName}</h4>
//             <p className="text-sm text-gray-600">{appointment.specialty}</p>
//             <div className="mt-2 flex items-center text-sm text-gray-500">
//               <CalendarIcon className="w-4 h-4 mr-1" />
//               <span>{appointment.date}</span>
//               <ClockIcon className="w-4 h-4 ml-3 mr-1" />
//               <span>{appointment.time}</span>
//             </div>
//           </div>
//           <div className={`px-3 py-1 rounded-full text-xs ${
//             appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
//             appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
//             'bg-blue-100 text-blue-800'
//           }`}>
//             {appointment.status}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RecentAppointments;


import React, { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../context/UserContext";
const RecentAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = AuthContext();


  useEffect(() => {

    console.log("Patient ID:", user.patient._id);
    const fetchRecentAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/appointments/${user.patient._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recent appointments");
        }
        const data = await response.json();
        // Ensure the response has a val_id appointments array
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

    fetchRecentAppointments();
  }, []); // Important: run only once on mount

  if (loading) {
    return <div className="py-6 text-center text-gray-500">Loading...</div>;
  }

  if (!appointments || appointments.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500">
        No recent appointments
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded shadow">
      {appointments.map((appointment, index) => (
        <div
          key={appointment._id || index}
          className="flex items-start p-4 bg-gray-50 rounded-lg"
        >
          <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
            <span className="text-blue-800 font-medium">
              {appointment.doctorInitials || "DR"}
            </span>
          </div>
          <div className="ml-4 flex-1">
            <h4 className="font-medium">{appointment.doctorId.fullName}</h4>
            <p className="text-sm text-gray-600">
              {appointment.doctorId.fullName.specialty}
            </p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon className="w-4 h-4 mr-1" />
        <span>
  {new Date(appointment.appointmentDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</span>

              <ClockIcon className="w-4 h-4 ml-3 mr-1" />
              <span>{appointment.appointmentTime}</span>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              appointment.status === "Completed"
                ? "bg-green-100 text-green-800"
                : appointment.status === "Cancelled"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {appointment.status}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentAppointments;
