// Reading the file using default
// fs npm package
import { promises } from "node:fs";
import path from "path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const lessonFiles = [
  "java.java",
  "javaNote.md",
  "python.py",
  "pythonNote.md",
  "topic.txt",
];
const exerciseFiles = ["question.md", "java.java", "python.py"];

async function parseFiles(lessonName, isLesson = true) {
  const pathToFolder = path.resolve(
    __dirname,
    `../../public/curriculum/${lessonName}/${isLesson ? "lesson" : "exercises"}`
  );

  const files = isLesson ? lessonFiles : exerciseFiles;

  console.log(pathToFolder);
  const results = [];
  let subFolders = await promises.readdir(pathToFolder);
  subFolders.sort((a, b) => Number.parseInt(a) - Number.parseInt(b));
  console.log("Subfolders:", subFolders);
  for (let i = 0; i < subFolders.length; i++) {
    let data = {};
    for (let j = 0; j < files.length; j++) {
      console.log(
        "Path to file: ",
        `${pathToFolder}/${subFolders[i]}/${files[j]}`
      );
      const attributeName = files[j].split(".")[0];
      const fileContents = await promises.readFile(
        `${pathToFolder}/${subFolders[i]}/${files[j]}`,
        "utf-8"
      );
      data[attributeName] = fileContents;
    }
    results.push(data);
  }

  return results;
}

export default {
  parseFiles,
};
