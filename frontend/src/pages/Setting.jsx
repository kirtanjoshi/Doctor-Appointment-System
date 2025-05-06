import { useState, useRef } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const tabs = ["account", "security", "notifications"];

  return (
    <div className="p-6 max-w-4xl mx-auto text-sm md:text-base">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <p className="mb-4 text-gray-600">
        Manage your account settings and preferences
      </p>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium capitalize transition-all duration-300 ${
              activeTab === tab
                ? "bg-teal-100 text-black"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Container with fixed layout */}
      <div className="relative min-h-[600px]">
        {/* ACCOUNT */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            activeTab === "account"
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white shadow p-6 rounded-xl space-y-4">
            <h2 className="text-lg font-semibold">Account Information</h2>

            {/* Profile Image Upload */}
            <div className="flex items-center space-x-4">
              <img
                src={profileImage || "https://via.placeholder.com/80"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border border-teal-300"
              />
              <div>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="bg-teal-700 text-white px-3 py-1 rounded-md hover:bg-teal-800"
                >
                  Change Photo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  disabled
                  value="aayush"
                  className="w-full mt-1 p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your username cannot be changed
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  defaultValue="aayushkhadka@gmail.com"
                  className="w-full mt-1 p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  defaultValue="Aayush Khadka"
                  className="w-full mt-1 p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <input className="w-full mt-1 p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium">Address</label>
                <input className="w-full mt-1 p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full mt-1 p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Gender</label>
                <select className="w-full mt-1 p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300">
                  <option>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <button className="mt-4 bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800">
              Save Changes
            </button>
          </div>
        </div>

        {/* SECURITY */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            activeTab === "security"
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white shadow p-6 rounded-xl space-y-4">
            <h2 className="text-lg font-semibold">Password</h2>
            <p className="text-sm text-gray-600 mb-4">
              Change your password to keep your account secure
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>
            </div>
            <button className="mt-4 bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors">
              Update Password
            </button>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            activeTab === "notifications"
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white shadow p-6 rounded-xl space-y-4">
            <h2 className="text-lg font-semibold">Notification Preferences</h2>
            <div className="space-y-3">
              {[
                "Appointment Reminders",
                "Promotional Offers",
                "System Alerts",
              ].map((label) => (
                <div key={label} className="flex items-center justify-between">
                  <span>{label}</span>
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-teal-600 transition-colors duration-300"></div>
                    <span className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 transition-transform duration-300 transform peer-checked:translate-x-5"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
