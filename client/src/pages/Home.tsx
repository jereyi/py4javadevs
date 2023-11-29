import React, { useContext } from "react";
import Welcome from "../components/WelcomeComponent";
import Stats from "../components/StatsComponent";
import Curriculum from "../components/CurriculumComponent";
import { CasUserContext } from "../context/casUserContext";
import LoadingOverlay from "../components/LoadingOverlay";

const Home = () => {
  const { user } = useContext(CasUserContext)!;
  return (
    <div className="relative w-screen min-h-screen">
      {user ? (
        <div className="pt-10 px-36">
          <div className="pb-16">
            <Welcome user={user}></Welcome>{" "}
          </div>
          <div className="pb-16">
            <Stats user={user}></Stats>{" "}
          </div>
          <div className="pb-32">
            {" "}
            <Curriculum></Curriculum>
          </div>
        </div>
      ) : (
        <LoadingOverlay></LoadingOverlay>
      )}
    </div>
  );
};

export default Home;
