"use client";
import CompanyInfo from "./CompanyInfo";
import FooterNavigation from "./FooterNavigation";

const FooterSection = () => {
  return (
    <footer className="flex flex-wrap gap-10 justify-between items-start px-16 py-24 bg-zinc-900 max-md:px-5">
      <CompanyInfo />
      <FooterNavigation />
    </footer>
  );
};

export default FooterSection;
