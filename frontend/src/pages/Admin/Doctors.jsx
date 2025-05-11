


    import React, { useState, useEffect } from "react";
    import { useNavigate } from "react-router-dom";
    import { Plus, Search, X } from "lucide-react";
    import { EditButton, DeleteButton } from "../../components/Admin/EditButton";
import { DeleteModal } from "../../components/Admin/Deletemodel";
    

function Doctors() {
      
 const specialization = [
   "Cardiologist",
   "Neurologist",
   "Pediatrician",
   "Dermatologist",
   "Orthopedic",
   "Gynecologist",
   "Psychiatrist",
   "Dentist",
 ];


      const navigate = useNavigate();
      const [searchTerm, setSearchTerm] = useState("");
      const [doctors, setDoctors] = useState([]);
      const [showAddModal, setShowAddModal] = useState(false);
      const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
      const [loading, setLoading] = useState(true); 

      const [newDoctor, setNewDoctor] = useState({
        fullName: "",
        email: "",
        password: "defaultPassword123",
        profilePic: "",
        role: "doctor",
        fee: 1000,
        specialization: "",
        qualifications: "",
      });

      const [daysOfWeek] = useState([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]);

      const [newAvailability, setNewAvailability] = useState({
        day: "",
        startTime: "",
        endTime: "",
      });

      const [form, setForm] = useState({ availability: [] });

      useEffect(() => {
        const fetchDoctors = async () => {
          try {
            const res = await fetch("http://localhost:4000/api/doctors");
            const data = await res.json();
              setDoctors(data);
          } catch (err) {
            console.error("Error fetching doctors:", err);
          }
        };
        fetchDoctors();
      }, []);

      const filteredDoctors = doctors.filter(
        (doctor) =>
          doctor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const handleNewAvailabilityChange = (e) => {
        const { name, value } = e.target;
        setNewAvailability((prev) => ({ ...prev, [name]: value }));
      };

      const addAvailability = () => {
        if (
          !newAvailability.day ||
          !newAvailability.startTime ||
          !newAvailability.endTime
        ) {
          alert("Please fill all availability fields.");
          return;
        }
        setForm((prev) => ({
          ...prev,
          availability: [...prev.availability, newAvailability],
        }));
        setNewAvailability({ day: "", startTime: "", endTime: "" });
      };

      const removeAvailability = (index) => {
        const updated = [...form.availability];
        updated.splice(index, 1);
        setForm((prev) => ({ ...prev, availability: updated }));
      };

      const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch(
            "http://localhost:4000/api/auth/doctor/register",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...newDoctor,
                fee: parseInt(newDoctor.fee),
                availability: form.availability,
              }),
            }
          );
          const data = await res.json();
          if (res.ok) {
            alert("Doctor added successfully");
            setDoctors((prev) => [...prev, data]);
            setShowAddModal(false);
            setNewDoctor({
              fullName: "",
              email: "",
              password: "defaultPassword123",
              profilePic: "",
              role: "doctor",
              fee: 1000,
              specialization: "",
              qualifications: "",
            });
            setForm({ availability: [] });
          } else {
            alert(data.message || "Failed to add doctor");
          }
        } catch (err) {
          console.error("Error adding doctor:", err);
          alert("Something went wrong");
        }
      };

      return (
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Manage Doctors</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Plus className="h-5 w-5" /> Add Doctor
            </button>
          </div>

          <div className="flex items-center max-w-md border px-3 py-2 rounded bg-white">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-2 flex-1 outline-none"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  {/* <th className="p-3 border-b">Profile Image</th> */}
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Specialization</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Fee</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.length ? (
                  filteredDoctors.map((doc) => (
                    <tr key={doc._id} className="hover:bg-gray-50">
                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={doc.profilePic}
                          className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium"
                        ></img>
                        <span>{doc.fullName}</span>
                      </td>
                      <td className="p-3">{doc.specialization}</td>
                      <td className="p-3">{doc.email}</td>
                      <td className="p-3">Rs. {doc.fee}</td>
                      <td className="p-3 flex gap-2">
                        <EditButton
                          onClick={() => navigate(`/doctors/${doc._id}`)}
                        />
                        <DeleteButton
                          onClick={() => {
                            setDoctorToDelete(doc);
                            setShowDeleteModal(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No doctors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {showAddModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-xl w-full max-w-3xl p-8 space-y-8 shadow-2xl">
                <div className="flex justify-between items-center border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Add New Doctor
                  </h2>
                  <button onClick={() => setShowAddModal(false)}>
                    <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>

                <form onSubmit={handleAddDoctor} className="space-y-6">
                  {/* Doctor Info Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      Doctor Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        ["Full Name", "text", "fullName"],
                        ["Email", "email", "email"],
                        ["Password", "text", "password"],
                        ["Specialization", "select", "specialization"],
                        ["Qualifications", "text", "qualifications"],
                        ["Consultation Fee (NPR)", "number", "fee"],
                      ].map(([label, type, field]) => (
                        <div key={field}>
                          <label className="block text-gray-600 font-medium mb-1">
                            {label}
                          </label>
                          {type === "select" ? (
                            <select
                              value={newDoctor[field]}
                              onChange={(e) =>
                                setNewDoctor({
                                  ...newDoctor,
                                  [field]: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg p-3 outline-none bg-white"
                              required
                            >
                              <option value="">Select Specialization</option>
                              {specialization.map((spec) => (
                                <option key={spec} value={spec}>
                                  {spec}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              onDrop={(e) => e.preventDefault()}
                              type={type}
                              value={newDoctor[field]}
                              onChange={(e) =>
                                setNewDoctor({
                                  ...newDoctor,
                                  [field]: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg p-3 outline-none"
                              required
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      Doctor Availability
                    </h3>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <select
                        name="day"
                        value={newAvailability.day}
                        onChange={handleNewAvailabilityChange}
                        className="p-3 border rounded-lg w-full md:w-1/3 bg-gray-50"
                      >
                        <option value="">Select Day</option>
                        {daysOfWeek.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      <input
                        type="time"
                        name="startTime"
                        value={newAvailability.startTime}
                        onChange={handleNewAvailabilityChange}
                        className="p-3 border rounded-lg w-full md:w-1/4 bg-gray-50"
                      />
                      <input
                        type="time"
                        name="endTime"
                        value={newAvailability.endTime}
                        onChange={handleNewAvailabilityChange}
                        className="p-3 border rounded-lg w-full md:w-1/4 bg-gray-50"
                      />
                      <button
                        type="button"
                        onClick={addAvailability}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-lg"
                      >
                        Add Slot
                      </button>
                    </div>

                    {/* Availability Display */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {form.availability.map((slot, idx) => (
                        <div
                          key={idx}
                          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm flex items-center gap-2"
                        >
                          {slot.day}: {slot.startTime} - {slot.endTime}
                          <X
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => removeAvailability(idx)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
                    >
                      Add Doctor
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showDeleteModal && doctorToDelete && (
            <DeleteModal
              doctorToDelete={doctorToDelete}
              setShowDeleteModal={setShowDeleteModal}
              handleConfirmDelete={(doc) => {
                alert(`Doctor ${doc.fullName} deleted`);
                setShowDeleteModal(false);
              }}
            />
          )}
        </div>
      );
    }

    export default Doctors;

  

