const Badge = ({ icon, children }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center self-start px-6 py-2.5 text-xl font-medium tracking-tight text-cyan-700 bg-sky-50 rounded-[99px] max-md:px-5 max-md:max-w-full">
      <img
        src={icon}
        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
        alt=""
      />
      <p className="self-stretch my-auto max-md:max-w-full">{children}</p>
    </div>
  );
};

export default Badge;
