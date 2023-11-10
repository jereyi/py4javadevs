import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { nameToDetailsMap, py4JavaDevsDesc } from "../utils/constants";

import { CasUserContext } from '../context/casUserContext';
import { UserInfo } from "../utils/types";

const namesAndDescriptions = Array.from(nameToDetailsMap.values());

describe("Home Page", () => {
  const setup = () => {
    let user = {
      netid: "jDoe",
      displayName: "Jane Doe",
      lastLogin: new Date("07/27/2023"),
      completedLessons: ["variables"]
    } as UserInfo;

    const setUser = (user: UserInfo) => {}

    render(<CasUserContext.Provider value={{user, setUser}}><App /></CasUserContext.Provider>);
  }

  test("renders home page correctly", () => {
    setup();
    const logo = screen.getByText("Python for Java Devs");;
    const welcome = screen.getByText("Welcome Jane!");
    const desc = screen.getByText(py4JavaDevsDesc);
    const startButton = screen.getAllByRole("button")[0];
    const dateJoined = screen.getByText("July 27, 2023");
    const lessonProgress = screen.getByText("1 Lesson");
    const showAllLessons = screen.getByText(/show all 11 lessons/i);
    for (let i = 0; i < 5; i++) {
      const { title, desc } = namesAndDescriptions[i];

      const lessonTitle = screen.getByText(title);
      const lessonDesc = screen.getByText(desc);

      expect(lessonTitle).toBeVisible();
      expect(lessonDesc).toBeInTheDocument();
      expect(lessonDesc).not.toBeVisible();
    }

    for (let i = 5; i < namesAndDescriptions.length; i++) {
      const { title, desc } = namesAndDescriptions[i];
      const lessonTitle = screen.queryByText(title);
      const lessonDesc = screen.queryByText(desc);

      expect(lessonTitle).toBe(null);
      expect(lessonDesc).toBe(null);
    }

    expect(logo).toBeVisible();
    expect(welcome).toBeVisible();
    expect(desc).toBeVisible();
    expect(startButton).toBeVisible();
    expect(dateJoined).toBeVisible();
    expect(lessonProgress).toBeVisible();
    expect(showAllLessons).toBeVisible();
  });

  test("tests shows all lessons button functionality", () => {
    setup();
    const showAllLessons = screen.getByText(/show all 11 lessons/i);
    fireEvent.click(showAllLessons);

    for (let i = 0; i < namesAndDescriptions.length; i++) {
      const { title, desc } = namesAndDescriptions[i];

      const lessonTitle = screen.getByText(title);
      const lessonDesc = screen.getByText(desc);

      expect(lessonTitle).toBeVisible();
      expect(lessonDesc).toBeInTheDocument();
      expect(lessonDesc).not.toBeVisible();
    }

    fireEvent.click(showAllLessons);

    for (let i = 0; i < 5; i++) {
      const { title, desc } = namesAndDescriptions[i];

      const lessonTitle = screen.getByText(title);
      const lessonDesc = screen.getByText(desc);

      expect(lessonTitle).toBeVisible();
      expect(lessonDesc).toBeInTheDocument();
      expect(lessonDesc).not.toBeVisible();
    }

    for (let i = 5; i < namesAndDescriptions.length; i++) {
      const { title, desc } = namesAndDescriptions[i];
      const lessonTitle = screen.queryByText(title);
      const lessonDesc = screen.queryByText(desc);

      expect(lessonTitle).toBe(null);
      expect(lessonDesc).toBe(null);
    }
  });

  test("tests lesson row expansion", () => {
    setup();
    // First Lesson Section
    const lessonSection = screen.getByTestId("summary-1");
    // First Lesson button
    const lessonButton = screen.getAllByRole("button")[1];
    // First Exercise Button
    const exerciseButton = screen.getAllByRole("button")[2];

    fireEvent.click(lessonSection);

    expect(lessonButton).toHaveTextContent("Lesson");
    expect(exerciseButton).toHaveTextContent("Exercise");
    expect(lessonButton).toBeVisible();
    expect(exerciseButton).toBeVisible();

    expect(screen.getByText(namesAndDescriptions[0].desc)).toBeVisible();
    for (let i = 1; i < 5; i++) {
      const { desc } = namesAndDescriptions[i];

      expect(screen.getByText(desc)).not.toBeVisible();
    }
  });
});
