// src/components/MenuTeaser.jsx
import React, { useState, useEffect, useRef } from 'react';
import Menu1 from '/Menu1.jpg';
import Menu2 from '/Menu2.jpg';
import Menu4 from '/Menu4.jpg';
import Menu5 from '/Menu5.jpg';
import Menu6 from '/Menu6.jpg';

const MenuTeaser = () => {
  const dishes = [
    {
      name: 'Jollof Rice & Chicken',
      description: 'Spicy, smoky rice with tender grilled chicken, bursting with Nigerian flavors.',
      price: '£12.99',
      image: Menu1,
    },
    {
      name: 'Suya Skewers',
      description: 'Juicy beef skewers with spicy peanut marinade, grilled to perfection.',
      price: '£9.99',
      image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Egusi Stew',
      description: 'Rich melon seed stew with spinach and assorted meats, served with pounded yam.',
      price: '£14.99',
      image: Menu2,
    },
    {
      name: 'Pounded Yam & Vegetable Soup',
      description: 'Smooth pounded yam paired with hearty vegetable stew and assorted meats.',
      price: '£13.99',
      image: Menu4,
    },
    {
      name: 'Peppered Snail',
      description: 'Tender snails cooked in a spicy pepper sauce, a Nigerian delicacy.',
      price: '£11.99',
      image: Menu5,
    },
    {
      name: 'Fried Plantain & Stew',
      description: 'Sweet, crispy plantain served with rich tomato stew and protein.',
      price: '£8.99',
      image: Menu6,
    },
  ];

  const [current, setCurrent] = useState(0);
  const autoPlayInterval = useRef(null);
  const [cardsPerView, setCardsPerView] = useState(4);
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
    handleResize(); // Initial call
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startAutoPlay = () => {
    autoPlayInterval.current = setInterval(() => {
      setCurrent(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
  };
  const stopAutoPlay = () => clearInterval(autoPlayInterval.current);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [maxIndex]);

  const handleNext = () => {
    stopAutoPlay();
    setCurrent(prev => (prev >= maxIndex ? 0 : prev + 1));
  };
  const handlePrev = () => {
    stopAutoPlay();
    setCurrent(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="menu-teaser" className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-down">
          <h2 className="text-3xl md:text-5xl font-extrabold text-enish-dark leading-tight">
            Our Signature Dishes
          </h2>
          <span className="block w-16 h-0.5 bg-amber-400 mx-auto mt-2"></span>
          <p className="mt-4 text-xl text-gray-600">
            A curated selection of our most beloved and authentic Nigerian meals.
          </p>
        </div>

        <div 
          className="relative group"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          <div className="overflow-hidden rounded-xl shadow-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * (100 / cardsPerView)}%)` }}
              role="region"
              aria-live="polite"
            >
              {dishes.map((dish, index) => (
                <div
                  key={index}
                  className="min-w-full sm:min-w-[50%] lg:min-w-[25%] p-2"
                >
                  <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden h-full group-hover:shadow-enish-orange/40 transition-all duration-300 transform-gpu hover:scale-105">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-48 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{dish.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-lg font-bold text-enish-orange">{dish.price}</span>
                        <a href="#order" className="text-sm font-medium text-enish-dark hover:underline">Order Now</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-enish-dark/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-enish-dark z-20"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-enish-dark/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-enish-dark z-20"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
          
          <div className="flex justify-center mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${current === index ? 'bg-enish-orange' : 'bg-gray-400'}`}
                onClick={() => {stopAutoPlay(); setCurrent(index);}}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#menu"
            className="inline-block bg-enish-orange text-white text-xl font-bold px-8 py-4 rounded-full transition-all duration-300 hover:bg-enish-dark hover:scale-105"
          >
            View Our Full Menu
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuTeaser;