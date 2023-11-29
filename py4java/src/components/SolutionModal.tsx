import { useState } from "react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "flowbite-react";
import { ExerciseDetail } from "../utils/types";
import { customButtonStyle } from "../utils/styles";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  prism,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import "react-toastify/dist/ReactToastify.css";
import { showInfoToast } from "../utils/general";
import copy from "copy-to-clipboard";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";

const SolutionModal = (props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  exercise: ExerciseDetail | undefined;
}) => {
  const [isJava, setIsJava] = useState(true);

  const activeStyles =
    "w-1/4 mr-2 text-air-force-blue font-black px-8 py-2 min-w-max";
  const baseStyles = "w-1/4 mr-2 text-black px-8 py-2 min-w-max";

  const copyToClipboard = () => {
    copy(isJava ? props.exercise!.java : props.exercise!.python);
    showInfoToast(`Solution copied to clipboard.`);
  };

  return (
    <span data-testid="solutionModal">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Modal
        show={props.isOpen}
        onClose={() => {
          props.setIsOpen(false);
          setIsJava(true);
        }}
        size="3xl"
      >
        <Modal.Header className="font-cal"> Exercise Solutions</Modal.Header>
        <Modal.Body className="w-full">
          {((isJava && props.exercise?.java) ||
            (!isJava && props.exercise?.python)) && (
            <SyntaxHighlighter
              style={prism}
              className="rounded-md border-2 border-black w-full h-full"
              children={isJava ? props.exercise!.java : props.exercise!.python}
              language="python"
            />
          )}
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <div>
            <button
              className={customButtonStyle(isJava ? activeStyles : baseStyles)}
              onClick={() => setIsJava(true)}
            >
              Java
            </button>
            <button
              className={customButtonStyle(isJava ? baseStyles : activeStyles)}
              onClick={() => setIsJava(false)}
            >
              Python
            </button>
          </div>
          <button
            className={customButtonStyle("px-2 py-2")}
            onClick={copyToClipboard}
          >
            <ClipboardDocumentIcon className="w-6 h-6"></ClipboardDocumentIcon>
          </button>
        </Modal.Footer>
      </Modal>
    </span>
  );
};

export default SolutionModal;
