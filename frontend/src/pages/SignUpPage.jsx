import React, { useState } from "react";
import SignPatient from "./SignPatient";
import SignDoctor from "./SignDoctor";

const SignUpPage = () => {
  const [isDoctor, setIsDoctor] = useState(false);

  return (
    <div className="flex flex-col items-center mt-10">
      {/* Medicare Logo and Title */}
      <div className="flex items-center mb-6">
        <img src="/medicare.png" alt="Medicare Logo" className="h-12 mr-3" />
        <h1 className="text-2xl font-bold text-[#222E40]">MediCare</h1>
      </div>

      {/* Switch Buttons */}
      <div className="bg-[#F1F5F9] py-2 px-4 flex justify-between w-[512px] h-[50px] rounded-[4px] border mb-4">
        <button
          onClick={() => setIsDoctor(false)}
          className={`${
            !isDoctor ? "bg-[#CBF3F0]" : "bg-[#F1F5F9]"
          } text-[#222E40] rounded-[16px] h-[36px] w-[217px] p-2`}
        >
          Patient
        </button>
        <button
          onClick={() => setIsDoctor(true)}
          className={`${
            isDoctor ? "bg-[#CBF3F0]" : "bg-[#F1F5F9]"
          } text-[#222E40] rounded-[16px] h-[36px] w-[217px] p-2`}
        >
          Doctor
        </button>
      </div>

      {/* Conditional Form */}
      {isDoctor ? <SignDoctor /> : <SignPatient />}
    </div>
  );
};

export default SignUpPage;
