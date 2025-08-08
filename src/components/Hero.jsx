// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <header className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden" id="home">
      {/* Background Video */}
      <video
        key="hero-video" 
        autoPlay
        muted
        loop
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-0"
        poster="/jollofRice.jpg" // Corrected path to the public directory
      >
        {/* Make sure this video file is in your public directory */}
        <source src="/heroVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to darken the video and make text readable */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10"></div> */}

      {/* Hero Content */}
      <div className="relative z-20 p-4 animate-fadeInUp">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg leading-tight">
          Experience the Heart of Nigerian Cuisine
        </h1>
        <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
          A taste of home, an unforgettable experience.
        </p>
        <a
          href="#booking"
          className="inline-block bg-enish-orange text-white px-8 py-4 text-xl font-bold rounded-full hover:bg-enish-orange/80 transition-colors duration-300"
        >
          Book a Table
        </a>
      </div>
    </header>
  );
};

export default Hero;