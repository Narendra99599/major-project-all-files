import React from "react";
import Hero from "../components/Hero";
import About from '../components/About';
import Explore from "../components/Explore";
import GetStarted from "../components/GetStarted";
import WhatsNew from "../components/WhatsNew";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <About/>
      <Explore/>
      <GetStarted/>
      <WhatsNew/>
      <Footer/>
    </>
  );
};

export default Home;
