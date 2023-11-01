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
  let inputBox: HTMLElement;
  
  beforeEach(async () => {
    fetchResolver = new FetchResolver();
    fetchResolver.stub( "/get-exercise?title=variables", "get", null, variablesExerciseResponse, 200);

    render(<App />);
    exerciseButton = screen.getAllByRole("button")[2];
    fireEvent.click(exerciseButton);
    
    sidebar = screen.getAllByRole("navigation")[1];
    sidebarElements = await screen.findAllByText(/exercise/i);
    inputBox = screen.getByRole("textbox");
    
  });
  
  test('renders exercise page correctly', () => {
   
    });
});