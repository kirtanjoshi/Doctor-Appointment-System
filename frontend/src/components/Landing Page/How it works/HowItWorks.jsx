"use client";
import { MagnifyingGlass } from "./MagnifyingGlass";
import SectionHeader from "./SectionHeader";
import ProcessCard from "./ProcessCard";

const HowItWorks = () => {
  return (
    <section className="flex flex-col gap-7 items-center px-5 py-10 w-full max-md:px-4 max-sm:px-3">
      <SectionHeader />
      <div className="flex gap-20 items-center w-full max-w-[1310px] max-md:flex-wrap max-md:gap-10 max-sm:gap-6">
        <ProcessCard
          icon={<MagnifyingGlass />}
          title="Search Doctor"
          description="Find the right specialist based on your needs, location, and availability."
        />
        <ProcessCard
          image={
            <img
              src="https://cdn-icons-png.flaticon.com/512/2278/2278049.png"
              alt="Calendar and appointment booking illustration"
              className="w-[77px] h-[76px] rounded-[6px] mb-[16px] object-contain"
              loading="lazy"
            />
          }
          title="Book Appointment"
          description="Select a convenient time slot and book your appointment instantly."
        />
        <ProcessCard
          image={
            <img
              src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
              alt="Medical care illustration"
              className="w-[76px] h-[76px] rounded-[38px] mb-[16px] object-contain"
              loading="lazy"
            />
          }
          title="Get Care"
          description="Visit your doctor at the scheduled time and receive the care you need."
        />
      </div>
    </section>
  );
};

export default HowItWorks;
