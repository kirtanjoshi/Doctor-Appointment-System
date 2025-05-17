import { NavLink } from 'react-router-dom';

import { useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import { 
  HomeIcon, 
  CalendarIcon, 
  DocumentTextIcon, 
  ChatBubbleLeftIcon,
  UserGroupIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const Sidebar =  () => {
  const menuItems = [
    { path: "/patient/dashboard", name: "Dashboard", icon: HomeIcon },
    { path: "/appointments", name: "Appointments", icon: CalendarIcon },
    {
      path: "/medical-records",
      name: "Medical Records",
      icon: DocumentTextIcon,
    },
    { path: "/patient/find-doctors", name: "Find Doctors", icon: UserGroupIcon },
    { path: "/patient/settings", name: "Settings", icon: Cog6ToothIcon },
  ];
  const { user, loading  , logoutUser} = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();   
    navigate("/login");
     toast.success("Logged out successfully");
    console.log("Logging out...");
  };

  console.log("User", user);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user) return <div className="p-4">No user data found.</div>;

  return (
    <div className="w-64 fixed left-0 top-0 h-screen bg-white shadow-lg flex flex-col">
      <div className="p-4">
        <a
          href="#"
          className="flex gap-4 items-center self-start text-2xl font-semibold tracking-tighter text-cyan-700 whitespace-nowrap hover:text-cyan-600 transition-colors"
          aria-label="MediCare"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/e2e8d3b3f7a84c20b8097dec32c134c9/157d3078d46ee1531ba44dd8d05ecda0b18ae26f?placeholderIfAbsent=true"
            alt="MedEase Logo"
            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
          />
          <span className="self-stretch my-auto">MedCare</span>
        </a>
      </div>

      <nav className="flex-1 mt-8 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-secondary hover:text-primary ${
                isActive ? "bg-secondary text-primary" : ""
              }`
            }
          >
            <item.icon className="w-6 h-6 mr-3" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-10 bg-secondary rounded-full flex items-center justify-center">
              <img
                className="h-12 text-primary font-medium rounded-full"
                src={user.profilePic}
              ></img>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user.fullName}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-primary"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;