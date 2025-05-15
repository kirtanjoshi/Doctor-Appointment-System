import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex flex-wrap gap-5 justify-between items-center py-4 pr-14 pl-6 w-full text-base bg-neutral-100 shadow-[0px_0px_2px_rgba(23,26,31,0.12)] max-md:px-5 max-md:max-w-full">
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
        <span className="self-stretch my-auto">MedCare</span>
      </a>

      <div className="flex gap-10 self-stretch my-auto leading-relaxed text-zinc-700 max-md:gap-6 max-md:flex-wrap max-md:justify-center">
        <a
          href="#"
          className="rotate-[2.4492937051703357e-16rad] hover:text-blue-500 transition-colors duration-200 cursor-pointer max-md:text-sm"
        >
          Find Doctors
        </a>
        <a
          href="#"
          className="rotate-[2.4492937051703357e-16rad] hover:text-blue-500 transition-colors duration-200 cursor-pointer max-md:text-sm"
        >
          Hospitals
        </a>
        <a
          href="#"
          className="rotate-[2.4492937051703357e-16rad] text-zinc-700 hover:text-blue-500 transition-colors duration-200 cursor-pointer max-md:text-sm"
        >
          Services
        </a>
        <a
          href="#"
          className="rotate-[2.4492937051703357e-16rad] text-zinc-700 hover:text-blue-500 transition-colors duration-200 cursor-pointer max-md:text-sm"
        >
          About Us
        </a>
      </div>

      <div className="flex gap-9 self-stretch leading-relaxed max-md:gap-4">
        <Link
          to="/login"
          className="my-auto rotate-[2.4492937051703357e-16rad] text-zinc-700 hover:text-blue-500 transition-colors duration-200 cursor-pointer max-md:text-sm"
        >
          Log in.
        </Link>
        <Button
          variant="signup"
          className="max-md:text-sm"
          onClick={() => navigate("/auth/signUp")}
        >
          Sign up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
