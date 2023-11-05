// https://github.com/geshan/expressjs-structure/tree/master
import express from "express";
import pkg from 'body-parser';
import getLessonRouter from './routes/getLesson.route.js';
import getExerciseRouter from "./routes/getExercise.route.js";
import chatGptRouter from "./routes/chatGpt.route.js";
import authRouter from "./routes/auth.route.js";
import session from "cookie-session";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()

const { urlencoded } = pkg;

const PORT = process.env.PORT || 3001;

const app = express();

app.use(pkg.json()); // for parsing application/json
app.use(urlencoded({ extended: true }));

// CORS middleware
app.use(cors());

// Configure the app to save a cookie
// console.log(process.env.SESSION_SECRET);
app.use(session({
    keys: ['Shsh!Secret!'],
    maxAge: 24 * 60 * 60 * 1000 * 365 // 365 days
  }))

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
  })

app.use("/get-lesson", getLessonRouter);
app.use("/get-exercise", getExerciseRouter);
app.use("/chat-gpt", chatGptRouter);
app.use("/auth", authRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    
    return;
});

  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});