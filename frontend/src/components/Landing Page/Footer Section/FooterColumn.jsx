const FooterColumn = ({ title, links }) => {
    return (
      <div>
        <h3 className="text-xl font-medium tracking-tight text-white">{title}</h3>
        <nav>
          <ul className="mt-6 text-base tracking-tight text-stone-300">
            {links.map((link, index) => (
              <li key={index} className={index > 0 ? "mt-4" : ""}>
                <a href="#" className="hover:text-white transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  };
  
  export default FooterColumn;
  