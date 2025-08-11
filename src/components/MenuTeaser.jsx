import React, { useState, useEffect, useRef } from 'react';
import Menu1 from '/Menu1.jpg'
import Menu2 from '/Menu2.jpg'
import Menu4 from '/Menu4.jpg'
import Menu5 from '/Menu5.jpg'


const dishes = [
  {
    name: 'Jollof Rice & Chicken',
    description: 'Artisanally crafted spicy rice with tender grilled chicken, an exquisite symphony of authentic Nigerian flavors.',
    price: '£12.99',
    image: Menu1,
    chef: 'Chef Signature',
  },
  {
    name: 'Suya Skewers',
    description: 'Premium beef skewers with our secret spicy peanut marinade, flame-grilled to absolute perfection.',
    price: '£9.99',
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=800',
    chef: 'House Special',
  },
  {
    name: 'Egusi Stew',
    description: 'Rich heritage melon seed stew with fresh spinach and premium meats, served with traditional pounded yam.',
    price: '£14.99',
    image: Menu2,
    chef: 'Heritage Recipe',
  },
  {
    name: 'Pounded Yam & Vegetable Soup',
    description: 'Silky smooth pounded yam paired with our signature vegetable medley and finest assorted meats.',
    price: '£13.99',
    image: Menu4,
    chef: 'Traditional Art',
  },
  {
    name: 'Peppered Snail',
    description: 'Delicate snails in our artisanal pepper infusion, a true Nigerian delicacy for the discerning palate.',
    price: '£11.99',
    image: Menu5,
    chef: 'Delicacy Master',
  },
];

const MenuTeaser = () => {
  const [current, setCurrent] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const autoPlayTimeout = useRef(null);
  const [cardsPerView, setCardsPerView] = useState(4);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const maxIndex = dishes.length - cardsPerView;

  // Handles responsive card view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(4);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
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

  // Carousel auto-play logic
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayTimeout.current = setTimeout(() => {
        setCurrent(prev => (prev >= maxIndex ? 0 : prev + 1));
        startAutoPlay();
      }, 6000);
    };
    startAutoPlay();
    return () => clearTimeout(autoPlayTimeout.current);
  }, [maxIndex, current]);

  const handleManualNav = (newIndex) => {
    clearTimeout(autoPlayTimeout.current);
    setCurrent(newIndex);
    autoPlayTimeout.current = setTimeout(() => {
      setCurrent(prev => (prev >= maxIndex ? 0 : prev + 1));
      handleManualNav((newIndex + 1) % (maxIndex + 1));
    }, 6000);
  };
  
  const handleNext = () => handleManualNav((current + 1) % (maxIndex + 1));
  const handlePrev = () => handleManualNav((current === 0 ? maxIndex : current - 1));

  return (
    <section 
      ref={sectionRef}
      id="menu-teaser" 
      className="relative py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-30 mix-blend-multiply">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-amber-400 tracking-[0.2em] uppercase">
              Culinary Excellence
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-2"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent leading-tight mb-6">
            Signature Collection
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed font-light">
            An extraordinary curation of our most cherished and authentic Nigerian masterpieces, 
            each dish crafted with uncompromising attention to tradition and excellence.
          </p>
          
          <div className="flex justify-center items-center mt-8 space-x-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <div className="w-8 h-px bg-amber-400"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
        </div>

        {/* Premium Carousel */}
        <div
          className={`relative group ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}
          onMouseEnter={() => clearTimeout(autoPlayTimeout.current)}
          onMouseLeave={() => {
            clearTimeout(autoPlayTimeout.current);
            handleManualNav(current);
          }}
        >
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-all duration-1000 ease-out"
              style={{
                transform: `translateX(-${current * (100 / cardsPerView)}%)`,
              }}
            >
              {dishes.map((dish, index) => (
                <div
                  key={index}
                  className="min-w-full sm:min-w-[50%] lg:min-w-[25%] p-3"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative group/card">
                    <div className={`absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-3xl blur-sm transition-all duration-700 ${hoveredCard === index ? 'opacity-60 scale-105' : 'opacity-0 scale-100'}`}></div>
                    
                    <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800/50 transition-all duration-700 transform-gpu hover:scale-[1.02] hover:border-amber-400/30">
                      <div className="relative overflow-hidden">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-72 object-cover transition-all duration-1000 group-hover/card:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
                        <div className={`absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent transition-opacity duration-500 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}></div>
                        
                        <div className="absolute top-4 right-4">
                          <span className="bg-amber-500/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                            {dish.chef}
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover/card:text-amber-300 transition-colors duration-300">
                          {dish.name}
                        </h3>
                        
                        <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
                          {dish.description}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                              {dish.price}
                            </span>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">per serving</span>
                          </div>
                          
                          <button className="group/btn relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-bold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-105">
                            <span className="relative z-10 text-sm">Order Now</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-gray-900/80 backdrop-blur-sm border border-amber-400/30 text-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-amber-400 hover:text-gray-900 hover:scale-110 z-20"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-gray-900/80 backdrop-blur-sm border border-amber-400/30 text-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-amber-400 hover:text-gray-900 hover:scale-110 z-20"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center mt-12 space-x-3">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`relative transition-all duration-500 ${
                  current === index 
                    ? "w-12 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" 
                    : "w-3 h-3 bg-gray-600 rounded-full hover:bg-gray-400"
                }`}
                onClick={() => handleManualNav(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Premium CTA */}
        <div className={`text-center mt-15 ${isVisible ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-full blur-sm opacity-0 group-hover:opacity-70 transition-all duration-700"></div>
            <button className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 text-xl font-bold px-12 py-5 rounded-full transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(245,158,11,0.4)] group-hover:from-orange-600 group-hover:to-amber-500">
              <span className="flex items-center space-x-3">
                <span>Explore Complete Collection</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuTeaser;