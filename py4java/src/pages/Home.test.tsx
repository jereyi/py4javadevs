import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import { namesAndDescriptions, py4JavaDevsDesc } from '../utils/constants';
import { notDeepEqual } from 'assert';
import e from 'express';

describe("Home Page", () => {
  let logo: HTMLElement;
  let welcome: HTMLElement;
  let desc: HTMLElement;
  let startButton: HTMLElement;
  //const startButton2 = screen.getByRole('');
  let timer: HTMLElement;
  let lessonProgress: HTMLElement;
  let showAllLessons: HTMLElement;
  let lessonSection: HTMLElement;
  let lessonButton: HTMLElement;
  let exerciseButton: HTMLElement;
  beforeEach(() => {
    render(<App />);
    logo = screen.getByRole('link');
    welcome = screen.getByText(/welcome/i);
    desc = screen.getByText(py4JavaDevsDesc);
    startButton = screen.getAllByRole('button')[0];
    //const startButton2 = screen.getByRole('');
    timer = screen.getByText(/time spent today/i);
    lessonProgress = screen.getByText(/lessons completed/i);
    showAllLessons = screen.getByText(/show all 11 lessons/i);
    lessonSection = screen.getByTestId('summary-1');
    lessonButton = screen.getAllByRole("button")[1];
    exerciseButton = screen.getAllByRole("button")[2];
  });
  
  test('renders home page correctly', () => {
    for (let i = 0; i < namesAndDescriptions.length; i++) {
      const {title, desc} = namesAndDescriptions[i];

      if (i < 5) {
        const lessonTitle = screen.getByText(title);
      const lessonDesc = screen.getByText(desc);

      expect(lessonTitle).toBeVisible();
      expect(lessonDesc).toBeInTheDocument();
      expect(lessonDesc).not.toBeVisible();
      } else {

        const lessonTitle = screen.queryByText(title);
        const lessonDesc = screen.queryByText(desc);

        expect(lessonTitle).toBe(null);
        expect(lessonDesc).toBe(null);
      }
    }


    expect(logo).toBeVisible();
    expect(welcome).toBeVisible();
    expect(desc).toBeVisible();
    expect(startButton).toBeVisible();
    expect(timer).toBeVisible();
    expect(lessonProgress).toBeVisible();
    expect(showAllLessons).toBeVisible();
  });

  test("tests shows all lessons button functionality", ()=>
  {
    fireEvent.click(showAllLessons);

    for (let i = 0; i < namesAndDescriptions.length; i++) {
      const {title, desc} = namesAndDescriptions[i];

      const lessonTitle = screen.getByText(title);
      const lessonDesc = screen.getByText(desc);

      expect(lessonTitle).toBeVisible();
      expect(lessonDesc).toBeInTheDocument();
      expect(lessonDesc).not.toBeVisible();
    }

    fireEvent.click(showAllLessons);

    for (let i = 0; i < namesAndDescriptions.length; i++) {
      const {title, desc} = namesAndDescriptions[i];

      if (i < 5) {
        const lessonTitle = screen.getByText(title);
      const lessonDesc = screen.getByText(desc);

      expect(lessonTitle).toBeVisible();
      expect(lessonDesc).toBeInTheDocument();
      expect(lessonDesc).not.toBeVisible();
      } else {

        const lessonTitle = screen.queryByText(title);
        const lessonDesc = screen.queryByText(desc);

        expect(lessonTitle).toBe(null);
        expect(lessonDesc).toBe(null);
      }
    }
  });

  test("Test lesson row expansion", ()=> {
    fireEvent.click(lessonSection);

    expect(lessonButton).toHaveTextContent("Lesson");
    expect(exerciseButton).toHaveTextContent("Exercise");
    expect(lessonButton).toBeVisible();
    expect(exerciseButton).toBeVisible();

    for (let i = 0; i < 5; i++) {
      const {desc} = namesAndDescriptions[i];
      if (i == 0) {
        expect(screen.getByText(desc)).toBeVisible();
      } else {
        expect(screen.getByText(desc)).not.toBeVisible();
      }
    }
  });
});
