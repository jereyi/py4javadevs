/***************************************************************************************
 *    Title: CodeRush source code
 *    Author: Arora, Manu
 *    Date: 2023
 *    Code version: 1.0
 *    Availability: https://github.com/manuarora700/react-code-editor
 *
 ***************************************************************************************/
import React, { useState } from "react";

type key = { key: string };
const useKeyPress = function (targetKey: string) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }: key) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }: key) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", downHandler);
    document.addEventListener("keyup", upHandler);

    return () => {
      document.removeEventListener("keydown", downHandler);
      document.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};

export default useKeyPress;
