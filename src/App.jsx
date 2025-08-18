import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MenuTeaser from "./components/MenuTeaser";
import Preloader from "./components/PreLoader";
import EventsPromo from "./components/EventsPromo";

function App() {
  const [isLoading, setIsLoading] = useState(true);
   const [isContentVisible, setIsContentVisible] = useState(false);
useEffect(() => {
    // Step 1: Hide the preloader after a set time.
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Same time as the preloader animation

    const contentTimer = setTimeout(() => {
      setIsContentVisible(true);
    }, 2500); // A small delay to ensure the preloader is fully gone.

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(contentTimer);
    };
  }, []);
  return (
    <div className="relative">
      {isLoading && <Preloader />}
      <div 
        className={`transition-opacity duration-700 ease-in-out ${
          isContentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navbar />
        <Hero />
        <About />
        <MenuTeaser />
        <EventsPromo />
      </div>
    </div>
  );
}

export default App;
