import { useState } from 'react';
import React from 'react';
import { Button, Modal } from 'flowbite-react';
import { ExerciseDetail } from '../utils/types';
import { customButtonStyle } from '../utils/styles';

const SolutionModal = (props: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, exercise: ExerciseDetail | undefined}) => {
  const [isJava, setIsJava] = useState(true);

  const activeStyles = "w-1/4 mr-2 bg-air-force-blue text-white font-semibold px-4 py-2";
  const baseStyles = "w-1/4 mr-2 text-black px-4 py-2";

  return (
    <span data-testid="solutionModal">
      <Modal show={props.isOpen} onClose={() => props.setIsOpen(false)}>
        <Modal.Header className='font-cal'> Exercise Solutions</Modal.Header>
        <Modal.Body className='w-full'>
          <div className="w-full bg-battleship-gray p-4 rounded-md border-2 border-black">
            <code className="text-base leading-relaxed text-white w-full">
             {isJava ? props.exercise?.javaSolution : props.exercise?.pythonSolution }
            </code>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className={customButtonStyle(isJava ? activeStyles : baseStyles)} onClick={() => setIsJava(true)}>Java</button>
          <button className={customButtonStyle(isJava ? baseStyles : activeStyles)} onClick={() => setIsJava(false)}>
            Python
          </button>
        </Modal.Footer>
      </Modal>
    </span>
  )
}

export default SolutionModal;


