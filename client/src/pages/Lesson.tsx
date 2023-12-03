import React, { useState, useEffect, useContext } from "react";
import { LessonDetail } from "../utils/types";
import {
  titleToFileName,
  wrappedText,
  capitalizeText,
  showSuccessToast,
} from "../utils/general";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  prism,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  InformationCircleIcon,
  ArrowSmallRightIcon,
  ArrowSmallLeftIcon,
} from "@heroicons/react/24/solid";
import { Table } from "flowbite-react";
import { Popover } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { nameToDetailsMap } from "../utils/constants";
import Markdown from "react-markdown";
import { CasUserContext } from "../context/casUserContext";
import axios, { AxiosError } from "axios";
import { ToastContainer } from "react-toastify";
import { showErrorToast } from "../utils/general";
import "react-toastify/dist/ReactToastify.css";
import { customButtonStyle } from "../utils/styles";
import LoadingOverlay from "../components/LoadingOverlay";

type CurriculumRow = {
  topic: string;
  java?: string;
  python?: string;
  javaNote?: string;
  pythonNote?: string;
};

const popoverStyles = {
  button: "ml-4 focus:outline-none focus-visible:outline-none",
  icon: "h-8 w-8 text-white hover:opacity-50",
  parent: "absolute z-50 mt-3 w-64",
  child:
    "relative overflow-auto z-50 rounded-lg left-8 -top-10 border-black border-2",
  inner:
    "bg-white overflow-auto p-5 z-50 whitespace-pre-wrap text-base text-gray-900",
};

const Lesson = () => {
  const [rows, setRows] = useState<CurriculumRow[]>([]);
  const [details, setDetails] = useState<LessonDetail | null>(null);
  const { user, setUser } = useContext(CasUserContext)!;
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { title } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  useEffect(() => {
    setIsComplete(user?.completedLessons.includes(title!) ?? false);
  }, [user, title]);

  const fetchData = async () => {
    let response;
    try {
      response = await fetch(`/get-lesson?title=${titleToFileName(title!)}`);
      setDetails(nameToDetailsMap.get(title!)!);
    } catch (error) {
      console.error("Error fetching lesson data");
      navigate("/404");
    }

    if (response?.ok) {
      const json = await response.json();
      setRows(json as CurriculumRow[]);
    } else {
      console.error(`HTTP ${response?.status}: ${response?.text}`);
      navigate("/404");
    }
  };

  const handleMarkLesson = async () => {
    const options = {
      method: isComplete ? "DELETE" : "PUT",
      url: "/update-user/lesson",
      data: { lesson: title },
    };
    try {
      setIsLoading(true);
      let response = await axios.request(options);
      // Update user to reflect changes to completed lessons
      response = await axios.get("/auth/getUser");

      const userInfo = JSON.parse(response.data);
      setUser({
        netid: userInfo.net_id,
        displayName: userInfo.display_name,
        firstLogin: new Date(userInfo.first_login),
        completedLessons: userInfo.completed_lessons,
      });
      showSuccessToast(
        "Successfully Updated Lesson");
    } catch (err) {
      console.log("Error Marking Lesson", err);
      showErrorToast("Error While Updating Lesson");
    }
    setIsComplete(user?.completedLessons.includes(title!) ?? false);
    setIsLoading(false);
  };

  return (
    <div className="relative w-screen min-h-screen">
      {user && rows.length > 0 ?
        <>
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
          <div className="px-24 py-16 flex flex-col items-center">
            {isComplete && (
              <div className="text-white font-cal text-2xl bg-sage py-2 px-32 mb-4 rounded-lg border-white border-2">
                Complete
              </div>
            )}
            <div className="mb-16 mx-8 rounded-lg border-2 border-black">
              <Table className="text-left bg-dim-gray text-white table-fixed">
                <caption className="p-5 text-4xl font-semibold font-cal text-left bg-dim-gray border-black text-white">
                  {details?.title}
                  <p className="mt-6 text-xl font-normal font-sans">
                    {details?.desc}
                  </p>
                </caption>
                <Table.Head className="text-xl">
                  <Table.HeadCell
                    scope="col"
                    className="px-6 py-3 w-[15%] bg-dim-gray text-white border-y-2 border-black"
                  >
                    Topic
                  </Table.HeadCell>
                  <Table.HeadCell
                    scope="col"
                    className="px-6 py-3 w-[45%] bg-dim-gray text-white border-y-2 border-black"
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
                      className="border-black border-b-2"
                      key={`row-${i}`}
                    >
                      <Table.Cell scope="row" className="px-6 py-4 w-[15%]">
                        <div className="">
                          <div className="font-semibold whitespace-normal text-xl">
                            {row.topic}
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="px-6 py-4 whitespace-pre-wrap w-[45%] text-base">
                        <div className="flex items-center">
                          <div className="w-[85%] text-xs">
                            {row.java && (
                              <SyntaxHighlighter
                                style={prism}
                                className="rounded-md border-2 border-black"
                                children={row.java}
                                language="java"
                              />
                            )}
                          </div>
                          <div className="w-[15%]">
                            {row.javaNote && (
                              <Popover className="relative">
                                {({ open }) => (
                                  <>
                                    <Popover.Button
                                      className={popoverStyles.button}
                                    >
                                      <InformationCircleIcon
                                        className={popoverStyles.icon}
                                      ></InformationCircleIcon>
                                    </Popover.Button>
                                    <Popover.Panel
                                      className={popoverStyles.parent}
                                    >
                                      <div className={popoverStyles.child}>
                                        <div className={popoverStyles.inner}>
                                          <Markdown
                                            className={"whitespace-pre-wrap"}
                                            children={row.javaNote ?? ""}
                                          />
                                        </div>
                                      </div>
                                    </Popover.Panel>
                                  </>
                                )}
                              </Popover>
                            )}
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="pl-6 py-4 whitespace-pre-wrap w-[40%] text-base">
                        <div className="flex items-center">
                          <div className="w-[85%] text-xs">
                            {row.python && (
                              <SyntaxHighlighter
                                style={prism}
                                className="rounded-md border-2 border-black w-full h-full"
                                children={row.python!}
                                language="python"
                              />
                            )}
                          </div>
                          <div className="w-[15%]">
                            {row.pythonNote && (
                              <Popover className="relative">
                                {({ open }) => (
                                  <>
                                    <Popover.Button
                                      className={popoverStyles.button}
                                    >
                                      <InformationCircleIcon
                                        className={popoverStyles.icon}
                                      ></InformationCircleIcon>
                                    </Popover.Button>
                                    <Popover.Panel
                                      className={popoverStyles.parent}
                                    >
                                      <div className={popoverStyles.child}>
                                        <div className={popoverStyles.inner}>
                                          <Markdown
                                            className={"whitespace-pre-wrap"}
                                            children={row.pythonNote!}
                                          />
                                        </div>
                                      </div>
                                    </Popover.Panel>
                                  </>
                                )}
                              </Popover>
                            )}
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>

            {details?.hasExercises && (
              <button
                className={customButtonStyle("z-10 text-lg px-4 py-2")}
                onClick={() => navigate(`/exercise/${title}/q1`)}
              >
                Go to Practice Exercises
              </button>
            )}
            <div className="flex w-full justify-end">
              {details?.prev && (
                <button
                  className={customButtonStyle(
                    "flex items-center z-10 mt-8 text-lg px-4 py-2"
                  )}
                  onClick={() =>
                    navigate(`/lesson/${titleToFileName(details.prev!)}`)
                  }
                >
                  <ArrowSmallLeftIcon className="h-6 w-6 mr-2"></ArrowSmallLeftIcon>
                  Prev
                </button>
              )}
              <button
                disabled={isLoading}
                className={customButtonStyle("z-10 mx-8 text-lg mt-8 px-4 py-2")}
                onClick={() => handleMarkLesson()}
              >
                {isLoading
                  ? "Loading..."
                  : isComplete
                    ? "Mark Lesson as Incomplete"
                    : "Mark Lesson as Complete"}
              </button>
              {details?.next && (
                <button
                  className={customButtonStyle(
                    "z-10 flex items-center mt-8 text-lg px-4 py-2"
                  )}
                  onClick={() =>
                    navigate(`/lesson/${titleToFileName(details.next!)}`)
                  }
                >
                  Next
                  <ArrowSmallRightIcon className="h-6 w-6 ml-2"></ArrowSmallRightIcon>
                </button>
              )}
            </div>
          </div>
        </> : <LoadingOverlay></LoadingOverlay>
      }
    </div>
  );
};

export default Lesson;
