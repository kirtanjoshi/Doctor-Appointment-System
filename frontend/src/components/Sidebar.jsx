import { NavLink } from 'react-router-dom';
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


import { AuthContext } from "../context/UserContext";

const Sidebar =  () => {
  const menuItems = [
    { path: "/dashboard", name: "Dashboard", icon: HomeIcon },
    { path: "/appointments/:id", name: "Appointments", icon: CalendarIcon },
    {
      path: "/medical-records",
      name: "Medical Records",
      icon: DocumentTextIcon,
    },
    { path: "/messages", name: "Messages", icon: ChatBubbleLeftIcon },
    { path: "/find-doctors", name: "Find Doctors", icon: UserGroupIcon },
    { path: "/profile", name: "Profile", icon: UserIcon },
    { path: "/settings", name: "Settings", icon: Cog6ToothIcon },
  ];
  const { user, loading } = AuthContext();

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };

  console.log("User", user);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user) return <div className="p-4">No user data found.</div>;

  return (
    <div className="w-64 fixed left-0 top-0 h-screen bg-white shadow-lg flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary">MediBook</h1>
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
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-primary font-medium">KJ</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">| {user.patient.fullName}</p>
              <p className="text-xs text-gray-500">{user.patient.email}</p>
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