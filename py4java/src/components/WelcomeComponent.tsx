import React, { useContext } from "react";
import { py4JavaDevsDesc } from "../utils/constants";
import { CasUserContext } from "../context/casUserContext";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const { user } = useContext(CasUserContext)!;
  const navigate = useNavigate();
  return (
    <div className="bg-dim-gray py-8 px-24 rounded-xl border-black border-2">
      <div>
        <div>
          <h1 className="text-3xl font-semibold font-cal text-white mb-5">
            Welcome {user?.displayName.split(" ")[0]}!
          </h1>
          <h2 className="w-2/3 text-white mb-10"> {py4JavaDevsDesc} </h2>

          <button className="border-2 border-black z-10 text-lg rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] w-1/3 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0 max-w-full"
          onClick={() => navigate('/lesson/variables')}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
