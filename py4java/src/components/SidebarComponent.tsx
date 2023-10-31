'use client';

import { Sidebar } from 'flowbite-react';
import React from 'react';
import _ from "lodash";
import { useNavigate } from 'react-router-dom';


const SidebarComponent = ({className, title, numExercises, currExercise}: {className: string, title: string, numExercises: number, currExercise: string}) => {
  const navigate = useNavigate();
  return (
    <Sidebar className={className}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            {_.range(0, numExercises).map((i) => currExercise == `q${i + 1}` ? 

            <Sidebar.Item className="bg-sage hover:bg-sage cursor-default" key={`q${i+1}`}>
                <p className="px-8">
                Exercise {i+1}
                </p>
            </Sidebar.Item>
            : <Sidebar.Item key={`q${i+1}`}>
            <p className="cursor-pointer px-8" onClick={() => navigate(`/exercise/${title}/q${i+1}`)}>
            Exercise {i+1}
            </p>
        </Sidebar.Item>
            )
            }
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default SidebarComponent;

