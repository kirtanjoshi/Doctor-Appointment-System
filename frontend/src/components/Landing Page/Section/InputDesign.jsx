"use client";
import * as React from "react";

const ArrowIcon = () => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="arrow-icon"
    style={{ width: "24px", height: "24px" }}
  >
    <path
      d="M20.7806 12.7913L14.0306 19.5413C13.8899 19.682 13.699 19.7611 13.5 19.7611C13.301 19.7611 13.1101 19.682 12.9694 19.5413C12.8286 19.4006 12.7496 19.2097 12.7496 19.0107C12.7496 18.8116 12.8286 18.6208 12.9694 18.48L18.4397 13.0107H3.75C3.55109 13.0107 3.36032 12.9317 3.21967 12.791C3.07902 12.6503 3 12.4596 3 12.2607C3 12.0618 3.07902 11.871 3.21967 11.7303C3.36032 11.5897 3.55109 11.5107 3.75 11.5107H18.4397L12.9694 6.0413C12.8286 5.90057 12.7496 5.70969 12.7496 5.51067C12.7496 5.31165 12.8286 5.12078 12.9694 4.98005C13.1101 4.83932 13.301 4.76025 13.5 4.76025C13.699 4.76025 13.8899 4.83932 14.0306 4.98005L20.7806 11.73C20.8504 11.7997 20.9057 11.8824 20.9434 11.9735C20.9812 12.0645 21.0006 12.1621 21.0006 12.2607C21.0006 12.3592 20.9812 12.4568 20.9434 12.5479C20.9057 12.6389 20.8504 12.7216 20.7806 12.7913Z"
      fill="white"
    />
  </svg>
);

const BackgroundImage = () => (
  <div className="overflow-hidden relative bg-zinc-300 size-full">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/203a52441e823938091050e1ef7c4369541951f9"
      className="object-cover absolute top-2/4 left-2/4 w-full h-auto -translate-x-2/4 -translate-y-2/4"
      alt="Medical professional at work"
    />
  </div>
);

const CTAButtons = () => (
  <div className="flex gap-6 items-center max-md:flex-col max-md:gap-4 max-md:w-full max-sm:gap-3">
    <button className="px-12 py-4 text-xl font-medium tracking-tight leading-9 text-white bg-teal-300 hover:bg-teal-400 cursor-pointer duration-[0.3s] ease-[ease] rounded-[99px] transition-all max-md:w-full max-sm:px-8 max-sm:py-3.5 max-sm:text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
      Book Consultation Now
    </button>
    <button className="flex gap-2.5 justify-center items-center px-12 py-4 text-xl font-medium tracking-tight leading-9 text-white border border-white border-solid hover:bg-white/10 transition-all cursor-pointer duration-[0.3s] ease-[ease] rounded-[99px] max-md:w-full max-sm:px-8 max-sm:py-3.5 max-sm:text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
      <span>Learn More</span>
      <ArrowIcon />
    </button>
  </div>
);

const HeroContent = () => (
  <div className="flex absolute top-2/4 left-2/4 flex-col gap-12 items-center px-5 py-0 w-full -translate-x-2/4 -translate-y-2/4 max-w-[1200px]">
    <h1 className="text-7xl font-medium tracking-tighter leading-tight text-center text-white max-md:text-6xl max-sm:px-5 max-sm:py-0 max-sm:text-4xl">
      Start Your Health Journey Here
    </h1>
    <CTAButtons />
  </div>
);

function InputDesign() {
  return (
    <section className="overflow-hidden relative w-full h-[500px]">
      <BackgroundImage />
      <HeroContent />
    </section>
  );
}

export default InputDesign;
