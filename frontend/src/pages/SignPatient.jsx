import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignPatient = () => {
  const [fullName, setFullname] = useState("");
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName) return alert("Please enter your full name!");
    if (!patientName) return alert("Please enter a patient name!");
    if (!email) return alert("Please enter your email!");
    if (!password) return alert("Please enter a password!");
    if (password !== confirmPassword) return alert("Passwords do not match!");
    if (!gender) return alert("Please select a gender!");
    if (!phone) return alert("Please enter a phone number!");
    if (!/^\d+$/.test(phone))
      return alert("Phone number must contain only digits!");

    const userData = {
      fullName,
      patientName,
      email,
      password,
      role: "patient",
      phone,
      gender,
    };

    try {
      const res = await fetch(
        "http://localhost:4000/api/auth/patient/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful!");
        navigate("/dashboard");
      } else {
        alert(`Registration failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(`Something went wrong: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto p-5 text-[#3D3743]">
      <div className="p-5 w-[507px] bg-[#F3FBFA] mt-10 rounded-[10px]">
        <h4 className="text-lg font-bold">Create an account</h4>
        <p className="mb-4 text-[#3D3743]">
          Fill in your details to register a new account
        </p>
        <form onSubmit={handleRegister}>
          <h5 className="mb-1 ">Account Type: Patient</h5>

          <label>Full Name</label>
          <input
            type="text"
            className="w-full p-2 border mt-1 mb-3 text-[#2D2C45]"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            required
          />

          <div className="flex flex-row justify-between gap-4">
            <div className="flex flex-col w-1/2">
              <label>Patient Name</label>
              <input
                type="text"
                className="bg-[#E8F0FE] text-[#2D2C45] border p-2 mt-2 mb-3 rounded-[6px] h-[46px]"
                placeholder="Choose a patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label>Email</label>
              <input
                type="email"
                className="p-2 mt-2 mb-3 border rounded-[6px] text-[#2D2C45] h-[46px]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-row justify-between gap-4">
            <div className="flex flex-col w-1/2">
              <label>Gender</label>
              <select
                className="p-2 mt-2 mb-3 border rounded-[6px] text-[#2D2C45] h-[46px]"
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
            <div className="flex flex-col w-1/2">
              <label>Phone</label>
              <input
                type="tel"
                className="p-2 mt-2 mb-3 border rounded-[6px] text-[#2D2C45] h-[46px]"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-row justify-between gap-4">
            <div className="flex flex-col w-1/2">
              <label>Password</label>
              <input
                type="password"
                className="bg-[#E8F0FE] text-[#2D2C45] border p-2 mt-2 mb-3 rounded-[6px] h-[46px]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label>Confirm Password</label>
              <input
                type="password"
                className="p-2 mt-2 mb-3 border rounded-[6px] text-[#2D2C45] h-[46px]"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-2 my-2 border border-[#2F5760] rounded-[5px] p-4">
            <input type="checkbox" className="mt-1" required />
            <p className="text-[#2F5760] text-sm">
              I agree to the Terms of Service and Privacy Policy
            </p>
          </div>

          <button
            type="submit"
            className="bg-[#FFA829] text-white w-full p-2 rounded-lg mt-3"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignPatient;
