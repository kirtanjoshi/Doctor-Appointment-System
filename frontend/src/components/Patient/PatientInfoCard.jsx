import React from "react";
import {
  UserIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  IdentificationIcon,
  BeakerIcon, // <-- REPLACES DropletIcon
  UserCircleIcon,
  BellIcon,
} from "@heroicons/react/24/solid";

import { useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import {useNavigate} from "react-router-dom";


const PatientInfoCard = () => {
    
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("Profile Picture:", user?.profilePicture);
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
        <div className="flex items-center">
        {user?.profilePic ? (
          <img
            src={user.profilePic}
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover"></img>):
         ( <div className="bg-teal-100 rounded-full p-3">
            <UserCircleIcon className="h-10 w-10 text-teal-600" />
          </div>)
        }
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.fullName || "John Doe"}
            </h2>
            <div className="flex flex-wrap gap-4 mt-1">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-600">Age:</span>{" "}
                {user?.age || "35"} years
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-600">gender:</span>{" "}
                {user?.gender}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-600">Patient ID:</span>{" "}
                {user?._id?.substring(0, 8) || "P-12345"}
              </p>
            </div>
          </div>
          <div className="ml-auto flex gap-2">
           
            <button
              onClick={() => navigate("/patient/settings")}
              className="px-4 py-2 text-sm font-medium text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    );
  };

export default PatientInfoCard;
