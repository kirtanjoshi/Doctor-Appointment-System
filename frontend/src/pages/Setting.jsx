



import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../context/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function Settings() {
  const { user, setUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("account");
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    fullName: user.fullName || "",
    phone: user.phone || "",
    age: user.age || "",
    gender: user.gender || "",
  });

  const [profileImage, setProfileImage] = useState(
    user.profilePic || "https://via.placeholder.com/80"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateAccount = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("gender", formData.gender);

      if (selectedFile) {
        formDataToSend.append("profilePic", selectedFile);
      }

      const res = await fetch(
        `http://localhost:4000/api/patient/update/${user._id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );
      const data = await res.json();

      if (res.ok) {
        setUser(data.patient);
        // toast.success("Profile updated!");
      toast.success("Profile updated successfully!");
      } else {
        alert("Failed to update profile: " + data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong.");
      toast.loading("Loading...");
    }
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "New password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values) => {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("password", values.newPassword);
      formDataToSend.append("currentPassword", values.currentPassword);

      if (selectedFile) {
        formDataToSend.append("profilePic", selectedFile);
      }

      try {
        const res = await fetch(
          `http://localhost:4000/api/patient/update/${user._id}`,
          {
            method: "PUT",
            body: formDataToSend,
          }
        );
        const data = await res.json();

        if (res.ok) {
          setUser(data.patient);
          alert("Password updated successfully!");
        } else {
          if (data.error === "Incorrect current password") {
            formik.setErrors({ currentPassword: data.error });
          } else {
            alert("Failed to update password: " + data.message);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
      }
    },
  });

  const tabs = ["account", "security", "notifications"];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Settings</h1>
      <p className="mb-6 text-gray-500">
        Manage your account settings and preferences
      </p>

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

      <div className="relative min-h-[600px]">
        {activeTab === "account" && (
          <div className="bg-white shadow-lg p-8 rounded-2xl space-y-6 transition-all">
            <h2 className="text-xl font-bold text-teal-700">
              Account Information
            </h2>

            <div className="flex items-center gap-6">
              <img
                src={profileImage}
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
                  <option>male</option>
                  <option>female</option>
                  <option>other</option>
                </select>
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={handleUpdateAccount}
                className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="bg-white shadow-lg p-8 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-teal-700">Change Password</h2>
            <p className="text-gray-500">
              Change your password to keep your account secure
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <InputField
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.currentPassword &&
                  formik.touched.currentPassword && (
                    <p className="text-sm text-red-600">
                      {formik.errors.currentPassword}
                    </p>
                  )}
              </div>

              <div>
                <InputField
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <p className="text-sm text-red-600">
                    {formik.errors.newPassword}
                  </p>
                )}
              </div>

              <div>
                <InputField
                  label="Confirm New Password"
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <p className="text-sm text-red-600">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "notifications" && (
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
        )}
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
