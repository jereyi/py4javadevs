import React from "react";
import { OutputDetail } from "../utils/types";

const OutputDetails = ({ outputDetails } : {outputDetails: OutputDetail}) => {
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-lg font-cal">
        Status:{" "}
        <span className="mx-2 font-sans px-3 py-1 rounded-md bg-gray-100">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-lg font-cal">
        Memory:{" "}
        <span className="mx-2 font-sans px-3 py-1 rounded-md bg-gray-100">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-lg font-cal">
        Time:{" "}
        <span className="mx-2 font-sans px-3 py-1 rounded-md bg-gray-100">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;