
import SignPatient from "./SignPatient";
import SignDoctor from "./SignDoctor";

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      {/* Medicare Logo and Title */}
      <div className="flex items-center mb-6">
        <img src="/medicare.png" alt="Medicare Logo" className="h-12 mr-3" />
        <h1 className="text-2xl font-bold text-[#222E40]">MediCare</h1>
      </div>
      <SignPatient />
    </div>
  );
};

export default SignUpPage;
