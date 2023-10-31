// Reading the file using default
// fs npm package
import { createReadStream } from "node:fs";
import path from "path";
import { fileURLToPath } from "node:url";
import csv from 'csv-parser';

const __dirname = fileURLToPath(new URL(".", import.meta.url));

function csvToArray(filename) {
  const results = []
  return new Promise((resolve, reject) => createReadStream(
    path.resolve(__dirname, `../../public/curriculum/${filename}`)
  ).on('error', error => {
    reject(error);
})
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      // Now, the 'results' array contains the parsed CSV data
      resolve(results);
    }));
}

export default {
  csvToArray,
};
