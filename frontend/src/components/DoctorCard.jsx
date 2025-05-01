import { StarIcon, MapPinIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/find-doctors/booking/${doctor.id}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
          <span className="text-primary text-xl font-bold">{doctor.initials}</span>
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold">{doctor.name}</h3>
          <p className="text-primary">{doctor.specialty}</p>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPinIcon className="w-5 h-5 mr-2" />
          <span>{doctor.address}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <ClockIcon className="w-5 h-5 mr-2" />
          <span>{doctor.experience} years experience</span>
        </div>
        <div className="flex items-center text-gray-600">
          <AcademicCapIcon className="w-5 h-5 mr-2" />
          <span>{doctor.qualifications}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div>
          <div className="flex items-center">
            <span className="text-gray-600">Next available: </span>
            <span className="ml-1 font-medium">Today</span>
          </div>
          <div className="flex items-center mt-1">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span className="ml-1 font-medium">{doctor.rating}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-primary font-bold">${doctor.price} per visit</p>
          <button 
            onClick={handleBooking}
            className="mt-2 bg-[#0D8A6A] text-white px-6 py-2 rounded-md hover:bg-[#0D8A6A]/90 transition-colors"

          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;