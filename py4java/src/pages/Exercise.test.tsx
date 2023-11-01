import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { namesAndDescriptions, py4JavaDevsDesc } from '../utils/constants';
import { notDeepEqual } from 'assert';
import e from 'express';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { Server } from 'http';

const server = setupServer(
    http.get("/get-exercise?title=variables", () => {
      return HttpResponse.json([
        {
            "question": "Create a variable named `carname` and assign the value `Volvo` to it.",
            "javaSolution": "String carname = \"Volvo\";",
            "pythonSolution": "carname = 'Volvo'"
        },
        {
            "question": "Create a variable named `x` and assign the value `50` to it.",
            "javaSolution": "int x = 50;",
            "pythonSolution": "x = 50"
        }
    ])
    })
  );

describe("Exercise Page", () => {
let sidebar: HTMLElement;
let sidebarElements: HTMLElement[];
  let exerciseButton: HTMLElement;
  let inputBox: HTMLElement;
  beforeEach(async () => {
    server.listen();
    render(<App />);
    exerciseButton = screen.getAllByRole("button")[2];
    fireEvent.click(exerciseButton);
    
    sidebar = screen.getAllByRole("navigation")[1];
    sidebarElements = await screen.findAllByText(/exercise/i);
    inputBox = screen.getByRole("textbox");
    screen.getByRole("");
  });
  
  test('renders exercise page correctly', () => {
   
    });
});