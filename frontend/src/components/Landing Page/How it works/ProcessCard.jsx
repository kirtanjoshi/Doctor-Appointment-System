const ProcessCard = ({ icon, image, title, description }) => {
    return (
      <article className="flex-1 min-w-[300px]">
        <button
          className="w-full p-8 bg-white rounded-xl border shadow-sm border-slate-200 text-left transition-all duration-300 hover:shadow-md hover:border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
          aria-label={`Learn more about ${title}`}
        >
          {icon && (
            <div className="flex justify-center items-center mb-5 bg-cyan-700 h-[65px] rounded-[33px] w-[65px] transition-transform duration-300 hover:scale-105">
              {icon}
            </div>
          )}
          {image && (
            <div className="transition-transform duration-300 hover:scale-105">
              {image}
            </div>
          )}
          <h3 className="mb-4 text-xl font-bold leading-8 text-gray-800">
            {title}
          </h3>
          <p className="text-xl font-bold leading-7 text-gray-400">
            {description}
          </p>
        </button>
      </article>
    );
  };
  
  export default ProcessCard;
  