"use client";
import ContentSection from "./ContentSection";

const AboutUsSection = () => {
  return (
    <section className="flex flex-wrap gap-10 px-16 py-32 max-md:px-5 max-md:py-24">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/e2e8d3b3f7a84c20b8097dec32c134c9/e6560f6e4aaa36e87eab830f32cffa4eeea0ddd1?placeholderIfAbsent=true"
        alt="About Us"
        className="object-contain rounded-none aspect-[1.52] min-w-60 w-[621px] max-md:max-w-full"
      />
      <ContentSection />
    </section>
  );
};

export default AboutUsSection;
