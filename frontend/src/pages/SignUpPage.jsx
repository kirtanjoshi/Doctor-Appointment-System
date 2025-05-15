
import SignPatient from "./SignPatient";
import SignDoctor from "./SignDoctor";

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      {/* Medicare Logo and Title */}
      <div className="flex items-center mb-6">
        <a
          href="#"
          className="flex gap-4 items-center self-start text-2xl font-semibold tracking-tighter text-cyan-700 whitespace-nowrap hover:text-cyan-600 transition-colors"
          aria-label="MediCare"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/e2e8d3b3f7a84c20b8097dec32c134c9/157d3078d46ee1531ba44dd8d05ecda0b18ae26f?placeholderIfAbsent=true"
            alt="MedEase Logo"
            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
          />
          <span className=" my-auto select-none">MedCare</span>
        </a>
      </div>
      <SignPatient />
    </div>
  );
};

export default SignUpPage;
