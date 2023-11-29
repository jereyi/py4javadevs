import parser from '../utils/parser.util.js';

export async function getExerciseByTitle(title){
  return await parser.parseFiles(title, false);
}

export async function getLessonByTitle(title){
  return await parser.parseFiles(title);
}