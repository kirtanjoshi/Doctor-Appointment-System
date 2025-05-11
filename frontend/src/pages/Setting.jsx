import React, { useState,  useRef, useContext } from "react";

import { AuthContext } from "../context/UserContext";

function Settings() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("account");
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    fullName: user.fullName || "",
    phone: user.phone || "",
    age: user.age || "",
    gender: user.gender || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/patient/update/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile: " + data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong.");
    }
  };

  const tabs = ["account", "security", "notifications"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Settings</h1>
      <p className="mb-6 text-gray-500">
        Manage your account settings and preferences
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-semibold capitalize transition-all duration-300 border ${
              activeTab === tab
                ? "bg-teal-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="relative min-h-[600px]">
        {/* ACCOUNT TAB */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            activeTab === "account"
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="bg-white shadow-lg p-8 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-teal-700">
              Account Information
            </h2>

            {/* Profile Image */}
            <div className="flex items-center gap-6">
              <img
                src={
                  profileImage ||
                  user.profilePic ||
                  "https://via.placeholder.com/80"
                }
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-teal-300"
              />
              <div>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
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

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <InputField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <InputField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <InputField
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={handleUpdateProfile}
                className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* SECURITY TAB */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            activeTab === "security"
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="bg-white shadow-lg p-8 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-teal-700">Password</h2>
            <p className="text-gray-500">
              Change your password to keep your account secure
            </p>

            <div className="space-y-4">
              <InputField label="Current Password" type="password" />
              <InputField label="New Password" type="password" />
              <InputField label="Confirm New Password" type="password" />
            </div>

            <div className="text-right">
              <button className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700">
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* NOTIFICATIONS TAB */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            activeTab === "notifications"
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="bg-white shadow-lg p-8 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-teal-700">
              Notification Preferences
            </h2>
            <div className="space-y-4">
              {[
                "Appointment Reminders",
                "Promotional Offers",
                "System Alerts",
              ].map((item) => (
                <ToggleSwitch key={item} label={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, type = "text", name, value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

function ToggleSwitch({ label }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-teal-600 transition-all"></div>
        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
      </label>
    </div>
  );
}

export default Settings;
