const Button = ({
    children,
    variant = "primary",
    className = "",
    ...props
  }) => {
    const baseStyles = {
      primary:
        "cursor-pointer px-12 py-4 text-xl font-medium tracking-tight bg-teal-400 text-white rounded-[99px] hover:bg-teal-500 transition-colors duration-200 max-md:px-6 max-md:py-3 max-md:text-lg",
      secondary:
        "cursor-pointer px-12 py-4 text-xl font-medium tracking-tight text-cyan-700 border border-cyan-700 border-solid rounded-[100px] flex gap-2 justify-center items-center hover:bg-cyan-50 transition-colors duration-200 max-md:px-6 max-md:py-3 max-md:text-lg",
      signup:
        "cursor-pointer px-5 py-3 text-orange-100 bg-amber-400 rounded-3xl border border-orange-200 border-solid hover:bg-amber-500 transition-colors duration-200 max-md:px-4 max-md:py-2 max-md:text-base",
    };
  
    return (
      <button className={`${baseStyles[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  };
  
  export default Button;
  