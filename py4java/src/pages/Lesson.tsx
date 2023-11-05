import React, { useState, useEffect, useContext } from "react";
import { LessonDetail } from "../utils/types";
import { titleToFileName, wrappedText, capitalizeText } from "../utils/general";
import { InformationCircleIcon, ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import { Table } from "flowbite-react";
import { Popover } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { nameToDetailsMap } from "../utils/constants";
import Markdown from "react-markdown";
import { CasUserContext } from "../context/casUserContext";

type CurriculumRow = {
  topic: string;
  java?: string;
  python?: string;
  javaNote?: string;
  pythonNote?: string;
};

const popoverStyles = {
button: "mr-4 focus:outline-none focus-visible:outline-none",
icon: "h-6 w-6 text-white hover:opacity-50",
  parent: "absolute z-10 mt-3 w-64",
  child:
    "relative overflow-hidden rounded-lg left-8 -top-10 border-black border-2",
  inner: "bg-white p-5 whitespace-pre-wrap text-base text-gray-900",
};

const Lesson = () => {
  const [rows, setRows] = useState<CurriculumRow[]>([]);
  const [details, setDetails] = useState<LessonDetail | null>(null);
  const { user } = useContext(CasUserContext)!;

  let isComplete = false;

  const { title } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [title]);

  const fetchData = async () => {
    let response;
    try {
    response = await fetch(`/get-lesson?title=${titleToFileName(title!)}`);
    setDetails(nameToDetailsMap.get(title!)!);
    isComplete = user?.completedLessons.includes(title!) ?? false;
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate('/404')
    }

    if (response?.ok) {
        const json = await response.json();
        setRows(json as CurriculumRow[]);
    } else {
        console.error(`HTTP ${response?.status}: ${response?.statusText}`);
        navigate('/404')
    }

  };

  const handleMarkLesson = () => {
    console.log("mark lesson");
  }

  return (
    <div className="p-16 flex flex-col items-center">
    {isComplete && <div className="text-white font-cal text-2xl bg-sage py-2 px-32 mb-4 rounded-lg border-white border-2"> Complete </div>}
      <div className="mb-8 rounded-lg border-2 border-black">
        <Table className="w-max text-left bg-dim-gray text-white ">
          <caption className="p-5 text-4xl font-semibold font-cal text-left bg-dim-gray border-black text-white">
            {details?.title}
            <p className="mt-6 text-xl font-normal font-sans">{details?.desc}</p>
          </caption>
          <Table.Head className="text-xl">
            <Table.HeadCell
              scope="col"
              className="px-6 py-3 w-[20%] bg-dim-gray text-white border-y-2 border-black"
            >
              Topic
            </Table.HeadCell>
            <Table.HeadCell
              scope="col"
              className="px-6 py-3 w-[40%] bg-dim-gray text-white border-y-2 border-black"
            >
              Java
            </Table.HeadCell>
            <Table.HeadCell
              scope="col"
              className="px-6 py-3 w-[40%] bg-dim-gray text-white border-y-2 border-black"
            >
              Python
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {rows.map((row, i) => (
              <Table.Row
                className="border-black border-b-2 text-xl"
                key={`row-${i}`}
              >
                <Table.Cell scope="row" className="px-6 py-4">
                  <div className="pl-3">
                    <div className="font-semibold whitespace-normal">
                      {row.topic}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="px-6 py-4 whitespace-pre-wrap">
                  <div className="flex items-start min-w-max">
                    {row.javaNote && (
                      <Popover className="relative">
                        {({ open }) => (
                          <>
                            <Popover.Button
                              className={
                                "mr-4 focus:outline-none focus-visible:outline-none"
                              }
                            >
                              <InformationCircleIcon className="h-6 w-6 text-mustard hover:text-opacity-75"></InformationCircleIcon>
                            </Popover.Button>
                            <Popover.Panel className={popoverStyles.parent}>
                              <div className={popoverStyles.child}>
                                <div
                                ><Markdown>{row.javaNote ?? ""}</Markdown></div>
                              </div>
                            </Popover.Panel>
                          </>
                        )}
                      </Popover>
                    )}
                    <code>{row.java}</code>
                  </div>
                </Table.Cell>
                <Table.Cell className="px-6 py-4 whitespace-pre-wrap">
                  <div className="flex items-start min-w-max">
                    {row.pythonNote && (
                      <Popover className="relative">
                        {({ open }) => (
                          <>
                            <Popover.Button
                              className={
                                popoverStyles.button
                              }
                            >
                              <InformationCircleIcon className={popoverStyles.icon}></InformationCircleIcon>
                            </Popover.Button>
                            <Popover.Panel className={popoverStyles.parent}>
                              <div className={popoverStyles.child}>
                                <div
                                  className={popoverStyles.inner}
                                >
                                  <Markdown>{row.pythonNote ?? ""}</Markdown>
                                </div>
                              </div>
                            </Popover.Panel>
                          </>
                        )}
                      </Popover>
                    )}
                    <code> {row.python} </code>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <button className="mt-4 border-2 border-black z-10 text-lg rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0" onClick={() => navigate(`/exercise/${title}/q1`)}>
        Go to Practice Exercises
      </button>
      <div className="flex w-full justify-end">
        <button className="mt-16 mr-8 border-2 border-black z-10 text-lg rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0" onClick={() => handleMarkLesson()}>
            Mark Lesson as {isComplete ? "Incomplete" : "Complete"}
        </button>
        {details?.next && <button className="mt-16 flex border-2 border-black z-10 text-lg rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0" onClick={() => navigate(`/lesson/${titleToFileName(details.next!)}`)}>
            Next <ArrowSmallRightIcon className="h-6 w-6 ml-2"></ArrowSmallRightIcon>
        </button>}
      </div>
    </div>
  );
};

export default Lesson;
