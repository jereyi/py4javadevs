// https://www.freecodecamp.org/news/how-to-build-react-based-code-editor/

import React, { useEffect, useState } from "react";
import CodeEditorComponent from "../components/CodeEditorComponent";
import axios from "axios";
import { classnames, titleToFileName, wrappedText } from "../utils/general";
import { languageOptions } from "../utils/constants";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "../components/OutputWindow";
import CustomInput from "../components/CustomInput";
import ThemeDropdown from "../components/ThemeDropdown";
import LanguagesDropdown from "../components/LanguagesDropdown";
import { LanguageOption, OutputDetail, ThemeOption, ExerciseDetail} from "../utils/types";
import OutputDetails from "../components/OutputDetails";
import SidebarComponent from "../components/SidebarComponent";
import { useNavigate, useParams } from "react-router-dom";
import SolutionModal from "../components/SolutionModal";
import { SparklesIcon } from "@heroicons/react/24/solid";
import RecommendationModal from "../components/RecommendationModal";
import Markdown from "react-markdown";

const Exercise = () => {
  const [code, setCode] = useState(languageOptions[0].default);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState<OutputDetail | null>(null);
  const [processing, setProcessing] = useState<Boolean | null>(null);
  const [loading, setLoading] = useState<Boolean | null>(null);
  const [theme, setTheme] = useState<ThemeOption>({
    value: "github-light",
    label: "Github Light",
    key: "github-light",
  });
  const [language, setLanguage] = useState(languageOptions[0]);

  const [exercises, setExercises] = useState<Map<String, ExerciseDetail>>(new Map());

  const [isOpenSolutionModal, setIsOpenSolutionModal] = useState(false);
  const [isOpenRecommendationModal, setIsOpenRecommendationModal ] = useState(false);

  const [ recommendation, setRecommendation ] = useState("");

  const { title, question } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response;
    try {
      response = await fetch(`/get-exercise?title=${titleToFileName(title!)}`);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate('/404')
      }

    if (response?.ok) {
        response.json().then((data) => 
        {
          const exercisesMap = new Map<String, ExerciseDetail>();
          (data as ExerciseDetail[]).forEach((exercise, i) => exercisesMap.set(`q${i + 1}`, exercise));
          setExercises(exercisesMap);
          if (!question || !exercises.has(question)) {
            navigate(`/exercise/${titleToFileName(title!)}/q1`);
          }
        }
        );
    } else {
        console.error(`HTTP ${response?.status}: ${response?.statusText}`);
        navigate('/404')
    }
  };

  const fetchRecommendations = async () => {
    console.log(code);
    console.log(language.default);
    if (code.length == 0 || code == language.default) {
      showErrorToast("No code to analyze");
      return
    }
    console.log(code);
    let response;
    setLoading(true);
    setIsOpenRecommendationModal(true);
    try {
      // TODO: Add caching
      response = await fetch('/chat-gpt', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"code": code}),
      });
    } catch (error) {
      console.error("Error fetching recommendations: ", error);
      showErrorToast("Error fetching recommendations");
    }

    if (response?.ok) {
      response.json().then((data) => 
      {
        showSuccessToast("Fetched recommendations!");
        setRecommendation(data);
        console.log(data);
      }
      );
  } else {
      console.error(`HTTP ${response?.status}: ${response?.statusText}`);
      showErrorToast(`HTTP ${response?.status}: ${response?.statusText}`);
      setIsOpenRecommendationModal(false);
  }
  setLoading(false);
  }

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl: LanguageOption) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
    setCode(sl.default);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action: string, data: string) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    // SET UP .env file
    console.log(process.env.REACT_APP_RAPID_API_URL);
    console.log(process.env.REACT_APP_RAPID_API_HOST);
    console.log(process.env.REACT_APP_RAPID_API_KEY);
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };
  const checkStatus = async (token: string) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th: ThemeOption) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("github-light").then((_) =>
      setTheme({
        value: "github-light",
        label: "Github Light",
        key: "github-light",
      })
    );
  }, []);

  const showSuccessToast = (msg: string) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg?: string, timer?: number) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="px-16">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-row justify-between">
        <div className="flex">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown onSelectChange={handleThemeChange} theme={theme} />
        </div>
        </div>
        <div className="flex">
          <button
                  onClick={fetchRecommendations}
                  className="flex whitespace-nowrap border-2 border-black z-10 text-[1rem] rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0 my-2 mr-4"
                >
                  {loading ? "Loading..." : <><SparklesIcon className="w-6 h-6 mr-3"/> AI Analysis</> } 
          </button>
          <button
                onClick={() => setIsOpenSolutionModal(true)}
                className="border-2 border-black z-10 text-[1rem] rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0 my-2 mr-4"
              >
                View Solutions
        </button>
        </div>
      </div>
      <div className="flex flex-row lg:gap-8 flex-wrap lg:flex-nowrap items-start px-4 py-4">
        <SidebarComponent className="hidden xl:flex" title={title!} numExercises={exercises.size} currExercise={question!}/>
        <div className="flex flex-col min-w-[50%] w-full h-full pb-16 justify-start items-end">
          <CodeEditorComponent
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>
        <div className="md:right-container flex min-w-[30%] w-full flex-col">
          <div className="text-xl pb-8 hidden lg:block">
            <Markdown>{exercises.get(question!)?.question ?? ""}</Markdown>
          </div>
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 text-[1rem] rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
      <SolutionModal isOpen={isOpenSolutionModal} setIsOpen={setIsOpenSolutionModal} exercise={exercises.get(question!)}></SolutionModal>
      <RecommendationModal isOpen={isOpenRecommendationModal} setIsOpen={setIsOpenRecommendationModal} recommendation={recommendation} loading={loading}></RecommendationModal>
    </div>
  );
};
export default Exercise;
