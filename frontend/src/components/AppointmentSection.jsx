import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentSection = ({ title, description }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No upcoming appointments</p>
        <button
          onClick={() => navigate('/find-doctors')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default AppointmentSection;