import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Requires Heroicons

const SignInPage = () => {
  const [accountType, setAccountType] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error

    const endpoint = `http://localhost:4000/api/auth/${accountType}/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        await loginUser(data.token, accountType);

        if (accountType === "patient") navigate("/patient/dashboard");
        else if (accountType === "doctor") {
          alert("Doctor login successful");
          navigate("/doctor/dashboard");
        } else if (accountType === "admin") {
          alert("Admin login successful");
          navigate("/admin/dashboard");
        }
      } else {
        setErrorMessage(data.message || "Incorrect email or password");
        console.error("Login failed:", data);
      }
    } catch (error) {
      setErrorMessage("Login failed. Check your network or server.");
      console.error(`${accountType} login error:`, error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center mx-auto p-5 text-[#3D3743] border">
        <h1 className="text-center font-bold flex gap-3 text-[24px] font-Archivo">
          Welcome Back
        </h1>
        <p className="text-sm text-[#8895A6] pt-6">
          Enter your credentials to sign in to your account
        </p>

        {/* Account type toggle */}
        <div className="bg-[#F1F5F9] mt-10 py-2 px-4 flex justify-between w-[512px] h-[50px] rounded-[4px] border">
          {["patient", "doctor", "admin"].map((type) => (
            <button
              key={type}
              onClick={() => setAccountType(type)}
              className={`${
                accountType === type ? "bg-[#CBF3F0]" : "bg-[#F1F5F9]"
              } text-[#222E40] rounded-[16px] h-[36px] w-[160px] p-2 font-semibold`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <div className="p-5 w-[507px] mt-4 rounded-[10px]">
          <form onSubmit={handleLogin}>
            <label className="font-bold text-[15px]">Email</label>
            <input
              type="email"
              className="w-full p-3 border mt-1 bg-[#E8F0FE] mb-6 rounded-[6px]"
              placeholder="yourname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="font-bold text-[15px]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 bg-[#E8F0FE] rounded-[6px] border "
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-4 right-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>

            {/* Error message */}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="bg-[#FFA829] text-white w-full p-2 mt-5 rounded-[30px]"
            >
              Sign in
            </button>
          </form>

          {/* Redirect links */}
          <p className="mt-5 text-[#2F5760] text-center">
            Don't have an account?{" "}
            {accountType === "patient" ? (
              <Link
                to="/auth/signUp"
                className="cursor-pointer hover:text-blue-400"
              >
                Register Now
              </Link>
            ) : (
              <span className="text-gray-400">(Admin access only)</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
