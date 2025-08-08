// src/components/About.jsx
import React from 'react';

const About = () => {
  return (
    <section id="about" className="relative py-16 px-4 md:px-8 bg-enish-light overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-enish-dark mb-4 leading-tight">
            Our Story: A Taste of Home
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Enish is more than just a restaurant; it's a celebration of Nigerian culture and cuisine. We bring you authentic flavors in a vibrant and welcoming atmosphere, meticulously crafted to transport you to the heart of Nigeria. Our mission is to share our passion for food and community with the world.
          </p>
          <a
            href="#ourstory"
            className="text-enish-orange font-bold text-lg hover:underline transition-all duration-300"
          >
            Learn more about our journey &rarr;
          </a>
        </div>
        
        {/* Image & Background Shape Section */}
        <div className="relative md:w-1/2 flex justify-center md:justify-end z-0">
          {/* Main Image with Hover Effect and reduced size */}
          <div className="w-full md:w-3/4 overflow-hidden rounded-xl shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:rotate-1">
            <img 
              src="/welcome1.jpg" 
              alt="A photo of the Enish team and restaurant" 
              className="w-full h-auto object-cover" 
            />
          </div>

          {/* Decorative Background Shape */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-enish-orange rounded-full opacity-20 hidden md:block animate-pulse-slow"></div>
        </div>
      </div>
    </section>
  );
};

export default About;