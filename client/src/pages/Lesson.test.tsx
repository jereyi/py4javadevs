import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import App from "../App";
import { FetchResolver } from "../utils/fetchResolver";
import { CasUserContext } from "../context/casUserContext";
import { OutputDetail, UserInfo } from "../utils/types";
import axios from "axios";
import { VARIABLES_LESSON_RESPONSE, VARIABLES_EXERCISE_RESPONSE, CASTING_LESSON_RESPONSE } from "../utils/testing";
import { nameToDetailsMap } from "../utils/constants";

jest.mock("axios");

describe("Lesson Page", () => {
  afterEach(() => {
    // Restores all mocks back to their original value.
    // only works when the mock was created with jest.spyOn;
    jest.restoreAllMocks();

    const logo = screen.getByText("Python for Java Devs");
    fireEvent.click(logo);
  });

  beforeEach(() => {
    jest.mock("react-markdown");
  })

  let fetchResolver: FetchResolver;
  const setup = (isComplete: boolean = true) => {
    fetchResolver = new FetchResolver();
    fetchResolver.stub(
      "/get-lesson?title=variables",
      "GET",
      VARIABLES_LESSON_RESPONSE,
      200
    );
    fetchResolver.stub(
      "/get-lesson?title=casting",
      "GET",
      CASTING_LESSON_RESPONSE,
      200
    );
    fetchResolver.stub(
      "/get-exercise?title=variables",
      "GET",
      VARIABLES_EXERCISE_RESPONSE,
      200
    );
    let user = {
      netid: "jDoe",
      displayName: "Jane Doe",
      firstLogin: new Date("07/27/2023"),
      completedLessons: isComplete ? ["variables"] : [],
    } as UserInfo;

    const setUser = (newUser: UserInfo) => {
      user.completedLessons = newUser.completedLessons;
    };

    render(
      <CasUserContext.Provider value={{ user, setUser }}>
        <App />
      </CasUserContext.Provider>
    );

    const lessonButton = screen.getAllByRole("button", {
      name: /lesson/i
    })[0];
    fireEvent.click(lessonButton);
  };

  test("renders exercise page correctly", async () => {
    setup();

    const completeBanner = await screen.findByText("Complete");
    const title = await screen.findByText(/variables/i);
    const description = await screen.findByText(nameToDetailsMap.get("variables")!.desc);
    const cells = screen.getAllByRole('cell');
    const topicCell = cells[0];
    const javaCell = cells[1];
    const pythonCell = cells[2];
    const popoverButton = within(pythonCell).getByRole("button");
    const nullPopoverButton = within(javaCell).queryByRole("button");
    const popover = screen.queryByText(VARIABLES_LESSON_RESPONSE[0].pythonNote);
    const goToPracticeExercises = await screen.findByRole("button", {
      name: /go to practice exercises/i
    });
    const markAsInComplete = await screen.findByRole("button", {
      name: /mark lesson as incomplete/i
    });
    const next = await screen.findByRole("button", {
      name: /next/i
    });

    expect(completeBanner).toBeVisible();
    expect(title).toBeVisible();
    expect(description).toBeVisible();
    expect(topicCell).toBeVisible();
    expect(javaCell).toBeVisible();
    expect(pythonCell).toBeVisible();
    expect(popoverButton).toBeVisible();
    expect(nullPopoverButton).toBeNull();
    expect(popover).toBeNull();
    expect(goToPracticeExercises).toBeVisible();
    expect(markAsInComplete).toBeVisible();
    expect(next).toBeVisible();

    const spy = fetchResolver.getSpy();

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith("/get-lesson?title=variables");
  });

  test("opens popover when info icon clicked", async () => {
    setup();

    const pythonCell = await screen.findByRole('cell', {
      name: VARIABLES_LESSON_RESPONSE[0].python
    });
    const popoverButton = within(pythonCell).getByRole("button");

    fireEvent.click(popoverButton);

    const popover = screen.queryByText(VARIABLES_LESSON_RESPONSE[0].pythonNote);

    expect(popover).toBeVisible();
  })

  test("redirects to exercises when 'go to exercises' button clicked", async () => {
    setup();

    const next = await screen.findByRole("button", {
      name: /go to practice exercises/i
    });

    fireEvent.click(next);

    const question = await screen.findByText(VARIABLES_EXERCISE_RESPONSE[0].question);

    const spy = fetchResolver.getSpy();
    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith("/get-lesson?title=variables");
    expect(spy).toBeCalledWith("/get-exercise?title=variables");
    expect(question).toBeVisible();
  });

  test("redirects to next lesson when next button clicked", async () => {
    setup();

    const next = await screen.findByRole("button", {
      name: /next/i
    });

    fireEvent.click(next);

    const title = await screen.findByText(/casting/i);

    const spy = fetchResolver.getSpy();
    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith("/get-lesson?title=variables");
    expect(spy).toBeCalledWith("/get-lesson?title=casting");
    expect(title).toBeVisible();
  });

  test("lesson marked as incomplete when 'mark lesson as incomplete' button clicked", async () => {
    setup();

    const markAsIncomplete = await screen.findByRole("button", {
      name: /mark lesson as incomplete/i
    });

    fireEvent.click(markAsIncomplete);
    (axios.request as any).mockImplementationOnce(() => {
      return new Promise(() => { });
    });

    const getUserResponse = {
      net_id: "jDoe",
      display_name: "Jane Doe",
      first_login: new Date("07/27/2023"),
      completed_lessons: []
    };

    (axios.get as any).mockImplementationOnce(() => {
      return new Promise((resolve) => resolve({ data: JSON.stringify(getUserResponse) }));
    });

    await waitForElementToBeRemoved(() => screen.queryByText("Complete"));
    expect(axios.request).toBeCalledTimes(1);
    expect(axios.request).toBeCalledWith({ "data": { "lesson": "variables" }, "method": "DELETE", "url": "/update-user/lesson" });

    expect(axios.get).toBeCalledTimes(1);
    expect(axios.get).toBeCalledWith("/auth/getUser");
  });

  test("lesson marked as complete when 'mark lesson as complete' button clicked", async () => {
    setup(false);

    let completeBanner = screen.queryByText("Complete");
    expect(completeBanner).toBeNull();

    const markAsIncomplete = await screen.findByRole("button", {
      name: /mark lesson as complete/i
    });

    fireEvent.click(markAsIncomplete);
    (axios.request as any).mockImplementationOnce(() => {
      return new Promise(() => { });
    });

    const getUserResponse = {
      net_id: "jDoe",
      display_name: "Jane Doe",
      first_login: new Date("07/27/2023"),
      completed_lessons: ["variables"]
    };

    (axios.get as any).mockImplementationOnce(() => {
      return new Promise((resolve) => resolve({ data: JSON.stringify(getUserResponse) }));
    });

    completeBanner = await screen.findByText("Complete");
    expect(completeBanner).toBeVisible();

    expect(axios.request).toBeCalledTimes(1);
    expect(axios.request).toBeCalledWith({ "data": { "lesson": "variables" }, "method": "PUT", "url": "/update-user/lesson" });

    expect(axios.get).toBeCalledTimes(1);
    expect(axios.get).toBeCalledWith("/auth/getUser");
  });
});