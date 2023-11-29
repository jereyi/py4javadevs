// https://github.com/geshan/expressjs-structure/tree/master
import express from "express";
import pkg from 'body-parser';
import getLessonRouter from './routes/getLesson.route.js';
import getExerciseRouter from "./routes/getExercise.route.js";
import chatGptRouter from "./routes/chatGpt.route.js";
import authRouter from "./routes/auth.route.js";
import updateUserRouter from "./routes/updateUser.route.js";
import session from "cookie-session";
import cors from "cors";
import dotenv from 'dotenv'
import path from "path";
import { fileURLToPath } from "node:url";
dotenv.config()

const { urlencoded } = pkg;

const PORT = process.env.PORT || 3001;

const __dirname = fileURLToPath(new URL(".", import.meta.url));

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
  
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.use("/get-lesson", getLessonRouter);
app.use("/get-exercise", getExerciseRouter);
app.use("/chat-gpt", chatGptRouter);
app.use("/auth", authRouter);
app.use("/update-user", updateUserRouter)

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'../client/build/index.html'));
});

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    
    return;
});

console.log(process.env);
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

// Export server
export default app;