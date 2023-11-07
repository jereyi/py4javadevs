import { LanguageOption, LessonDetail } from "./types";

export const py4JavaDevsDesc = "Unlock the power of Python with our consise lessons and exercises tailored for Java developed.";

export const nameToDetailsMap: Map<String, LessonDetail>  = new Map(Object.entries({
  "variables" : {"title": "Variables", "desc": "desc1", "next": "Casting"},
  "casting": {"title": "Casting", "desc": "desc2", "next": "Printing"},
  "printing": {"title": "Printing", "desc": "desc3", "next": "Comments"},
  "comments": {"title": "Comments", "desc": "desc4", "next": "Separators"},
  "separators":  {"title": "Separators", "desc": "desc5", "next": "Operators"},
  "operators":  {"title": "Operators", "desc": "desc6", "next": "String"},
  "string":  {"title": "String", "desc": "desc7", "next": "Conditional Statements"},
  "conditional-statements":  {"title": "Conditional Statements", "desc": "desc8", "next": "Loops"},
  "loops": {"title": "Loops", "desc": "desc9", "next": "Class and Objects"},
  "class-and-objects": {"title": "Class and Objects", "desc": "desc10", "next": "Data Structures"},
  "data-structures":  {"title": "Data Structures", "desc": "desc11", "next": null},
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