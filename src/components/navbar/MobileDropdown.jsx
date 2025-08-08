import { useState } from 'react';

const MobileDropdown = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-lg text-center border-none hover:text-enish-orange transition-colors duration-300"
        aria-expanded={isOpen}
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="flex flex-col items-center py-2 animate-fadeInDown">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2 text-md text-center border-b border-gray-700 text-gray-400 hover:text-enish-orange transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileDropdown;