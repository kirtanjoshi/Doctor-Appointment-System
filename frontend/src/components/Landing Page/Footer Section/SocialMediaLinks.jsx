const SocialMediaIcon = ({ src, alt }) => (
    <a
      href="#"
      className="flex gap-2.5 items-center p-2 w-10 h-10 bg-cyan-700 rounded-[99px] hover:bg-cyan-600 transition-colors"
      aria-label={`Visit our ${alt} page`}
    >
      <img src={src} alt={alt} className="object-contain w-6 aspect-square" />
    </a>
  );
  
  const SocialMediaLinks = () => {
    return (
      <div className="flex gap-6 items-start self-start mt-10">
        <SocialMediaIcon src="https://cdn.builder.io/api/v1/image/assets/e2e8d3b3f7a84c20b8097dec32c134c9/cbe818b5cfa2943d792bfad650e7f57b6d2b145d?placeholderIfAbsent=true" alt="Facebook" />
        <SocialMediaIcon src="https://cdn.builder.io/api/v1/image/assets/e2e8d3b3f7a84c20b8097dec32c134c9/06268d79e24731b5d0a0e41fe5445063a3f0780b?placeholderIfAbsent=true" alt="Instagram" />
        <SocialMediaIcon src="https://cdn.builder.io/api/v1/image/assets/e2e8d3b3f7a84c20b8097dec32c134c9/89e45db8daf32596d92bdfe2c54c934c439f0b3c?placeholderIfAbsent=true" alt="Twitter" />
      </div>
    );
  };
  
  export default SocialMediaLinks;
  