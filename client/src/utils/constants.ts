import { LanguageOption, LessonDetail } from "./types";

export const py4JavaDevsDesc =
  "Unlock the power of Python with our consise lessons and exercises tailored for Java developers.";

export const nameToDetailsMap: Map<String, LessonDetail> = new Map(
  Object.entries({
    variables: {
      title: "Variables",
      desc: "Named containers for storing data values, allowing data to be referenced and manipulated in a program.",
      prev: null,
      next: "Casting",
      hasExercises: true,
    },
    casting: {
      title: "Casting",
      desc: "The process of converting one data type into another, ensuring compatibility and facilitating operations between different types.",
      prev: "Variables",
      next: "Separators",
      hasExercises: true,
    },
    separators: {
      title: "Separators",
      desc: "Characters or symbols used to delimit or separate elements within code, such as commas, semicolons, or colons.",
      prev: "Casting",
      next: "Printing",
      hasExercises: false,
    },
    printing: {
      title: "Printing",
      desc: "The action of displaying output to the console or other output streams.",
      prev: "Separators",
      next: "Lists",
      hasExercises: true,
    },
    lists: {
      title: "Lists",
      desc: "Ordered, mutable collections of elements, typically used to store homogeneous data types, accessible by index.",
      prev: "Printing",
      next: "Operators",
      hasExercises: true,
    },
    operators: {
      title: "Operators",
      desc: "Symbols or keywords representing computations or logical operations, including arithmetic, comparison, and logical operators.",
      prev: "Lists",
      next: "Conditional Statements",
      hasExercises: true,
    },
    "conditional-statements": {
      title: "Conditional Statements",
      desc: "Constructs like `if`, `elif`, and `else` used to execute different blocks of code based on specified conditions.",
      prev: "Operators",
      next: "Loops",
      hasExercises: true,
    },
    loops: {
      title: "Loops",
      desc: "Constructs like `for` and `while` used for iterating over sequences or executing a block of code repeatedly.",
      prev: "Conditional Statements",
      next: "Sets",
      hasExercises: true,
    },
    sets: {
      title: "Sets",
      desc: "Unordered collections of unique elements, useful for mathematical operations like union, intersection, and difference.",
      prev: "Loops",
      next: "Dicts",
      hasExercises: true,
    },
    dicts: {
      title: "Dicts",
      desc: "Unordered collections of key-value pairs, providing efficient data retrieval based on keys.",
      prev: "Sets",
      next: "Strings",
      hasExercises: true,
    },
    strings: {
      title: "Strings",
      desc: "Sequences of characters, often used for representing and manipulating text data.",
      prev: "Dicts",
      next: "Functions and Methods",
      hasExercises: true,
    },
    "functions-and-methods": {
      title: "Functions and Methods",
      desc: "Blocks of reusable code that perform specific tasks; functions are independent, while methods are associated with objects.",
      prev: "Strings",
      next: "Scope",
      hasExercises: true,
    },
    scope: {
      title: "Scope",
      desc: "The region of a program where a variable is defined and accessible, determining its visibility and lifetime.",
      prev: "Functions and Methods",
      next: "Classes and Objects",
      hasExercises: false,
    },
    "classes-and-objects": {
      title: "Classes and Objects",
      desc: "Blueprints for creating objects, encapsulating data and behavior into a single unit through attributes and methods.",
      prev: "Scope",
      next: "User Input",
      hasExercises: true,
    },
    "user-input": {
      title: "User Input",
      desc: "Mechanism for obtaining data from the user during program execution.",
      prev: "Classes and Objects",
      next: "Exception Handling",
      hasExercises: true,
    },
    "exception-handling": {
      title: "Exception Handling",
      desc: "Techniques for gracefully managing and responding to errors or exceptional situations in a program, using `try`, `except`, and `finally` blocks.",
      prev: "user-input",
      next: "File Handling",
      hasExercises: true,
    },
    "file-handling": {
      title: "File Handling",
      desc: "Operations involving the reading from or writing to files, including opening, closing, reading, and writing data.",
      prev: "Exception Handling",
      next: null,
      hasExercises: true,
    },
  })
);

export const languageOptions: LanguageOption[] = [
  {
    id: 71,
    name: "Python (3.8.1)",
    label: "Python (3.8.1)",
    value: "python",
    default: "# Write your solution here!",
  },
  {
    id: 62,
    name: "Java (OpenJDK 13.0.1)",
    label: "Java (OpenJDK 13.0.1)",
    value: "java",
    default: "// Write your solution here!",
  },
  {
    id: 70,
    name: "Python (2.7.17)",
    label: "Python (2.7.17)",
    value: "python",
    default: "# Write your solution here!",
  },
];
