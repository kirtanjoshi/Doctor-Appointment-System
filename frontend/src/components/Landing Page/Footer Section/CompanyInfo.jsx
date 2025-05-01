import SocialMediaLinks from "./SocialMediaLinks";

const CompanyInfo = () => {
  return (
    <div className="flex flex-col min-w-60 w-[424px] max-md:max-w-full">
      <div className="flex flex-col w-full max-w-[424px] max-md:max-w-full">
        <a
          href="#"
          className="flex gap-4 items-center self-start text-2xl font-semibold tracking-tighter text-cyan-700 whitespace-nowrap hover:text-cyan-600 transition-colors"
          aria-label="MedEase Home"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/e2e8d3b3f7a84c20b8097dec32c134c9/157d3078d46ee1531ba44dd8d05ecda0b18ae26f?placeholderIfAbsent=true"
            alt="MedEase Logo"
            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
          />
          <span className="self-stretch my-auto">MedEase</span>
        </a>
        <p className="mt-6 text-base tracking-tight leading-7 text-stone-300 max-md:max-w-full">
          MedEase simplifies healthcare with an easy-to-use platform for booking
          appointments, telehealth services, and managing patient records.
        </p>
      </div>
      <SocialMediaLinks />
    </div>
  );
};

export default CompanyInfo;
