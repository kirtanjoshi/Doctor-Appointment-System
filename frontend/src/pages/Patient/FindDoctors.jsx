import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Inside FindDoctors component

const FindDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("");
const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/doctors");
        const data = await response.json();
        setDoctors(Array.isArray(data) ? data : data.doctors);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const fullName = doctor.fullName?.toLowerCase() || "";
      const specialization = doctor.specialization?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();
      const selectedSpecialty = specialty.toLowerCase();

      const matchesSearch =
        fullName.includes(search) || specialization.includes(search);
      const matchesSpecialty =
        !specialty || specialization === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });
  }, [searchTerm, specialty, doctors]);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Find a Doctor</h2>
      <p className="text-gray-600 mb-6">
        Find and book appointments with top doctors in your area
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by doctor name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-3 rounded-md w-full md:w-2/3"
        />
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="border border-gray-300 p-3 rounded-md w-full md:w-1/3"
        >
          <option value="">Filter by Specialty</option>
          {[...new Set(doctors.map((doc) => doc.specialization))].map(
            (spec, idx) => (
              <option key={idx} value={spec}>
                {spec}
              </option>
            )
          )}
        </select>
      </div>

      {filteredDoctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-teal-100 rounded-xl shadow-md overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={doctor.profilePic} className="bg-white text-center font-bold text-teal-800 rounded-full w-14 h-14 flex items-center justify-center text-lg shadow-sm">
                 
                  </img>
                  <div>
                    <h3 className="text-lg font-semibold">{doctor.fullName}</h3>
                    <p className="text-teal-800 font-medium">
                      {doctor.specialization}
                    </p>
                   
                  </div>
                
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>🗓 {doctor.experience}+ years experience</p>
                  <p>🎓 {doctor.qualifications}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="bg-teal-200 text-sm text-teal-800 px-2 py-1 rounded-full">
                    Next available: Today
                  </span>
                  <span className="bg-teal-200 text-sm text-teal-800 px-2 py-1 rounded-full">
                    Online consult
                  </span>
                </div>
              </div>
              <div className="border-t border-teal-200 p-4 flex justify-between items-center bg-white">
                <p className="text-gray-800 font-semibold">
                  ₹{doctor.fee} per visit
                </p>
                <button
                  className="bg-orange-400 text-white px-4 py-2 rounded-full hover:bg-orange-500 transition"
                  onClick={() => navigate(`/doctors/${doctor._id}`)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindDoctors;
