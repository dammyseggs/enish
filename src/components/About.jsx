import React, { useRef, useEffect, useState } from 'react';

const AboutUs = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <section 
      ref={sectionRef} 
      id="about-us" 
      className="relative flex flex-col lg:flex-row w-full min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-amber-500/15 to-orange-600/15 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            top: '20%',
            left: `${10 + mousePosition.x * 5}%`,
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 20}px)`,
          }}
        ></div>
        <div 
          className="absolute w-72 h-72 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-full blur-3xl transition-transform duration-1000 ease-out delay-300"
          style={{
            bottom: '25%',
            right: `${15 + mousePosition.y * 5}%`,
            transform: `translate(${-mousePosition.x * 20}px, ${-mousePosition.y * 30}px)`,
          }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Left Section: Premium Image Container */}
      <div className="relative w-full lg:w-1/2 h-[60vh] lg:h-screen overflow-hidden group">
        {/* Main Image with Parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ 
            backgroundImage: "url(/About1.jpg)",
            backgroundAttachment: 'fixed'
          }}
        ></div>
        
        {/* Lighter Premium Overlays - More Image Visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-orange-900/15"></div>
        
        {/* Animated Geometric Elements */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Main Decorative Frame */}
          <div 
            className={`relative w-[85%] h-[85%] transition-all duration-1500 ${
              isVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-1/4 rotate-3'
            }`}
          >
            {/* Outer Glowing Border - More Subtle */}
            <div className="absolute inset-0 border-2 border-amber-400/50 rounded-lg shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-pulse"></div>
            
            {/* Inner Elegant Frame */}
            <div className="absolute inset-4 border border-amber-400/30 rounded-lg"></div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400 rounded-br-lg"></div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10">
          <div className="w-3 h-3 bg-amber-400 rounded-full animate-ping"></div>
        </div>
        <div className="absolute bottom-20 right-12">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        {/* Premium Badge */}
        <div className={`absolute top-8 right-8 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}>
          <div className="bg-amber-500/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
            Est. Heritage
          </div>
        </div>
      </div>

      {/* Right Section: Premium Content */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 z-10">
        {/* Content Container */}
        <div className={`max-w-xl mx-auto text-white transition-all duration-1200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}>
          
          {/* Premium Header */}
          <div className={`mb-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="inline-block mb-4">
              <span className="text-amber-400 text-sm font-medium tracking-[0.3em] uppercase">
                Our Legacy, Our Promise
              </span>
              <div className="h-px bg-gradient-to-r from-amber-400 via-orange-500 to-transparent mt-2 w-24"></div>
            </div>
          </div>

          <h2 className={`text-4xl md:text-6xl font-extrabold mb-8 leading-tight transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              Authenticity
            </span>
            <span className="block text-white text-3xl md:text-4xl font-light mt-2">
              and Tradition on Every Plate
            </span>
          </h2>

          {/* Content Paragraphs with Staggered Animation */}
          <div className="space-y-8 text-gray-300 text-justify text-lg leading-relaxed font-light">
            <div className={`transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <p className="relative pl-6">
                <span className="absolute left-0 top-2 w-2 h-2 bg-amber-400 rounded-full"></span>
                At <span className="text-amber-300 font-semibold">Enish</span>, our story began with a simple desire: to share the rich, vibrant flavors of our Nigerian heritage with the world. We have been serving authentic Nigerian cuisine for over a decade!. 
              </p>
            </div>
            
            <div className={`transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <p className="relative pl-6">
                <span className="absolute left-0 top-2 w-2 h-2 bg-orange-500 rounded-full"></span>
                  With ten bustling branches across the London, one in Manchester and one in Dubai, we're proud to bring the diverse and flavourful dishes of Nigeria to our customers. Our chefs expertly prepare traditional favourites like Jollof Rice, Egusi Soup & all of your favourite dishes. At Enish, we're passionate about sharing the rich culinary traditions of Nigeria with the world. Come and join us for a truly authentic and delicious dining experience today! Welcome to the Enish family. </p>
            </div>
          </div>
          
          {/* Premium CTA */}
          <div className={`mt-13 transition-all duration-1000 delay-1200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-full blur-sm opacity-0 group-hover:opacity-70 transition-all duration-700"></div>
              <button className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 text-lg font-bold px-10 py-4 rounded-full transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] group-hover:from-orange-600 group-hover:to-amber-500">
                <span className="flex items-center space-x-3">
                  <span>Explore Our Menu</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className={`flex justify-start items-center mt-12 space-x-4 transition-all duration-1000 delay-1400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="w-12 h-px bg-gradient-to-r from-amber-400 to-transparent"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <div className="w-6 h-px bg-amber-400"></div>
            <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
            <div className="w-8 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Additional Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default AboutUs;