import { LanguageOption, LessonDetail } from "./types";

export const py4JavaDevsDesc = "Unlock the power of Python with our consise lessons and exercises tailored for Java developed.";

export const nameToDetailsMap: Map<String, LessonDetail>  = new Map(Object.entries({
  "variables": { "title": "Variables", "desc": "desc1", "prev": null, "next": "Casting", "hasExercises": true },
  "casting": { "title": "Casting", "desc": "desc2", "prev": "Variables","next": "Separators", "hasExercises": true},
  "separators": { "title": "Separators", "desc": "desc5", "prev": "Casting", "next": "Printing", "hasExercises": false},
  "printing": { "title": "Printing", "desc": "desc3", "prev": "Separators", "next": "Lists", "hasExercises": true},
  "lists": { "title": "Lists", "desc": "desc3", "prev": "Printing","next": "Operators", "hasExercises": true},
  "operators": { "title": "Operators", "desc": "desc6", "prev": "Lists","next": "Conditional Statements", "hasExercises": true },
  "conditional-statements": { "title": "Conditional Statements", "desc": "desc8", "prev": "Operators","next": "Loops", "hasExercises": true},
  "loops": { "title": "Loops", "desc": "desc9", "prev": "Conditional Statements","next": "Sets", "hasExercises": true},
  "sets": {"title": "Sets", "desc": "desc4", "prev": "Loops","next": "Dicts", "hasExercises": true},
  "dicts": {"title": "Dicts", "desc": "desc4", "prev": "Sets","next": "Strings", "hasExercises": true},
  "strings":  {"title": "Strings", "desc": "desc7", "prev": "Dicts","next": "Functions and Methods", "hasExercises": true},
  "functions-and-methods": {"title": "Functions and Methods", "desc": "desc10","prev": "Strings", "next": "Scope", "hasExercises": true},
  "scope": {"title": "Scope", "desc": "desc10", "prev": "Functions and Methods","next": "Classes and Objects", "hasExercises": false},
  "classes-and-objects": {"title": "Classes and Objects", "desc": "desc10","prev": "Scope", "next": "User Input", "hasExercises": true},
  "user-input":  {"title": "User Input", "desc": "desc11", "prev": "Classes and Objects","next": "File Handling", "hasExercises": true},
  "file-handling":  {"title": "File Handling", "desc": "desc11", "prev": "User Input","next": "Exception Handling", "hasExercises": true},
  "exception-handling":  {"title": "Exception Handling", "desc": "desc11","prev": "File Handling", "next": null, "hasExercises": true},
}));

export const languageOptions: LanguageOption[] = [
    {
      id: 62,
      name: "Java (OpenJDK 13.0.1)",
      label: "Java (OpenJDK 13.0.1)",
      value: "java",
      default: "// Write your solution here!"
    },
    {
      id: 70,
      name: "Python (2.7.17)",
      label: "Python (2.7.17)",
      value: "python",
      default: "# Write your solution here!"
    },
    {
      id: 71,
      name: "Python (3.8.1)",
      label: "Python (3.8.1)",
      value: "python",
      default: "# Write your solution here!"
    },
  ];