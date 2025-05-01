import FooterColumn from "./FooterColumn";

const FooterNavigation = () => {
  const navigationSections = [
    {
      title: "Services",
      links: [
        "Primary Care",
        "Specialist Care",
        "Mental Health Services",
        "Telehealth",
      ],
    },
    {
      title: "Find a Doctor",
      links: [
        "Top-Rated Doctors",
        "Appointment Scheduling",
        "Patient Reviews",
        "Doctor Profiles",
      ],
    },
    {
      title: "About Us",
      links: [
        "News and Updates",
        "Careers",
        "Community Involvement",
        "Contact Us",
      ],
    },
  ];

  return (
    <div className="flex flex-wrap gap-10 items-start min-w-60 max-md:max-w-full">
      {navigationSections.map((section, index) => (
        <FooterColumn key={index} title={section.title} links={section.links} />
      ))}
    </div>
  );
};

export default FooterNavigation;
