import { useState } from 'react';
import NavDropdown from './NavDropdown.jsx';
import MobileDropdown from './MobileDropdown.jsx'; 

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Contact', href: '#contact' },
  ];

  const locations = [
    { name: 'London', href: '#london' },
    { name: 'Manchester', href: '#manchester' },
    { name: 'Dubai', href: '#dubai' },
  ];

  const events = [
    { name: 'Upcoming Events', href: '#upcoming-events' },
    { name: 'Private Events', href: '#private-events' },
  ];

  const about = [
    { name: 'Our Story', href: '#ourstory'},
    { name: 'Our Team', href: '#ourteam'}
  ];

  return (
    <nav className="sticky top-0 z-50 bg-enish-dark text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/Enish.avif" alt="Enish Logo" className="h-8 md:h-10" />
        </a>

        {/* Desktop Menu - Hidden on mobile */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-enish-orange transition-colors duration-300 font-medium"
            >
              {link.name}
            </a>
          ))}
          <NavDropdown title="Locations" links={locations} />
          <NavDropdown title="Enish Events" links={events} />
          <NavDropdown title="About" links={about} />
          <a
            href="#booking"
            className="bg-enish-orange text-white px-6 py-2 rounded-full hover:bg-enish-orange/80 transition-colors duration-300 font-bold"
          >
            Book a Table
          </a>
          <a
            href="#"
            className="bg-white text-enish-dark px-6 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300 font-bold"
          >
            Order Online
          </a>
        </div>

        {/* Mobile Buttons - Order Online is now outside the collapsed nav */}
        <div className="md:hidden flex items-center space-x-4">
          <a
            href="#"
            className="bg-enish-orange text-white px-4 py-2 rounded-full font-bold text-sm"
          >
            Order Online
          </a>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-enish-orange"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Collapsed Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-enish-dark p-4 animate-fadeInUp shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2 text-lg text-center  hover:text-enish-orange transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className='flex flex-col items-center'>
            <MobileDropdown title="Locations" links={locations} />
            <MobileDropdown title="Enish Events" links={events} />
            <MobileDropdown title="About" links={about} />
          </div>
          <a
            href="#booking"
            className="block mt-4 py-3 text-lg text-center bg-white text-enish-dark rounded-full hover:bg-gray-200 transition-colors duration-300 font-bold"
            onClick={() => setIsMenuOpen(false)}
          >
            Book a Table
          </a>
        </div>
      )}
    </nav>
  );
};

export default Nav;