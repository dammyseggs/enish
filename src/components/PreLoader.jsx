import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start fade out animation after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Completely hide the preloader after fade animation completes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-[999] bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center transition-all duration-1000 ${
      !isLoading ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-yellow-500/10 to-amber-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      {/* Logo Container */}
      <div className="relative flex flex-col items-center">
        {/* Main Logo with Bloom Effect */}
        <div className={`relative w-48 h-48 mb-8 transition-all duration-1500 ${
          isLoading ? 'animate-fade-in-bloom opacity-100 scale-100' : 'opacity-0 scale-110'
        }`}>
          {/* Background Bloom Effect */}
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat blur-xl opacity-60 animate-pulse-glow"
            style={{ 
              backgroundImage: "url(/Enish.avif)",
              filter: 'blur(20px) brightness(1.2) saturate(1.5)'
            }}
          ></div>
          
          {/* Main Logo */}
          <img
            src="/Enish.avif"
            alt="Enish Restaurants Logo"
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          />
          
          {/* Additional Glow Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-amber-400/20 animate-ping"></div>
        </div>

        {/* Loading Text */}
        <div className={`text-center transition-all duration-1000 delay-500 ${
          isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="text-xl font-light text-amber-200 mb-4 tracking-widest">
            AUTHENTIC NIGERIAN CUISINE
          </h2>
          
          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-200"></div>
          </div>
          
          <p className="text-amber-300/60 text-sm font-light">
            Preparing your culinary experience...
          </p>
        </div>
      </div>

      {/* Subtle Grain Texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]"></div>
      </div>

      <style jsx>{`
        @keyframes fade-in-bloom {
          0% {
            opacity: 0;
            transform: scale(0.8);
            filter: blur(10px);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.1);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        .animate-fade-in-bloom {
          animation: fade-in-bloom 1.5s ease-out;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
};

export default Preloader;

