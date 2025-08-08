import React from "react";

const CTAButton = ({ href, label, className = "", onClick }) => {
  return (
    <a
      href={href}
      className={`text-base font-semibold px-4 py-2 border border-amber-400 text-amber-400 rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {label}
    </a>
  );
};

export default CTAButton;
