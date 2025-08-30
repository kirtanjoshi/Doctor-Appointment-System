// pages/DoctorDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/doctors/${id}`);
        const data = await res.json();
        setDoctor(data);
      } catch (err) {
        console.error("Error loading doctor details:", err);
      }
    };
    fetchDoctor();
  }, [id]);
    
    console.log(doctor);

  if (!doctor) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{doctor.fullName}</h2>
      <p className="text-teal-600">{doctor.specialization}</p>
      <p>{doctor.qualifications}</p>
      <p>{doctor.experience} years of experience</p>
      <p>Fee: ₹{doctor.fee}</p>
      {/* Add form or booking options here */}
    </div>
  );
};

export default DoctorDetails;
