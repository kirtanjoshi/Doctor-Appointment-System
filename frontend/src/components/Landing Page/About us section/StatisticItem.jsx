const StatisticItem = ({ value, label }) => {
    return (
      <article className="flex flex-col justify-center items-center min-w-60">
        <p className="text-6xl font-medium tracking-tighter text-cyan-700 max-md:text-4xl">
          {value}
        </p>
        <p className="mt-1 text-xl tracking-tight leading-9 text-zinc-500">
          {label}
        </p>
      </article>
    );
  };
  
  export default StatisticItem;
  