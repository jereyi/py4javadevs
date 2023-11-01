import React from "react";
import { OutputDetail } from "../utils/types";

const OutputWindow = ({ outputDetails }: { outputDetails: OutputDetail | null }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-sm text-carrot-orange">
          {atob(outputDetails?.compile_output ?? "")}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-sm text-carrot-orange">
          {atob(outputDetails?.stdout ?? "") !== null
            ? `${atob(outputDetails?.stdout ?? "")}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-sm text-carrot-orange">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-sm text-carrot-orange">
          {atob(outputDetails?.stderr ?? "")}
        </pre>
      );
    }
  };
  return (
    <>
      <h1 className="font-bold text-xl font-cal mb-2">
        Output
      </h1>
      <div className="w-full h-56 bg-dim-gray rounded-md text-white font-normal text-sm border-2 border-black overflow-y-auto" data-testid="output">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

export default OutputWindow;