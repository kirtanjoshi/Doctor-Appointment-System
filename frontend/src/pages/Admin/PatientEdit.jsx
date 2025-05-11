import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PatientEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch patient data on mount
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/patients/${id}`
        );
        const data = await response.json();
        setPatient(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch patient data", error);
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/patients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });
      if (response.ok) {
        alert("Patient information updated successfully!");
        navigate("/patients");
      } else {
        alert("Failed to update patient information.");
      }
    } catch (error) {
      console.error("Error updating patient", error);
      alert("An error occurred while updating patient information.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Patient Not Found
        </h2>
        <button
          onClick={() => navigate("/patients")}
          className="btn btn-primary"
        >
          Back to Patients
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-6 py-4">
      <h1 className="text-2xl font-bold">Edit Patient Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={patient.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={patient.phone}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={patient.dob}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={patient.gender}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Blood Group</label>
          <select
            name="bloodGroup"
            value={patient.bloodGroup || ""}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div className="col-span-2">
          <label>Address</label>
          <textarea
            name="address"
            value={patient.address}
            onChange={handleChange}
            className="form-input"
            rows={2}
          />
        </div>
        <div className="col-span-2">
          <label>Medical History</label>
          <textarea
            name="medicalHistory"
            value={patient.medicalHistory || ""}
            onChange={handleChange}
            className="form-input"
            rows={3}
          />
        </div>
        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={() => navigate("/patients")}
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatientEdit;
