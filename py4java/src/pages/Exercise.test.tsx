import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import { FetchResolver } from '../utils/fetchResolver';

const variablesExerciseResponse = [
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
];

describe("Exercise Page", () => {
  let fetchResolver!: FetchResolver;
  let sidebar: HTMLElement;
  let sidebarElements: HTMLElement[];
  let exerciseButton: HTMLElement;
  let aiAnalysisButton: HTMLElement;
  let viewSolutionButton: HTMLElement;
  let compileAndExecuteButton: HTMLElement;
  let languageDropdown: HTMLElement;
  let themeDropdown: HTMLElement;
  let inputBox: HTMLElement;
  let question: HTMLElement;
  let outputBox: HTMLElement;
  let solutionModal: HTMLElement;
  let recommendationModal: HTMLElement;

  beforeEach(async () => {
    fetchResolver = new FetchResolver();
    fetchResolver.stub("/get-exercise?title=variables", "get", null, variablesExerciseResponse, 200);
    render(<App />);

    exerciseButton = screen.getAllByRole("button")[2];
    fireEvent.click(exerciseButton);

    sidebar = screen.getAllByRole("navigation")[1];
    sidebarElements = await screen.findAllByRole("listitem");
    const dropdowns = screen.getAllByRole("combobox");
    languageDropdown = dropdowns[0];
    themeDropdown = dropdowns[1];


    const buttons = screen.getAllByRole("button");
    aiAnalysisButton = buttons[0];
    viewSolutionButton = buttons[1];
    compileAndExecuteButton = buttons[2];

    inputBox = screen.getByRole("textbox");
    question = await screen.findByTestId("question");
    outputBox = screen.getByTestId("output");

    solutionModal = screen.getByTestId("solutionModal");
    recommendationModal = screen.getByTestId("recommendationModal");

  });

  test('renders exercise page correctly', () => {

  });
});