import React from "react";
import {
  UserIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  IdentificationIcon,
  BeakerIcon, // <-- REPLACES DropletIcon
} from "@heroicons/react/24/solid";

import { useContext } from "react";
import { AuthContext } from "../context/UserContext";


const PatientInfoCard = () => {

    const {user , loading} = useContext(AuthContext);

      if (loading) return <div className="p-4">Loading...</div>;
      if (!user) return <div className="p-4">No user data found.</div>;

  return (
    <div className="bg-[#ffffff] p-6 rounded-xl shadow-sm flex justify-between items-center mb-8">
      <div className="flex flex-col gap-4">
        <div className="flex gap-8 items-center flex-wrap">
          <div className="flex items-center gap-2">
            <div className="bg-[#dff3f3] p-3 rounded-full">
              <UserIcon className="h-5 w-5 text-teal-700" />
            </div>
            <div>
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-xs text-gray-500">Name</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#dff3f3] p-3 rounded-full">
              <UserGroupIcon className="h-5 w-5 text-teal-700" />
            </div>
            <div>
              <p className="font-semibold">{user.gender}</p>
              <p className="text-xs text-gray-500">Gender</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#dff3f3] p-3 rounded-full">
              <ArrowTrendingUpIcon className="h-5 w-5 text-teal-700" />
            </div>
            <div>
              <p className="font-semibold">24</p>
              <p className="text-xs text-gray-500">Age</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#dff3f3] p-3 rounded-full">
              <BeakerIcon className="h-5 w-5 text-teal-700" />
            </div>
            <div>
              <p className="font-semibold">O+</p>
              <p className="text-xs text-gray-500">Blood Type</p>
            </div>
          </div>
        </div>

        {/* <div className="flex gap-6 items-center flex-wrap">
          <div className="flex items-center gap-2">
            <div className="bg-[#dff3f3] p-2 rounded-full">
              <IdentificationIcon className="h-4 w-4 text-teal-700" />
            </div>
            <p className="text-sm text-gray-700">
              Consulting Doctor:{" "}
              <span className="text-teal-600 font-medium">Dr. Elina</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#dff3f3] p-2 rounded-full">
              <BuildingOfficeIcon className="h-4 w-4 text-teal-700" />
            </div>
            <p className="text-sm text-gray-700">
              Recent Visit:{" "}
              <span className="text-teal-600 font-medium">22/01/2025</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#dff3f3] p-2 rounded-full">
              <CalendarIcon className="h-4 w-4 text-teal-700" />
            </div>
            <p className="text-sm text-gray-700">
              Upcoming Visit:{" "}
              <span className="text-teal-600 font-medium">08/02/2025</span>
            </p>
          </div>
        </div> */}
      </div>

      <div>
        <img
          src={user.profilePic}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default PatientInfoCard;
