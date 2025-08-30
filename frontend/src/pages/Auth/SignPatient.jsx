import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUpload } from "react-icons/fa";
import imageCompression from "browser-image-compression";

const SignPatient = () => {
  const [fullName, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


const handleRegister = async (e) => {
  e.preventDefault();

  // Basic validation
  if (!fullName) return alert("Please enter your full name!");
  if (!username) return alert("Please enter a patient name!");
  if (!email) return alert("Please enter your email!");
  if (!password) return alert("Please enter a password!");
  if (password !== confirmPassword) return alert("Passwords do not match!");
  if (!gender) return alert("Please select a gender!");
  if (!phone) return alert("Please enter a phone number!");
  if (!/^\d+$/.test(phone))
    return alert("Phone number must contain only digits!");
  if (!profilePic) return alert("Please upload a profile picture!");
  if (!age) return alert("Please enter your age!");

  // FormData object to handle file upload
  const formData = new FormData();
  formData.append("profilePic", profilePic); // profilePic should be a File object from input
  formData.append("fullName", fullName);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("role", "patient");
  formData.append("phone", phone);
  formData.append("gender", gender);
  formData.append("age", age);

  try {
    setLoading(true); 
    const res = await fetch(`${API_BASE_URL}/auth/patient/register`, {
      method: "POST",
      body: formData, // no Content-Type header; browser sets it with boundary
    });

    const data = await res.json();
    setLoading(false); 
    if (res.ok) {
      alert("Registration successful!");
      console.log("Registration successful:", data);
      navigate("/login");
    } else {
      alert(`Registration failed: ${data.message || "Unknown error"}`);
      console.error("Registration failed:", data);
    }
  } catch (error) {
     setLoading(false);
    console.error("Registration error:", error);
    alert(`Something went wrong: ${error.message}`);
  }
};




const handleProfilePicChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  });

  setProfilePic(compressedFile);
};


  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8 bg-[#F9F9F9] text-[#3D3743]">
      <div className="w-full max-w-xl bg-[#F3FBFA] p-6 rounded-[10px]">
        <h4 className="text-xl font-bold mb-1">Create an account</h4>
        <p className="mb-6 text-sm">
          Fill in your details to register a new account
        </p>
        <form onSubmit={handleRegister}>
          {/* Profile Image Upload */}
          <div className="flex justify-center mb-6">
            <label className="relative flex items-center justify-center w-[100px] h-[100px] bg-[#1F1F1F] rounded-full cursor-pointer hover:bg-[#2A2A2A] overflow-hidden">
              {profilePic ? (
                <img
                  src={URL.createObjectURL(profilePic)}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="flex flex-col items-center text-white text-xs">
                  <FaUpload className="text-xl mb-1" />
                  <span>Upload</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md text-[#2D2C45]"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-1">User Name</label>
              <input
                type="text"
                className="w-full p-2 border bg-[#E8F0FE] rounded-md text-[#2D2C45]"
                placeholder="Choose a user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md text-[#2D2C45]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-1">Gender</label>
              <select
                className="w-full p-2 border rounded-md text-[#2D2C45]"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-1">Phone</label>
              <input
                type="tel"
                className="w-full p-2 border rounded-md text-[#2D2C45]"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">Age</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md text-[#2D2C45]"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4 bg-white">
            <div className="flex-1">
              <label className="block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 border rounded-md text-black  placeholder-[#7C7368]"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute right-3 top-4.5 text-[#7C7368] cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <label className="block mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full p-3 border rounded-md text-black placeholder-[#7C7368]"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute right-3 top-4.5 text-[#7C7368] cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 my-4 border border-[#2F5760] rounded-md p-3">
            <input type="checkbox" className="mt-1" required />
            <p className="text-[#2F5760] text-sm">
              I agree to the Terms of Service and Privacy Policy
            </p>
          </div>

          {loading ? (
            <p>Loading.....</p>
          ) : (
            <button
              type="submit"
              className="w-full bg-[#FFA829] text-white py-2 rounded-md hover:bg-[#ff9f17] transition duration-200"
            >
              Create Account
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignPatient;
