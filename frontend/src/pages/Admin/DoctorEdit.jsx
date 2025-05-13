

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaUpload } from "react-icons/fa";

// const daysOfWeek = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// const specializationList = [
//   "Cardiologist",
//   "Neurologist",
//   "Pediatrician",
//   "Dermatologist",
//   "Orthopedic",
//   "Gynecologist",
//   "Psychiatrist",
//   "Dentist",
// ];

// function DoctorEdit() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [doctor, setDoctor] = useState(null);
//   const [profilePic, setProfilePic] = useState(null);
//   const [availability, setAvailability] = useState([]);
//   const [newSlot, setNewSlot] = useState({ day: "", timeSlot: "" });

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const res = await fetch(`http://localhost:4000/api/doctors/${id}`);
//         const data = await res.json();
//         setDoctor(data);
//          setAvailability(data.availability || []);
//       } catch (err) {
//         console.error("Failed to fetch doctor:", err);
//       }
//     };
//     fetchDoctor();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDoctor((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setProfilePic(file);
//   };

//   const handleAddSlot = () => {
//     const { day, timeSlot } = newSlot;
//     if (!day || !timeSlot) return alert("Select both day and time");

//     const formattedTime = new Date(`1970-01-01T${timeSlot}`).toLocaleTimeString(
//       [],
//       {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       }
//     );

//     const updated = [...availability];
//     const existing = updated.find((a) => a.day === day);

//     if (existing) {
//       if (!existing.timeSlot.includes(formattedTime)) {
//         existing.timeSlot.push(formattedTime);
//       }
//     } else {
//       updated.push({ day, timeSlot: [formattedTime] });
//     }

//     setAvailability(updated);
//     setNewSlot({ day: "", timeSlot: "" });
//   };
 
//   const handleRemoveSlot = (day, timeToRemove) => {
//     const updated = availability
//       .map((slot) => {
//         if (slot.day === day) {
//           // Flatten and filter time slots
//           const flattened = slot.timeSlot
//             .flat()
//             .filter((t) => t !== timeToRemove);
//           // Return updated slot if time slots still exist
//           return flattened.length > 0
//             ? { ...slot, timeSlot: [flattened] }
//             : null;
//         }
//         return slot;
//       })
//       .filter((slot) => slot !== null); // remove empty day slots
//     setAvailability(updated);
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     for (const key in doctor) {
//       if (key !== "availability") formData.append(key, doctor[key]);
//     }
//     formData.append("availability", JSON.stringify(availability));
//     if (profilePic) formData.append("profilePic", profilePic);

//     try {
//       const res = await fetch(
//         `http://localhost:4000/api/doctors/update/${id}`,
//         {
//           method: "PUT",
//           body: formData,
//         }
//       );

//       if (res.ok) {
//         alert("Doctor updated successfully");
//         navigate("/admin/doctors");
//       } else {
//         const err = await res.json();
//         alert(err.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("Update error:", err);
//       alert("Something went wrong");
//     }
//   };

//   if (!doctor) return <div className="p-10 text-center">Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-6">Edit Doctor</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="flex flex-col items-center">
//           <label className="relative w-[100px] h-[100px] bg-gray-200 rounded-full overflow-hidden cursor-pointer">
//             {profilePic ? (
//               <img
//                 src={URL.createObjectURL(profilePic)}
//                 alt="Preview"
//                 className="w-full h-full object-cover"
//               />
//             ) : doctor.profilePic ? (
//               <img
//                 src={doctor.profilePic}
//                 alt="Doctor"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="flex flex-col items-center justify-center h-full text-sm text-gray-500">
//                 <FaUpload className="mb-1" /> Upload
//               </div>
//             )}
//             <input
//               type="file"
//               onChange={handleImageChange}
//               className="absolute inset-0 opacity-0"
//             />
//           </label>
//         </div>

//         {["fullName", "email", "password", "qualifications", "fee"].map(
//           (key) => (
//             <div key={key}>
//               <label className="block text-gray-600 mb-1">
//                 {key.charAt(0).toUpperCase() + key.slice(1)}
//               </label>
//               <input
//                 type={key === "fee" ? "number" : "text"}
//                 name={key}
//                 value={doctor[key] || ""}
//                 onChange={handleInputChange}
//                 className="w-full border rounded px-3 py-2"
//                 required
//               />
//             </div>
//           )
//         )}

//         <div>
//           <label className="block text-gray-600 mb-1">Specialization</label>
//           <select
//             name="specialization"
//             value={doctor.specialization}
//             onChange={handleInputChange}
//             className="w-full border rounded px-3 py-2"
//             required
//           >
//             <option value="">Select</option>
//             {specializationList.map((spec) => (
//               <option key={spec} value={spec}>
//                 {spec}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-2">Availability</h3>
//           <div className="flex gap-3 mb-4">
//             <select
//               value={newSlot.day}
//               onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
//               className="border px-3 py-2 rounded"
//             >
//               <option value="">Day</option>
//               {daysOfWeek.map((day) => (
//                 <option key={day} value={day}>
//                   {day}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="time"
//               value={newSlot.timeSlot}
//               onChange={(e) =>
//                 setNewSlot({ ...newSlot, timeSlot: e.target.value })
//               }
//               className="border px-3 py-2 rounded"
//             />
//             <button
//               type="button"
//               onClick={handleAddSlot}
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Add
//             </button>
//           </div>

//           {/* <div className="mt-4 flex flex-col gap-2">
//             {availability.map((slot, idx) => (
//               <div
//                 key={idx}
//                 className="bg-blue-100 text-blue-800 px-4 py-2 rounded text-sm"
//               >
//                 <strong>{slot.day}</strong>:{" "}
//                 {slot.timeSlot.map((time, i) => (
//                   <span
//                     key={i}
//                     className="inline-flex items-center mr-2 bg-white border border-blue-300 rounded px-2 py-1"
//                   >
//                     {time}
//                     <button
//                       type="button"
//                       className="ml-1 text-red-500 hover:text-red-700"
//                       onClick={() => handleRemoveSlot(slot.day, time)}
//                       title="Remove"
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             ))}
//           </div> */}

//           <div className="mt-4 flex flex-col gap-2">
//             {availability.map((slot, idx) => (
//               <div
//                 key={idx}
//                 className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm"
//               >
//                 <div className="font-semibold mb-2">{slot.day}:</div>
//                 <div className="flex flex-wrap gap-2">
//                   {(Array.isArray(slot.timeSlot[0])
//                     ? slot.timeSlot.flat()
//                     : slot.timeSlot
//                   ).map((time, i) => (
//                     <span
//                       key={i}
//                       className="bg-white border border-blue-300 text-blue-700 px-3 py-1 rounded-full inline-flex items-center"
//                     >
//                       {time}
//                       <button
//                         type="button"
//                         className="ml-2 text-red-500 hover:text-red-700"
//                         onClick={() => handleRemoveSlot(slot.day, time)}
//                         title="Remove"
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="text-right">
//           <button
//             type="submit"
//             className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default DoctorEdit;







import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const specializationList = [
  "Cardiologist",
  "Neurologist",
  "Pediatrician",
  "Dermatologist",
  "Orthopedic",
  "Gynecologist",
  "Psychiatrist",
  "Dentist",
];

function DoctorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [newSlot, setNewSlot] = useState({ day: "", timeSlot: "" });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/doctors/${id}`);
        const data = await res.json();
        setDoctor(data);
        setAvailability(data.availability || []);
      } catch (err) {
        console.error("Failed to fetch doctor:", err);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(file);
  };

  const handleAddSlot = () => {
    const { day, timeSlot } = newSlot;
    if (!day || !timeSlot) return alert("Select both day and time");

    const formattedTime = new Date(`1970-01-01T${timeSlot}`).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

    const updated = [...availability];
    const existing = updated.find((a) => a.day === day);

    if (existing) {
      if (!existing.timeSlot.includes(formattedTime)) {
        existing.timeSlot.push(formattedTime);
      }
    } else {
      updated.push({ day, timeSlot: [formattedTime] });
    }

    setAvailability(updated);
    setNewSlot({ day: "", timeSlot: "" });
  };

  const handleRemoveSlot = (day, timeToRemove) => {
    const updated = availability
      .map((slot) => {
        if (slot.day === day) {
          const flattened = slot.timeSlot
            .flat()
            .filter((t) => t !== timeToRemove);
          return flattened.length > 0
            ? { ...slot, timeSlot: [flattened] }
            : null;
        }
        return slot;
      })
      .filter((slot) => slot !== null);
    setAvailability(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in doctor) {
      if (key !== "availability") formData.append(key, doctor[key]);
    }
    formData.append("availability", JSON.stringify(availability));
    if (profilePic) formData.append("profilePic", profilePic);

    try {
      const res = await fetch(
        `http://localhost:4000/api/doctors/update/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (res.ok) {
        alert("Doctor updated successfully");
        navigate("/admin/doctors");
      } else {
        const err = await res.json();
        alert(err.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong");
    }
  };

  if (!doctor)
    return <div className="p-10 text-center text-gray-600">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-md mt-8">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Edit Doctor Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Image Upload */}
        <div className="flex justify-center">
          <label className="relative w-28 h-28 bg-gray-100 rounded-full overflow-hidden shadow-md cursor-pointer hover:ring-2 hover:ring-blue-300 transition">
            {profilePic ? (
              <img
                src={URL.createObjectURL(profilePic)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : doctor.profilePic ? (
              <img
                src={doctor.profilePic}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
                <FaUpload className="text-lg mb-1" /> Upload
              </div>
            )}
            <input
              type="file"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0"
            />
          </label>
        </div>

        {/* Doctor Information Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["fullName", "email", "password", "qualifications", "fee"].map(
            (key) => (
              <div key={key}>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type={key === "fee" ? "number" : "text"}
                  name={key}
                  value={doctor[key] || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>
            )
          )}
        </div>

        {/* Specialization Dropdown */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Specialization
          </label>
          <select
            name="specialization"
            value={doctor.specialization}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">Select specialization</option>
            {specializationList.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Availability Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Availability
          </h3>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <select
              value={newSlot.day}
              onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
              className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Day</option>
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>

            <input
              type="time"
              value={newSlot.timeSlot}
              onChange={(e) =>
                setNewSlot({ ...newSlot, timeSlot: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            <button
              type="button"
              onClick={handleAddSlot}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-3 w-full md:w-auto transition"
            >
              Add Slot
            </button>
          </div>

          <div className="space-y-4">
            {availability.map((slot, idx) => (
              <div key={idx} className="bg-gray-100 p-4 rounded-lg">
                <div className="font-medium text-gray-700 mb-2">{slot.day}</div>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(slot.timeSlot[0])
                    ? slot.timeSlot.flat()
                    : slot.timeSlot
                  ).map((time, i) => (
                    <span
                      key={i}
                      className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full inline-flex items-center"
                    >
                      {time}
                      <button
                        type="button"
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveSlot(slot.day, time)}
                        title="Remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default DoctorEdit;
