import React, { useContext } from "react";
import { py4JavaDevsDesc } from "../utils/constants";
import { CasUserContext } from "../context/casUserContext";
import { useNavigate } from "react-router-dom";
import { customButtonStyle } from "../utils/styles";

const Welcome = (props: {user: any}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-dim-gray py-8 px-8 md:px-16 lg:px-24 rounded-xl border-black border-2">
      <div>
        <div>
          <h1 className="text-3xl font-semibold font-cal text-white mb-5">
            Welcome {props.user?.displayName.split(" ")[0]}!
          </h1>
          <h2 className="w-2/3 text-white mb-10"> {py4JavaDevsDesc} </h2>

          <button
            className={customButtonStyle("max-w-full min-w-max w-1/3 px-2 py-2 text-lg")}
            onClick={() => navigate("/lesson/variables")}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
