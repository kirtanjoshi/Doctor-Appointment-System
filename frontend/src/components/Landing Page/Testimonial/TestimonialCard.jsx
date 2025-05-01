import React from "react";

const TestimonialCard = ({ imageUrl, title, content, name, role }) => {
  return (
    <article className="flex flex-col grow items-start px-10 py-12 w-full text-lg font-bold leading-none bg-white rounded-3xl border border-gray-300 border-solid text-neutral-600 max-md:px-5 max-md:mt-7">
      <img
        src={imageUrl}
        alt={`${name}'s testimonial`}
        className="object-contain w-20 rounded-none aspect-square"
      />
      <h2 className="mt-8 text-2xl text-zinc-800">{title}</h2>
      <p className="self-stretch mt-3 leading-8">{content}</p>
      <p className="mt-8 text-cyan-700">{name}</p>
      <p className="mt-2">{role}</p>
    </article>
  );
};

export default TestimonialCard;
