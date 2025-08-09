import { Route, Routes } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MenuTeaser from "./components/MenuTeaser";

function App() {
  

  return (
    <>
      <Navbar />
      <Hero />
      <MenuTeaser />
      {/* <About /> */}
    </>
  );
}

export default App
