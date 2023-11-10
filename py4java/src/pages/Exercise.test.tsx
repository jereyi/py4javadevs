// https://github.com/suren-atoyan/monaco-react/issues/88
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "../App";
import { FetchResolver } from "../utils/fetchResolver";
import { CasUserContext } from "../context/casUserContext";
import { OutputDetail, Status, UserInfo } from "../utils/types";
import axios from "axios";

jest.mock("axios");

const variablesExerciseResponse = [
  {
    question:
      "Create a variable named `carname` and assign the value `Volvo` to it.",
    javaSolution: 'String carname = "Volvo";',
    pythonSolution: "carname = 'Volvo'",
  },
  {
    question: "Create a variable named `x` and assign the value `50` to it.",
    javaSolution: "int x = 50;",
    pythonSolution: "x = 50",
  },
];

const testCode = "Hello World";

const chatGptResponse = "Test Chat Gpt Response";

const testToken = "1234";

const outputDetails = {
  status: { id: 3, description: "Accepted" },
  memory: "1234",
  time: "0.001",
  stdout: "Hello World",
  compile_output: undefined,
  stderr: undefined,
};
describe("Exercise Page", () => {
  afterEach(() => {
    // Restores all mocks back to their original value.
    // only works when the mock was created with jest.spyOn;
    jest.restoreAllMocks();
  });

  let fetchResolver: FetchResolver;
  const setup = (timeout?: number, outputDetails?: OutputDetail) => {
    jest.mock("@monaco-editor/react");
    jest.mock("react-markdown");
    fetchResolver = new FetchResolver(timeout);
    fetchResolver.stub(
      "/get-exercise?title=variables",
      "GET",
      variablesExerciseResponse,
      200
    );
    fetchResolver.stub(
      "/chat-gpt",
      "POST",
      chatGptResponse,
      200,
      JSON.stringify({ code: testCode }),
      {
        "Content-Type": "application/json",
      },
      "same-origin"
    );

    let user = {
      netid: "jDoe",
      displayName: "Jane Doe",
      lastLogin: new Date("07/27/2023"),
      completedLessons: ["variables"],
    } as UserInfo;

    const setUser = (user: UserInfo) => {};

    render(
      <CasUserContext.Provider value={{ user, setUser }}>
        <App />
      </CasUserContext.Provider>
    );

    const exerciseButton = screen.getAllByRole("button")[2];
    fireEvent.click(exerciseButton);
  };

  test("renders exercise page correctly", async () => {
    setup();

    const sidebar = screen.getAllByRole("navigation")[1];
    const sidebarElements = await screen.findAllByRole("listitem");
    const languageDropdown = screen.getByText("Java (OpenJDK 13.0.1)");
    const themeDropdown = screen.getByText("Github Light");

    const aiAnalysisButton = screen.getByRole("button", {
      name: /ai analysis/i,
    });
    const viewSolutionButton = screen.getByRole("button", {
      name: /view solutions/i,
    });
    const compileAndExecuteButton = screen.getByRole("button", {
      name: /compile and execute/i,
    });

    const editor = screen.getAllByRole("textbox")[0];
    const inputBox = screen.getAllByRole("textbox")[1];
    const question = await screen.findByTestId("question");
    const outputBox = screen.getByTestId("output");

    const modal = screen.queryByRole("dialog");

    const spy = fetchResolver.getSpy();

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith("/get-exercise?title=variables");
    expect(sidebar).toBeVisible();
    expect(sidebarElements.length).toBe(2);
    sidebarElements.forEach((element, i) => {
      expect(element).toBeVisible();
      expect(element).toHaveTextContent(`Exercise ${i + 1}`);
    });
    expect(languageDropdown).toBeVisible();
    expect(themeDropdown).toBeVisible();
    expect(aiAnalysisButton).toBeVisible();
    expect(aiAnalysisButton).toBeEnabled();
    expect(viewSolutionButton).toBeVisible();
    expect(compileAndExecuteButton).toBeVisible();
    expect(compileAndExecuteButton).toBeDisabled();
    expect(inputBox).toBeVisible();
    expect(question).toBeVisible();
    expect(question).toHaveTextContent(variablesExerciseResponse[0].question);
    expect(outputBox).toBeVisible();
    expect(editor).toBeVisible();
    expect(editor).toHaveTextContent(/\/\/ write your solution here!/i);
    expect(modal).toBeNull();
  });

  test("toggles between exercises when sidebar clicked", async () => {
    setup();
    const exercise2 = await screen.findByText("Exercise 2");
    const question = await screen.findByTestId("question");
    fireEvent.click(exercise2);
    expect(question).toHaveTextContent(variablesExerciseResponse[1].question);
  });

  test("opens solution modal when button clicked", async () => {
    setup();
    let solutionModal = screen.queryByRole("dialog");
    const viewSolutionButton = screen.getByRole("button", {
      name: /view solutions/i,
    });

    expect(solutionModal).toBeNull();

    fireEvent.click(viewSolutionButton);

    solutionModal = screen.queryByRole("dialog");
    expect(solutionModal).toBeVisible();
    expect(solutionModal).toHaveTextContent("Exercise Solutions");
    expect(solutionModal).toHaveTextContent("Java");
    expect(solutionModal).toHaveTextContent("Python");

    const solution = await screen.findByText(
      variablesExerciseResponse[0].javaSolution
    );
    expect(solution).toBeVisible();
  });

  test("switched between python and java solutions when button clicked", async () => {
    setup();
    const viewSolutionButton = screen.getByRole("button", {
      name: /view solutions/i,
    });

    fireEvent.click(viewSolutionButton);

    const pythonButton = screen.getByRole("button", {
      name: /python/i,
    });

    fireEvent.click(pythonButton);

    const pythonSolution = await screen.findByText(
      variablesExerciseResponse[0].pythonSolution
    );
    const javaSolution = screen.queryByText(
      variablesExerciseResponse[0].javaSolution
    );
    expect(pythonSolution).toBeVisible();
    expect(javaSolution).toBeNull();
  });

  //
  test("text changes when value typed in textbox", async () => {
    setup();
    const editor = screen.getAllByRole("textbox")[0];
    fireEvent.change(editor, {
      target: { value: testCode },
    });

    expect(editor).toBeVisible();
    expect(editor).toHaveTextContent(testCode);
  });

  test("compile and execute button disabled when no code written", async () => {
    setup();

    const compileAndExecuteButton = screen.getByRole("button", {
      name: /compile and execute/i,
    });

    expect(compileAndExecuteButton).toBeDisabled();

    const editor = screen.getAllByRole("textbox")[0];
    fireEvent.change(editor, {
      target: { value: "" },
    });
    expect(compileAndExecuteButton).toBeDisabled();
  });

  test("makes api call when compile and execute button clicked", async () => {
    setup(0);

    (axios.request as any)
      .mockImplementationOnce(() => {
        return new Promise((resolve) =>
          resolve({ data: { token: testToken } })
        );
      })
      .mockImplementationOnce(() => {
        return new Promise((resolve) => resolve({ data: outputDetails }));
      });

    const compileAndExecuteButton = screen.getByRole("button", {
      name: /compile and execute/i,
    });

    const editor = screen.getAllByRole("textbox")[0];
    fireEvent.change(editor, {
      target: { value: testCode },
    });

    fireEvent.click(compileAndExecuteButton);
    const output = await screen.findByText("Hello World");
    const status = await screen.findByText(/status/i);
    const memory = await screen.findByText(/memory/i);
    const time = await screen.findByText(/time/i);

    expect(output).toBeVisible();
    expect(status).toBeVisible();
    expect(status).toHaveTextContent(outputDetails.status.description);
    expect(memory).toBeVisible();
    expect(memory).toHaveTextContent(outputDetails.memory);
    expect(time).toBeVisible();
    expect(time).toHaveTextContent(outputDetails.time);

    expect(axios.request).toBeCalledTimes(2);
    expect(axios.request).toBeCalledWith({
      data: { language_id: 62, source_code: btoa(testCode), stdin: "" },
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "content-type": "application/json",
      },
      method: "POST",
      params: { base64_encoded: "true", fields: "*" },
      url: process.env.REACT_APP_RAPID_API_URL,
    });
    expect(axios.request).toBeCalledWith({
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      method: "GET",
      params: { base64_encoded: "true", fields: "*" },
      url: `${process.env.REACT_APP_RAPID_API_URL }/${testToken}`,
    });
  });

  test("opens recommendation modal when ai analysis button clicked", async () => {
    setup();
    const editor = screen.getAllByRole("textbox")[0];
    const aiAnalysisButton = screen.getByRole("button", {
      name: /ai analysis/i,
    });
    const recommendationModal = screen.getByTestId("recommendationModal");

    fireEvent.change(editor, {
      target: { value: testCode },
    });
    fireEvent.click(aiAnalysisButton);

    const recommendation = await screen.findByText(chatGptResponse);

    const spy = fetchResolver.getSpy();
    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith("/get-exercise?title=variables");
    expect(spy).toBeCalledWith("/chat-gpt", {
      body: `{"code":"${testCode}"}`,
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    expect(recommendationModal).toBeVisible();
    expect(recommendation).toBeVisible();
  });

  test("does not request recommendations if no code written", async () => {
    setup();
    const editor = screen.getAllByRole("textbox")[0];
    const aiAnalysisButton = screen.getByRole("button", {
      name: /ai analysis/i,
    });

    fireEvent.click(aiAnalysisButton);
    let modal = screen.queryByRole("dialog");
    expect(modal).toBeNull();

    fireEvent.change(editor, {
      target: { value: "" },
    });
    fireEvent.click(aiAnalysisButton);
    modal = screen.queryByRole("dialog");
    expect(modal).toBeNull();

    const spy = fetchResolver.getSpy();
    expect(spy).toBeCalledTimes(1); // once for the getLessons call
    expect(spy).toBeCalledWith("/get-exercise?title=variables");
  });

  test("does not resend recommendation request while previous request loading", async () => {
    setup(10000);
    // Initialize editor with test data
    const editor = screen.getAllByRole("textbox")[0];
    const aiAnalysisButton = screen.getByRole("button", {
      name: /ai analysis/i,
    });
    fireEvent.change(editor, {
      target: { value: testCode },
    });

    // Open modal
    fireEvent.click(aiAnalysisButton);
    let recommendationModal = screen.queryByRole("dialog");
    expect(recommendationModal).toBeVisible();

    // Close modal while loading
    const closeButton = screen.getAllByRole("button")[0];
    fireEvent.click(closeButton);
    recommendationModal = screen.queryByRole("dialog");
    expect(recommendationModal).toBeNull();

    // Reopen modal
    fireEvent.click(aiAnalysisButton);

    // Verify only one request sent to chat gpt
    const spy = fetchResolver.getSpy();
    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith("/get-exercise?title=variables");
    expect(spy).toBeCalledWith("/chat-gpt", {
      body: `{"code":"${testCode}"}`,
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  });

  test("does not send recommendation request if no change made to code", async () => {
    setup();
    // Initialize editor with test data
    const editor = screen.getAllByRole("textbox")[0];
    const aiAnalysisButton = screen.getByRole("button", {
      name: /ai analysis/i,
    });
    fireEvent.change(editor, {
      target: { value: testCode },
    });

    // Open modal
    fireEvent.click(aiAnalysisButton);

    // Close modal
    const closeButton = screen.getAllByRole("button")[0];
    fireEvent.click(closeButton);

    // Reopen modal
    fireEvent.click(aiAnalysisButton);

    // Verify that recommendation is still displayed
    const recommendation = await screen.findByText(chatGptResponse);
    expect(recommendation).toBeVisible();

    // Verify only one request sent to chat gpt
    const spy = fetchResolver.getSpy();
    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith("/get-exercise?title=variables");
    expect(spy).toBeCalledWith("/chat-gpt", {
      body: `{"code":"${testCode}"}`,
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  });
});
