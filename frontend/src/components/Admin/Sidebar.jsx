import React from "react";
import { NavLink } from "react-router-dom";
import { UserRound, Users, Stethoscope, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";
import { useContext } from "react";

import {

  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

function Sidebar() {

  
    const { user, loading, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      logoutUser();
      navigate("/login");
       toast.success("Logged out successfully");
      console.log("Logging out...");
    };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user) return <div className="p-4">No user data found.</div>;

  return (
    <aside className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Stethoscope className="text-teal-600 h-8 w-8" />
          <h1 className="text-2xl font-bold text-gray-800">MediCare</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink
          to="dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-700 hover:bg-teal-50 hover:text-teal-700 ${
              isActive ? "bg-teal-100 text-teal-700 font-semibold" : ""
            }`
          }
        >
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="doctors"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-700 hover:bg-teal-50 hover:text-teal-700 ${
              isActive ? "bg-teal-100 text-teal-700 font-semibold" : ""
            }`
          }
        >
          <UserRound className="h-5 w-5" />
          <span>Doctors</span>
        </NavLink>

        <NavLink
          to="patients"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-700 hover:bg-teal-50 hover:text-teal-700 ${
              isActive ? "bg-teal-100 text-teal-700 font-semibold" : ""
            }`
          }
        >
          <Users className="h-5 w-5" />
          <span>Patients</span>
        </NavLink>
      </nav>

      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.fullName}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-primary"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
