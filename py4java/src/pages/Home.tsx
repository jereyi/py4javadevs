import React from "react";
import Welcome from "../components/WelcomeComponent";
import Stats from "../components/StatsComponent";
import Curriculum from "../components/CurriculumComponent";
const Home = () => {
  return (
  <>
  <div className="pt-10 px-36">
      <div className="pb-16"><Welcome></Welcome> </div>
      <div className="pb-16"><Stats></Stats> </div>
      <div className="pb-32">  <Curriculum></Curriculum></div>
  </div>
  </>);
};

export default Home;
