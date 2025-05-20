import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignDoctor = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    qualifications: "",
    experience: "",
    fee: "",
    accountType: "doctor",
    availability: [],
  });

  const [newAvailability, setNewAvailability] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });

  const [profilePic, setProfilePic] = useState(null); // State to store the profile picture file
  const [profilePicPreview, setProfilePicPreview] = useState(""); // State for image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setProfilePicPreview(previewUrl);
    }
  };

  const handleNewAvailabilityChange = (e) => {
    const { name, value } = e.target;
    setNewAvailability({ ...newAvailability, [name]: value });
  };

  const addAvailability = () => {
    if (
      !newAvailability.day ||
      !newAvailability.startTime ||
      !newAvailability.endTime
    ) {
      return alert("Please fill in all availability fields.");
    }

    setForm((prev) => ({
      ...prev,
      availability: [
        ...prev.availability,
        {
          day: newAvailability.day,
          startTime: newAvailability.startTime,
          endTime: newAvailability.endTime,
        },
      ],
    }));

    setNewAvailability({ day: "", startTime: "", endTime: "" });
  };

  const removeAvailability = (index) => {
    setForm((prev) => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index),
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match.");
    }

    if (form.availability.length === 0) {
      return alert("Please add at least one availability slot.");
    }

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("specialization", form.specialization);
    formData.append("qualifications", form.qualifications);
    formData.append("experience", Number(form.experience));
    formData.append("fee", Number(form.fee));
    formData.append("accountType", form.accountType);
    formData.append("availability", JSON.stringify(form.availability)); // Stringify array for FormData
    if (profilePic) {
      formData.append("profilePic", profilePic); // Add profile picture file
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/doctor/register",
        {
          method: "POST",
          body: formData, // Send FormData instead of JSON
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.message || "Registration failed");

      alert("Registration successful!");
      setForm({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        specialization: "",
        qualifications: "",
        experience: "",
        fee: "",
        accountType: "doctor",
        availability: [],
      });
      setNewAvailability({ day: "", startTime: "", endTime: "" });
      setProfilePic(null);
      setProfilePicPreview("");
      setIsLogin(true);
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/doctor/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      alert("Login successful!");
      setForm({ ...form, email: "", password: "" });
      navigate("/auth/home");
    } catch (e) {
      alert(`Login Error: ${e.message}`);
    }
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="flex flex-col items-center mx-auto p-5 text-[#3D3743] bg-[#F3FBFA] min-h-screen">
      <div className="p-6 w-[500px] bg-white rounded-lg shadow-lg mt-10">
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <h1 className="text-xl font-semibold mb-3">
              Sign in to your account
            </h1>
            <p className="text-[#29293E] mb-6">
              Enter your credentials to access your account
            </p>

            <label>Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 mt-1 mb-3 rounded-lg border border-gray-300 bg-[#E8F0FE]"
              placeholder="kritana@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 mt-1 mb-3 rounded-lg border border-gray-300 bg-[#E8F0FE]"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <div className="flex justify-between mt-2">
              <label className="flex gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <a className="text-[#286F76]" href="#">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="bg-[#FFA829] text-white w-full p-3 mt-3 rounded-[30px] hover:bg-[#FF8A00] transition duration-200"
            >
              Sign in
            </button>

            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <span
                className="cursor-pointer text-blue-400 hover:text-blue-500"
                onClick={() => setIsLogin(false)}
              >
                Register here
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <h4 className="text-xl font-semibold mb-4">Create Account</h4>
            <p className="mb-4">
              Fill in your details to register a new account
            </p>

            {/* Profile Picture Upload */}
            <label>Profile Picture</label>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="w-full p-3 mt-1 rounded-lg border border-gray-300 bg-[#E8F0FE]"
              />
              {profilePicPreview && (
                <img
                  src={profilePicPreview}
                  alt="Profile Preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
            </div>

            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full p-3 mt-1 mb-3 rounded-lg border border-gray-300 bg-[#E8F0FE]"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              required
            />

            <div className="flex gap-4">
              <div className="w-1/2">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="w-full p-3 mt-1 mb-3 rounded-lg border border-gray-300 bg-[#E8F0FE]"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-3 mt-1 mb-3 rounded-lg border border-gray-300 bg-[#E8F0FE]"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full p-3 mt-1 mb-3 rounded-lg border border-gray-300 bg-[#E8F0FE]"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full p-3 mt-1 mb-3 rounded-lg border border-gray-300 bg-[#E8F0FE]"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <h6 className="text-lg font-semibold mt-5 mb-3">
              Professional Information
            </h6>

            <label>Specialization</label>
            <input
              type="text"
              name="specialization"
              className="w-full p-3 mt-1 mb-3 rounded-lg border border-gray-300 bg-[#E8F0FE]"
              placeholder="Your specialization"
              value={form.specialization}
              onChange={handleChange}
              required
            />

            <label>Qualifications</label>
            <input
              type="text"
              name="qualifications"
              className="w-full p-3 mt-1 mb-3 rounded-lg border border-gray-300 bg-[#E8F0FE]"
              placeholder="Your medical qualifications"
              value={form.qualifications}
              onChange={handleChange}
              required
            />

            <label>Years of Experience</label>
            <input
              type="number"
              name="experience"
              className="w-full p-3 mt-1 mb-3 rounded-lg border border-gray-300 bg-[#E8F0FE]"
              placeholder="Years of experience"
              value={form.experience}
              onChange={handleChange}
              required
            />

            <label>Consultation Fee</label>
            <input
              type="number"
              name="fee"
              className="w-full p-3 mt-1 mb-3 rounded-lg border border-gray-300 bg-[#E8F0FE]"
              placeholder="Consultation fee (e.g., 500)"
              value={form.fee}
              onChange={handleChange}
              required
            />

            <h6 className="my-3 font-semibold">Set Your Availability</h6>
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row gap-3 p-4 bg-[#E8F0FE] rounded-[6px]">
                <select
                  name="day"
                  value={newAvailability.day}
                  onChange={handleNewAvailabilityChange}
                  className="p-3 w-full sm:w-1/4 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="">Select Day</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <input
                  type="time"
                  name="startTime"
                  value={newAvailability.startTime}
                  onChange={handleNewAvailabilityChange}
                  className="p-3 w-full sm:w-1/4 border border-gray-300 rounded-lg bg-white"
                />
                <input
                  type="time"
                  name="endTime"
                  value={newAvailability.endTime}
                  onChange={handleNewAvailabilityChange}
                  className="p-3 w-full sm:w-1/4 border border-gray-300 rounded-lg bg-white"
                />
                <button
                  type="button"
                  onClick={addAvailability}
                  className="bg-[#286F76] text-white w-full sm:w-auto px-4 py-3 rounded-lg hover:bg-[#1F5A61] transition duration-200"
                >
                  Add Availability
                </button>
              </div>

              {form.availability.length > 0 && (
                <div className="mt-4">
                  <h6 className="text-sm font-medium text-[#29293E] mb-2">
                    Added Availability:
                  </h6>
                  {form.availability.map((slot, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 mb-2 bg-[#E8F0FE] rounded-lg"
                    >
                      <span className="text-[#29293E]">
                        {slot.day}: {slot.startTime} - {slot.endTime}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeAvailability(index)}
                        className="text-red-500 hover:text-red-700 transition duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <label className="flex items-start gap-2 my-3 p-3 bg-[#E8F0FE] rounded-lg">
              <input type="checkbox" className="mt-1" required />
              <p className="text-[#2F5760] text-sm">
                I agree to the Terms of Service and Privacy Policy
              </p>
            </label>

            <button
              type="submit"
              className="bg-[#FFA829] text-white w-full p-3 rounded-lg mt-3 hover:bg-[#FF8A00] transition duration-200"
            >
              Create Account
            </button>

            <p className="mt-5 text-center text-[#2E3F4E]">
              Already have an account?{" "}
              <span
                className="cursor-pointer text-blue-400 hover:text-blue-500"
                onClick={() => setIsLogin(true)}
              >
                Login here
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignDoctor;