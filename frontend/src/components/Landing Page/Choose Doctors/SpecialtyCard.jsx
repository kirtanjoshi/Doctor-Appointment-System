"use client";
import React from "react";

const SpecialtyCard = ({ icon, title, description }) => {
  return (
    <article className="flex flex-col gap-6 items-start px-6 py-12 rounded-3xl bg-neutral-100 w-[424px] max-md:w-[calc(50%-12px)] max-sm:w-full cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:bg-neutral-50 hover:-translate-y-1">
      <div className="flex gap-2.5 items-start p-2 bg-neutral-200 rounded-[99px] transition-transform duration-300 group-hover:scale-105">
        <div dangerouslySetInnerHTML={{ __html: icon }} />
      </div>
      <div className="flex flex-col gap-2 items-start w-full">
        <h3 className="text-3xl font-medium tracking-tighter leading-10 text-neutral-900 max-md:text-3xl max-sm:text-2xl transition-colors duration-300 group-hover:text-cyan-700">
          {title}
        </h3>
        <p className="w-full text-xl tracking-tight leading-9 text-zinc-500 max-md:text-lg max-sm:text-base">
          {description}
        </p>
      </div>
      <button className="flex gap-2 items-center group/button">
        <span className="text-xl font-medium tracking-tight leading-8 text-amber-400 max-md:text-lg max-sm:text-base transition-all duration-300 group-hover/button:text-amber-500">
          Book Consultation
        </span>
        <div
          className="transition-transform duration-300 group-hover/button:translate-x-1"
          dangerouslySetInnerHTML={{
            __html: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[24px] h-[24px]">
            <path d="M20.7806 12.7914L14.0306 19.5414C13.8899 19.6821 13.699 19.7612 13.5 19.7612C13.301 19.7612 13.1101 19.6821 12.9694 19.5414C12.8286 19.4007 12.7496 19.2098 12.7496 19.0108C12.7496 18.8118 12.8286 18.6209 12.9694 18.4802L18.4397 13.0108H3.75C3.55109 13.0108 3.36032 12.9318 3.21967 12.7911C3.07902 12.6505 3 12.4597 3 12.2608C3 12.0619 3.07902 11.8711 3.21967 11.7305C3.36032 11.5898 3.55109 11.5108 3.75 11.5108H18.4397L12.9694 6.04142C12.8286 5.90069 12.7496 5.70982 12.7496 5.51079C12.7496 5.31177 12.8286 5.1209 12.9694 4.98017C13.1101 4.83944 13.301 4.76038 13.5 4.76038C13.699 4.76038 13.8899 4.83944 14.0306 4.98017L20.7806 11.7302C20.8504 11.7998 20.9057 11.8825 20.9434 11.9736C20.9812 12.0646 21.0006 12.1622 21.0006 12.2608C21.0006 12.3594 20.9812 12.4569 20.9434 12.548C20.9057 12.639 20.8504 12.7218 20.7806 12.7914Z" fill="#FFAD30"/>
          </svg>`,
          }}
        />
      </button>
    </article>
  );
};

export default SpecialtyCard;
