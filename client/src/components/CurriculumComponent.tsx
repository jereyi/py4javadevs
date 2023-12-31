import React, { useEffect, useState } from "react";
import {
  BookOpenIcon,
  DocumentCheckIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import type { LessonDetail } from "../utils/types";
import { nameToDetailsMap } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { titleToFileName } from "../utils/general";
import Markdown from "react-markdown";
type LessonProps = {
  lessonNumber: number;
  lesson: LessonDetail;
};

const Curriculum = () => {
  const namesAndDescriptions = Array.from(nameToDetailsMap.values());
  const [isExpanded, setIsExpanded] = useState(false);
  const lessons: Array<LessonDetail> = isExpanded
    ? namesAndDescriptions
    : namesAndDescriptions.slice(0, 5);
  const [lesson, setLesson] = useState("");
  const [exercise, setExercise] = useState("");

  const navigate = useNavigate();

  const handleOnClickLesson = (lesson: LessonDetail) => {
    setLesson(lesson.title);
  };
  const handleOnClickExercise = (lesson: LessonDetail) => {
    setExercise(lesson.title);
  };

  useEffect(() => {
    if (lesson) {
      navigate(`/lesson/${titleToFileName(lesson)}`);
    } else if (exercise) {
      navigate(`/exercise/${titleToFileName(exercise)}/q1`);
    }
  }, [lesson, exercise]);

  const LessonSection = (props: LessonProps) => {
    return (
      <div className="py-5 border-black">
        <details className="group">
          <summary
            data-testid={`summary-${props.lessonNumber}`}
            className="flex justify-between items-center font-medium cursor-pointer"
          >
            <div className="flex items-center">
              <div className="rounded-full text-black text-2xl font-cal w-16 h-16 bg-white border-2 border-black flex justify-center items-center mx-8">
                {props.lessonNumber}
              </div>
              <div>
                <div className="text-2xl font-bold font-cal">
                  {props.lesson.title}
                </div>
              </div>
            </div>
            <span className="transition group-open:rotate-180 justify-end mr-4">
              <ChevronDownIcon className="h-6 w-6" />
            </span>
          </summary>
          <div className="ml-24">
            <Markdown className="text-black text-center text-xl mt-3 mb-7 pr-6 group-open:animate-fadeIn">
              {props.lesson.desc}
            </Markdown>
            <div className="flex justify-around items-center">
              <button
                className="flex items-center"
                onClick={() => handleOnClickLesson(props.lesson)}
              >
                <BookOpenIcon className="h-12 w-12 pl-1 mr-3"> </BookOpenIcon>
                <div className="font-semibold font-cal text-xl"> Lesson </div>
              </button>
              {props.lesson.hasExercises && (
                <button
                  className="flex items-center"
                  onClick={() => handleOnClickExercise(props.lesson)}
                >
                  <DocumentCheckIcon className="h-12 w-12 pl-1 mr-3"></DocumentCheckIcon>
                  <div className="font-semibold font-cal text-xl">Exercise</div>
                </button>
              )}
            </div>
          </div>
        </details>
      </div>
    );
  };

  return (
    <div className="bg-battleship-gray border-black border-2 min-w-fit">
      <div className="flex flex-col border-b-2 border-black px-6 py-2">
        <h2 className="font-bold text-2xl mt-5 mb-2 tracking-tight font-cal">
          Curriculum
        </h2>
        <p className="pb-4">
          {namesAndDescriptions.length} Lessons &#x2022; {Array.from(namesAndDescriptions.values()).filter(val => val.hasExercises).length} Practice Exercises
        </p>
      </div>
      <div className="grid divide-y divide-neutral-200">
        {lessons.map((lesson, i) => (
          <LessonSection
            lessonNumber={i + 1}
            lesson={lesson}
            key={`lessonSection-${i}`}
          ></LessonSection>
        ))}
        <div
          className="font-bold border-black"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="hover:opacity-20 flex justify-center items-center text-center h-20 cursor-pointer">
            {!isExpanded ? (
              `Show All ${namesAndDescriptions.length} Lessons`
            ) : (
              <ChevronUpIcon className="font-bold h-1/3 w-1/3"></ChevronUpIcon>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
