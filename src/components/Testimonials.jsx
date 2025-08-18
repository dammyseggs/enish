import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import CTAButton from './CTAButton'; // Assuming CTAButton is in its own file
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useParticleEffect } from '../hooks/useParticleEffect';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const sectionRef = useRef(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });
  const { handleCanvasClick, canvasRef } = useParticleEffect(sectionRef);

  // Enhanced testimonials data
  const testimonialData = useMemo(() => [
    {
      name: 'Amara Okafor',
      role: 'Food Blogger',
      location: 'Lagos, Nigeria',
      quote: 'Best Jollof Rice in London! The flavors are so authentic, they transport me straight back to my grandmother\'s kitchen in Lagos. Every grain tells a story.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      date: '2 weeks ago',
      highlights: ['Jollof Rice', 'Authentic Flavors'],
    },
    {
      name: 'James Kensington',
      role: 'Business Executive',
      location: 'London, UK',
      quote: 'The suya skewers are absolutely phenomenal! Perfect blend of spices, tender meat, and that smoky flavor that\'s impossible to replicate. Service is world-class.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      date: '1 week ago',
      highlights: ['Suya Skewers', 'World-Class Service'],
    },
    {
      name: 'Chioma Adichie',
      role: 'Cultural Ambassador',
      location: 'Birmingham, UK',
      quote: 'Enish brings Nigerian culture to life through food. It\'s not just dining; it\'s a cultural experience that celebrates our heritage with elegance and pride.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      date: '3 days ago',
      highlights: ['Cultural Experience', 'Heritage Celebration'],
    },
    {
      name: 'Marcus Thompson',
      role: 'Food Critic',
      location: 'Manchester, UK',
      quote: 'A culinary journey that redefines Nigerian cuisine in the UK. The attention to detail, presentation, and authentic taste profiles are simply extraordinary.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      date: '5 days ago',
      highlights: ['Culinary Journey', 'Extraordinary Quality'],
    },
    {
      name: 'Fatima Al-Hassan',
      role: 'Chef & Restaurateur',
      location: 'Edinburgh, UK',
      quote: 'As a fellow chef, I\'m blown away by the complexity and depth of flavors. Enish has mastered the art of modern Nigerian cuisine while staying true to tradition.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      date: '1 week ago',
      highlights: ['Modern Nigerian', 'Traditional Mastery'],
    }
  ], []);

  useEffect(() => {
    setTestimonials(testimonialData);
  }, [testimonialData]);

  // Auto-rotate with pause on hover
  useEffect(() => {
    if (!testimonials.length || !isVisible) return;
    const autoRotateRef = setInterval(() => {
      if (!isAnimating) {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }
    }, 4000);
    return () => clearInterval(autoRotateRef);
  }, [testimonials.length, isVisible, isAnimating]);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current && window.innerWidth >= 768) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePos({ x, y });
      }
    };
    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Touch handlers for mobile swipe
  const handleSwipe = useCallback((direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (direction === 'next') {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    } else {
      setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, testimonials.length]);
  
  const handleTouchStart = useRef(0);
  const handleTouchEnd = useRef(0);

  const onTouchStart = useCallback((e) => {
    handleTouchEnd.current = 0; // Reset touch end
    handleTouchStart.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e) => {
    handleTouchEnd.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!handleTouchStart.current || !handleTouchEnd.current || isAnimating) return;
    const distance = handleTouchStart.current - handleTouchEnd.current;
    if (distance > 50) {
      handleSwipe('next');
    } else if (distance < -50) {
      handleSwipe('prev');
    }
  }, [isAnimating, handleSwipe]);

  const goToSlide = (index) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  if (!testimonials.length) return null;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden"
      role="region"
      aria-label="Customer testimonials"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-yellow-400/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
      </div>

      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-auto cursor-pointer"
        onClick={handleCanvasClick}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-4 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-10 sm:mb-10">
          <div className="inline-block">
            <h2 className={`text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Stories from Our Table
            </h2>
            <div className="mt-4 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
            </div>
          </div>
          <p className={`mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Discover why food lovers across the UK choose Enish for authentic Nigerian cuisine
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-all duration-600 ease-out"
              style={{
                transform: `translateX(-${current * 100}%)`,
                filter: isAnimating ? 'blur(2px)' : 'none'
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-full flex justify-center px-4"
                >
                  <div className={`max-w-4xl w-full transition-all duration-600 ${Math.abs(index - current) <= 1 ? 'opacity-100' : 'opacity-0'}`}>
                    <div
                      className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-gray-700/50 shadow-2xl hover:shadow-amber-400/20 transition-all duration-500 transform hover:scale-[1.02]"
                      style={{
                        transform: `perspective(1000px) rotateX(${mousePos.y * 2}deg) rotateY(${mousePos.x * 2}deg) scale(${current === index ? 1 : 0.95})`
                      }}
                    >
                      {/* Quote */}
                      <div className="text-center mb-8">
                        <svg className="w-12 h-12 text-amber-400/50 mx-auto mb-6" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M10 8C6.7 8 4 10.7 4 14v10c0 3.3 2.7 6 6 6h4c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-4v-2c0-1.1.9-2 2-2h2c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-2zm12 0c-3.3 0-6 2.7-6 6v10c0 3.3 2.7 6 6 6h4c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-4v-2c0-1.1.9-2 2-2h2c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-2z"/>
                        </svg>
                        <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-100 leading-relaxed italic">
                          {testimonial.quote}
                        </blockquote>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {testimonial.highlights.map((highlight, i) => (
                          <span key={i} className="px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-sm font-medium border border-amber-400/30">
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* Author Info */}
                      <div className="flex flex-col sm:flex-row items-center justify-center">
                        <div className="relative mb-4 sm:mb-0 sm:mr-6">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-amber-400 shadow-lg"
                            loading="lazy"
                          />
                          {testimonial.verified && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="text-center sm:text-left">
                          <h3 className="text-xl sm:text-2xl font-bold text-white">{testimonial.name}</h3>
                          <p className="text-amber-400 font-medium">{testimonial.role}</p>
                          <p className="text-gray-400 text-sm">{testimonial.location} • {testimonial.date}</p>
                          <div className="flex justify-center sm:justify-start mt-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-5 h-5 text-amber-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.375 2.45a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.375-2.45a1 1 0 00-1.175 0l-3.375 2.45c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.235 9.397c-.784-.57-.382-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={() => handleSwipe('prev')}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:scale-100"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => handleSwipe('next')}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:scale-100"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`relative w-12 h-3 rounded-full transition-all duration-300 ${
                  current === index ? 'bg-amber-400' : 'bg-gray-600 hover:bg-gray-500'
                } disabled:opacity-50`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                {current === index && (
                  <div className="absolute inset-0 bg-amber-400 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced CTA */}
        {/* <div className="text-center mt-16">
          <CTAButton
            href="#contact"
            label="Share Your Story"
            className="text-lg px-8 py-4 hover:scale-110 hover:shadow-2xl hover:shadow-amber-400/50 transform transition-all duration-300 group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            <span className="relative z-10 flex items-center">
              Share Your Story
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </CTAButton>
        </div> */}
      </div>
    </section>
  );
};

export default Testimonials;