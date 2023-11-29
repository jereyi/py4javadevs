import fetch from "node-fetch";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { title } from "node:process";

export const titleToFileName = (title) => {
  return title
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
};

const load = (title) => {
  const folderName = `../public/curriculum/${titleToFileName(title)}`;

  fetch(`http://127.0.0.1:3001/get-lesson?title=${titleToFileName(title)}`)
    .then((res) => res.json())
    .then((lessonData) => {
      mkdirSync(folderName + "/lesson", { recursive: true });
      for (let index = 0; index < lessonData.length; index++) {
        const subFolderName = folderName + `/lesson/${index + 1}`;
        mkdirSync(subFolderName);
        const java = lessonData[index].java
          ? `public class Main {
                public static void main(String[] args) {
                            ${lessonData[index].java}
                }
            }`
          : "";
        writeFileSync(subFolderName + "/java.java", java);
        writeFileSync(
          subFolderName + "/python.py",
          lessonData[index].python || ""
        );
        writeFileSync(
          subFolderName + "/topic.txt",
          lessonData[index].topic || ""
        );
        writeFileSync(
          subFolderName + "/javaNote.md",
          lessonData[index].javaNote || ""
        );
        writeFileSync(
          subFolderName + "/pythonNote.md",
          lessonData[index].pythonNote || ""
        );
      }
      writeFileSync(
        folderName + "/lesson/stats.txt",
        `${title} ${lessonData.length}`
      );
    });

  fetch(`http://127.0.0.1:3001/get-exercise?title=${titleToFileName(title)}`)
    .then((res) => res.json())
    .then((exercisesData) => {
      mkdirSync(folderName + "/exercises", { recursive: true });
      for (let index = 0; index < exercisesData.length; index++) {
        const subFolderName = folderName + `/exercises/${index + 1}`;
        mkdirSync(subFolderName);
        const java = !exercisesData[index].javaSolution.includes(
          "public class Solution"
        )
          ? `public class Solution {
                public static void main(String[] args) {
                            ${exercisesData[index].javaSolution}
                }
            }`
          : exercisesData[index].javaSolution;
        writeFileSync(
          subFolderName + "/question.md",
          exercisesData[index].question || ""
        );
        writeFileSync(
          subFolderName + "/python.py",
          exercisesData[index].pythonSolution || ""
        );
        writeFileSync(subFolderName + "/java.java", java);
      }
      writeFileSync(
        folderName + "/exercises/stats.txt",
        `${title} ${exercisesData.length}\n`
      );
    }).catch((err) => {});
};



load("Exception Handling");
