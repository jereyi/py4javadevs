import parser from '../utils/parser.util.js';

export async function getExerciseByTitle(title){
  return await parser.csvToArray(`exercises/${title}-exercises.csv`);
}

export async function getLessonByTitle(title){
  return await parser.csvToArray(`${title}.csv`);
}