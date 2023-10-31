import { LanguageOption, LessonDetail } from "./types";

export const namesAndDescriptions: Array<LessonDetail> = [
    {"title": "Variables", "desc": "desc", "next": "Casting"},
    {"title": "Casting", "desc": "desc", "next": "Printing"},
    {"title": "Printing", "desc": "desc", "next": "Comments"},
    {"title": "Comments", "desc": "desc", "next": "Separators"},
    {"title": "Separators", "desc": "desc", "next": "Operators"},
    {"title": "Operators", "desc": "desc", "next": "String"},
    {"title": "String", "desc": "desc", "next": "Conditional Statements"},
    {"title": "Conditional Statements", "desc": "desc", "next": "Loops"},
    {"title": "Loops", "desc": "desc", "next": "Class and Objects"},
    {"title": "Class and Objects", "desc": "desc", "next":  "Data Structures"},
    {"title": "Data Structures", "desc": "desc", "next": null},
]

export const nameToDetailsMap: Map<String, LessonDetail>  = new Map(Object.entries({
  "variables" : {"title": "Variables", "desc": "desc", "next": "Casting"},
  "casting": {"title": "Casting", "desc": "desc", "next": "Printing"},
  "printing": {"title": "Printing", "desc": "desc", "next": "Comments"},
  "comments": {"title": "Comments", "desc": "desc", "next": "Separators"},
  "separators":  {"title": "Separators", "desc": "desc", "next": "Operators"},
  "operators":  {"title": "Operators", "desc": "desc", "next": "String"},
  "string":  {"title": "String", "desc": "desc", "next": "Conditional Statements"},
  "conditional-statements":  {"title": "Conditional Statements", "desc": "desc", "next": "Loops"},
  "loops": {"title": "Loops", "desc": "desc", "next": "Class and Objects"},
  "class-and-objects": {"title": "Class and Objects", "desc": "desc", "next": "Data Structures"},
  "data-structures":  {"title": "Data Structures", "desc": "desc", "next": null},
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