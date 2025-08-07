import React, { useState } from "react";

const NavDropdown = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
        <div
      className="relative hidden md:block" // Hidden on mobile, visible on desktop
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center hover:text-enish-orange transition-colors duration-300 focus:outline-none font-medium"
        aria-expanded={isOpen}
      >
        {title}
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-4 py-2 w-48 bg-enish-dark rounded-md shadow-xl animate-fadeInUp">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-2 text-sm text-white hover:bg-enish-orange/80 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
