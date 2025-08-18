import React, { useState, useEffect, useRef, useCallback } from "react";
import CTAButton from "./CTAButton";
import Event4 from "/Event4.mp4";
import Event1 from "/Event1.jpg";
import Event2 from "/Event2.jpg";
import Event5 from "/Event5.jpg";
import Event3 from "/Event3.jpg";

const EventsPromo = () => {
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const autoRotateIntervalRef = useRef(null);
  const swipeTimeoutRef = useRef(null);

  // Initialize events with useEffect (simulating API fetch)
  useEffect(() => {
    const fetchEvents = () => {
      const eventData = [
        {
          id: 1,
          title: "Ladies Night",
          date: "2025-08-20T19:00:00Z",
          description:
            "Dance the night away with cocktails and Nigerian vibes.",
          src: Event4,
          type: "video",
          cta: "Join Ladies Night",
        },
        {
          id: 2,
          title: "Yacht Dining Experience",
          date: "2025-08-22T18:00:00Z",
          description: "Savor signature Nigerian dishes on a luxurious yacht.",
          src: Event3,
          type: "image",
          cta: "Book Yacht Dining",
        },
        {
          id: 3,
          title: "Live Music Night",
          date: "2025-08-24T20:00:00Z",
          description: "Enjoy Afrobeats and Nigerian cuisine under the stars.",
          src: Event2,
          type: "image",
          cta: "Reserve Your Spot",
        },
        {
          id: 4,
          title: "Traditional Nigerian Festival",
          date: "2025-09-01T15:00:00Z",
          description:
            "Experience the colors and traditions of a Nigerian festival.",
          src: Event1,
          type: "image",
          cta: "Sign Up Now",
        },
        {
          id: 5,
          title: "Art & Culture Expo",
          date: "2025-09-10T19:30:00Z",
          description: "A curated exhibition of West African art and history.",
          src: Event5,
          type: "image",
          cta: "Discover More",
        },
      ];
      setEvents(eventData);
    };
    fetchEvents();
  }, []);

  // Responsive card sizing
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(3);
      } else if (window.innerWidth >= 640) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!events.length) return;
    const updateTimers = () => {
      setTimeLeft(
        events.reduce((acc, event) => {
          const timeDiff = new Date(event.date) - new Date();
          acc[event.title] =
            timeDiff <= 0
              ? { days: 0, hours: 0, minutes: 0, seconds: 0 }
              : {
                  days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
                  hours: Math.floor(
                    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                  ),
                  minutes: Math.floor(
                    (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
                  ),
                  seconds: Math.floor((timeDiff % (1000 * 60)) / 1000),
                };
          return acc;
        }, {})
      );
    };
    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [events]);

  // Swipe handling
  const handleTouchStart = (e) => {
    if (isSwiping) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (isSwiping || touchStart === null) return;
    const currentX = e.targetTouches[0].clientX;
    const distance = touchStart - currentX;
    if (Math.abs(distance) > 50) {
      setIsSwiping(true);
      if (distance > 0) {
        setCurrent((prev) =>
          prev >= events.length - cardsToShow ? 0 : prev + 1
        );
      } else {
        setCurrent((prev) =>
          prev === 0 ? events.length - cardsToShow : prev - 1
        );
      }
      clearTimeout(swipeTimeoutRef.current);
      swipeTimeoutRef.current = setTimeout(() => setIsSwiping(false), 500);
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  // Auto-rotate
  useEffect(() => {
    if (!events.length || events.length <= cardsToShow) return;
    if (isSwiping) {
      clearInterval(autoRotateIntervalRef.current);
      return;
    }
    autoRotateIntervalRef.current = setInterval(() => {
      setCurrent((prev) =>
        prev >= events.length - cardsToShow ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(autoRotateIntervalRef.current);
  }, [events.length, isSwiping, cardsToShow]);

  // Parallax background
  const handleScroll = useCallback(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const scrollPercent = (windowHeight - rect.top) / windowHeight;
        const bg = sectionRef.current.querySelector(".parallax-bg");
        if (bg) {
          const offset = scrollPercent * 10;
          bg.style.transform = `translateY(${offset}px)`;
        }
      }
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 480) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Particle effect
  const handleCTAEffect = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas || window.innerWidth < 480) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: x,
        y: y,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 6 - 3,
        speedY: Math.random() * 6 - 3,
        opacity: 1,
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.opacity > 0);
      particles.forEach((p) => {
        ctx.fillStyle = `rgba(251, 191, 36, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity -= 0.02;
      });
      if (particles.length > 0) {
        requestAnimationFrame(animateParticles);
      }
    };
    animateParticles();
  }, []);

  const handlePrev = () => {
    if (isSwiping) return;
    setIsSwiping(true);
    setCurrent((prev) => (prev === 0 ? events.length - cardsToShow : prev - 1));
    clearTimeout(swipeTimeoutRef.current);
    swipeTimeoutRef.current = setTimeout(() => setIsSwiping(false), 500);
  };

  const handleNext = () => {
    if (isSwiping) return;
    setIsSwiping(true);
    setCurrent((prev) => (prev >= events.length - cardsToShow ? 0 : prev + 1));
    clearTimeout(swipeTimeoutRef.current);
    swipeTimeoutRef.current = setTimeout(() => setIsSwiping(false), 500);
  };

  const totalSlides = Math.ceil(events.length / cardsToShow);

  return (
    <section
      id="events"
      className="py-12 sm:py-16 bg-gray-900 text-white relative overflow-hidden"
      role="region"
      aria-label="Events promotion"
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-30"
      ></canvas>
      <div className="parallax-bg absolute inset-0 bg-gray-900 pattern-ankara opacity-20"></div>
      {/* <svg
        className="absolute top-0 w-full h-12 sm:h-16 text-amber-400 animate-wave"
        viewBox="0 0 1440 60"
        fill="currentColor"
      >
        <path d="M0,60 C360,0 1080,120 1440,60 L1440,60 L0,60 Z" />
      </svg> */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 animate-hero-bounce">
          Join Our Exclusive Events
          <span className="block w-16 h-0.5 bg-amber-400 mx-auto mt-2"></span>
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className={`flex transition-transform duration-500 ease-in-out ${
                isSwiping ? "animate-sparkle" : ""
              }`}
              style={{
                transform: `translateX(-${(100 / cardsToShow) * current}%)`,
              }}
            >
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={`flex-none w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-4 transition-all duration-500`}
                >
                  <div
                    className={`bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 hover:shadow-amber-400/70 transition-all duration-300 animate-fade-in relative group ${
                      index >= current && index < current + cardsToShow
                        ? "border-2 border-amber-400 animate-sparkle"
                        : ""
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="relative overflow-hidden h-56 sm:min-h-60 lg:h-64">
                      {event.type === "video" ? (
                        <video
                          src={event.src}
                          autoPlay={true}
                          loop
                          muted
                          playsInline
                          loading="lazy"
                          className="w-full h-full object-cover rounded-t-lg group-hover:scale-110 transition-all duration-300"
                        />
                      ) : (
                        <img
                          src={event.src}
                          alt={event.title}
                          loading="lazy"
                          className="w-full h-full object-cover rounded-t-lg group-hover:scale-110 transition-all duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-gray-900/40 pattern-ankara opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <svg
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.752 11.168l-3.197-2.2A1 1 0 0010 9.768v4.464a1 1 0 001.555.832l3.197-2.2a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="p-3 sm:p-4 lg:p-6">
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-2 animate-slide-in-left">
                        {event.title}
                      </h3>
                      <p
                        className="text-xs sm:text-sm text-amber-400 mb-2 animate-pulse-timer"
                        aria-live="polite"
                      >
                        {timeLeft[event.title]
                          ? `${timeLeft[event.title].days}d ${
                              timeLeft[event.title].hours
                            }h ${timeLeft[event.title].minutes}m ${
                              timeLeft[event.title].seconds
                            }s left`
                          : "Event Ended"}
                      </p>
                      <p className="text-sm sm:text-base text-gray-300 mb-5 sm:mb-4 animate-fade-in animation-delay-200">
                        {event.description}
                      </p>
                      <CTAButton
                        href="#contact"
                        label={event.cta}
                        onClick={handleCTAEffect}
                        className="text-base sm:text-lg px-6 sm:px-5 py-2 sm:py-3 hover:scale-110 hover:shadow-[0_0_10px_rgba(251,191,36,0.7)] relative overflow-hidden group"
                      >
                        <span className="absolute inset-0 bg-amber-400/20 scale-0 rounded-full group-hover:scale-150 transition-transform duration-300 origin-center"></span>
                      </CTAButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-400/80 text-white p-3 sm:p-4 rounded-full hover:bg-amber-400 transition-colors duration-300 disabled:opacity-50"
            aria-label="Previous event slide"
            disabled={isSwiping}
          >
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-amber-400/80 text-white p-3 sm:p-4 rounded-full hover:bg-amber-400 transition-colors duration-300 disabled:opacity-50"
            aria-label="Next event slide"
            disabled={isSwiping}
          >
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div className="flex justify-center mt-4 sm:mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`w-3 sm:w-4 h-3 sm:h-4 rounded-full mx-1 transition-all duration-300 ${
                  Math.floor(current / cardsToShow) === index
                    ? "bg-amber-400"
                    : "bg-gray-600"
                } disabled:opacity-50`}
                onClick={() => {
                  if (!isSwiping) {
                    setCurrent(index * cardsToShow);
                    setIsSwiping(true);
                    clearTimeout(swipeTimeoutRef.current);
                    swipeTimeoutRef.current = setTimeout(
                      () => setIsSwiping(false),
                      500
                    );
                  }
                }}
                aria-label={`Event slide ${index + 1}`}
                disabled={isSwiping}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsPromo;
