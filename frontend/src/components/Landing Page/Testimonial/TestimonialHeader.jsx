import React from "react";

const TestimonialHeader = ({ title, description }) => {
  return (
    <header className="flex flex-col items-center">
      <h1 className="text-4xl font-bold leading-none text-center text-cyan-700">
        {title}
      </h1>
      <p className="mt-4 text-lg leading-8 text-center text-neutral-600 w-[614px] max-md:max-w-full">
        {description}
      </p>
    </header>
  );
};

export default TestimonialHeader;
