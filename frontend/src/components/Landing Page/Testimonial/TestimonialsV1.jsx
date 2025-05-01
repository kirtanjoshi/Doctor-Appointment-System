"use client";
import React from "react";
import TestimonialHeader from "./TestimonialHeader";
import TestimonialCard from "./TestimonialCard";

const TestimonialsV1 = () => {
  const testimonials = [
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/e2e8d3b3f7a84c20b8097dec32c134c9/be3b27d8cfb7622b1ff7c622111a7c0050d20cca?placeholderIfAbsent=true",
      title: '"An amazing service"',
      content:
        "Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc mauris scelerisque sed egestas.",
      name: "John Carter",
      role: "CEO at Google",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/e2e8d3b3f7a84c20b8097dec32c134c9/9d354a3fe4af5e460e51fc9277cc7c27c174ce6b?placeholderIfAbsent=true",
      title: '"One of a kind service"',
      content:
        "Ultrices eros in cursus turpis massa tincidunt sem nulla pharetra diam sit amet nisl suscipit adipis.",
      name: "Sophie Moore",
      role: "MD at Facebook",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/e2e8d3b3f7a84c20b8097dec32c134c9/358e3581b7b789dafc7ab9035b05dce52230098e?placeholderIfAbsent=true",
      title: '"The best service"',
      content:
        "Convallis posuere morbi leo urna molestie at elementum eu facilisis sapien pellentesque habitant.",
      name: "Andy Smith",
      role: "CEO Dot Austere",
    },
  ];

  return (
    <section className="overflow-hidden bg-white">
      <div className="flex flex-col items-center px-20 pt-9 pb-36 w-full bg-gray-200 max-md:px-5 max-md:pb-24 max-md:max-w-full">
        <div className="flex flex-col items-center mb-0 w-full max-w-[1220px] max-md:mb-2.5 max-md:max-w-full">
          <TestimonialHeader
            title="Testimonial"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan."
          />

          <div className="self-stretch mt-12 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-[33%] max-md:ml-0 max-md:w-full">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsV1;
