import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

function DoctorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const doctorData = getDoctor(id);
      if (doctorData) {
        setDoctor(doctorData);
      }
      setLoading(false);
    }
  }, [id]);
  
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (doctor) {
  //     setDoctor({ ...doctor, [name]: value });
  //   }
  // };
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert(`Doctor ${doctor?.name} information updated!`);
  //   navigate('/doctors');
  // };
  
  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }
  
  if (!doctor) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Doctor Not Found</h2>
        <button 
          onClick={() => navigate('/doctors')}
          className="btn btn-primary"
        >
          Back to Doctors
        </button>
      </div>
    );
  }
  
  return (
    // <div className="space-y-6">
    //   <div className="flex items-center gap-4">
    //     <button
    //       onClick={() => navigate('/doctors')}
    //       className="p-2 rounded-full hover:bg-gray-100"
    //     >
    //       <ArrowLeft className="h-5 w-5" />
    //     </button>
    //     <h1 className="text-3xl font-bold text-gray-800">Edit Doctor Profile</h1>
    //   </div>
      
    //   <form onSubmit={handleSubmit} className="edit-form max-w-4xl">
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //       <div className="form-group">
    //         <label htmlFor="name" className="form-label">Full Name</label>
    //         <input
    //           type="text"
    //           id="name"
    //           name="name"
    //           value={doctor.name}
    //           onChange={handleChange}
    //           className="form-input"
    //           required
    //         />
    //       </div>
          
    //       <div className="form-group">
    //         <label htmlFor="specialty" className="form-label">Specialty</label>
    //         <select
    //           id="specialty"
    //           name="specialty"
    //           value={doctor.specialty}
    //           onChange={handleChange}
    //           className="form-input"
    //           required
    //         >
    //           <option value="">Select Specialty</option>
    //           <option value="Cardiology">Cardiology</option>
    //           <option value="Dermatology">Dermatology</option>
    //           <option value="Neurology">Neurology</option>
    //           <option value="Pediatrics">Pediatrics</option>
    //           <option value="Orthopedics">Orthopedics</option>
    //           <option value="Gynecology">Gynecology</option>
    //           <option value="Ophthalmology">Ophthalmology</option>
    //           <option value="Psychiatry">Psychiatry</option>
    //         </select>
    //       </div>
          
    //       <div className="form-group">
    //         <label htmlFor="email" className="form-label">Email</label>
    //         <input
    //           type="email"
    //           id="email"
    //           name="email"
    //           value={doctor.email}
    //           onChange={handleChange}
    //           className="form-input"
    //           required
    //         />
    //       </div>
          
    //       <div className="form-group">
    //         <label htmlFor="phone" className="form-label">Phone</label>
    //         <input
    //           type="tel"
    //           id="phone"
    //           name="phone"
    //           value={doctor.phone}
    //           onChange={handleChange}
    //           className="form-input"
    //           required
    //         />
    //       </div>
          
    //       <div className="form-group">
    //         <label htmlFor="experience" className="form-label">Experience (years)</label>
    //         <input
    //           type="number"
    //           id="experience"
    //           name="experience"
    //           value={doctor.experience}
    //           onChange={handleChange}
    //           className="form-input"
    //           min="0"
    //         />
    //       </div>
    //     </div>
        
    //     <div className="form-group">
    //       <label htmlFor="address" className="form-label">Address</label>
    //       <textarea
    //         id="address"
    //         name="address"
    //         value={doctor.address}
    //         onChange={handleChange}
    //         className="form-input"
    //         rows={3}
    //       />
    //     </div>
        
    //     <div className="flex justify-end gap-4 mt-8">
    //       <button
    //         type="button"
    //         onClick={() => navigate('/doctors')}
    //         className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         type="submit"
    //         className="btn btn-primary flex items-center gap-2"
    //       >
    //         <Save className="h-5 w-5" />
    //         <span>Save Changes</span>
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <></>
  );
}

export default DoctorEdit;