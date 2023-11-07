
import  { pool } from "../db.cjs";

export async function addLessonToNetid(lesson, netid) {
    const lessons = await pool.query("SELECT completed_lessons FROM users WHERE ($1) = ANY(completed_lessons) AND net_id = ($2)", [lesson, netid]);
    if (lessons.rowCount === 0) {
        await pool.query("UPDATE users SET completed_lessons = array_append(completed_lessons, ($1)) WHERE net_id = ($2)", [lesson, netid]);
    } else {
        console.log("Lesson already added to user with netid " + netid);
    }
}

export async function removeLessonFromNetid(lesson, netid) {
    await pool.query("UPDATE users SET completed_lessons = array_remove(completed_lessons, ($1)) WHERE net_id = ($2)", [lesson, netid]);
}