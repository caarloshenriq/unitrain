import { type SQLiteDatabase } from "expo-sqlite";
import { migrateWorkoutsInfoTable } from "./migrateWorkoutsInfoTable";
import { populateExerciseTable } from "./PopulateExerciseTable";

export async function InitilizeDatabase(db: SQLiteDatabase) {
  try {
    await db.execAsync(
      `PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS workouts (
      workout_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      weekday TEXT NOT NULL,
      active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS body_part (
      body_part_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS exercise (
      exercise_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      body_part_id INTEGER NOT NULL,
      img TEXT,
      active INTEGER DEFAULT 1,
      FOREIGN KEY (body_part_id) REFERENCES body_part(body_part_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS workout_exercise (
      workout_id INTEGER NOT NULL,
      exercise_id INTEGER NOT NULL,
      repetition INTEGER NOT NULL,
      series INTEGER NOT NULL,
      PRIMARY KEY (workout_id, exercise_id),
      FOREIGN KEY (workout_id) REFERENCES workouts(workout_id) ON DELETE CASCADE,
      FOREIGN KEY (exercise_id) REFERENCES exercise(exercise_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS body_info (
      body_info_id INTEGER PRIMARY KEY AUTOINCREMENT,
      measure_type TEXT NOT NULL,
      measurement DECIMAL(5,2) NOT NULL,
      measurement_date DATE NOT NULL DEFAULT (date('now')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS workouts_info (
      workouts_info_id INTEGER PRIMARY KEY AUTOINCREMENT,
      workout_id INTEGER NOT NULL,
      time FLOAT NOT NULL,
      date DATE NOT NULL,
      FOREIGN KEY (workout_id) REFERENCES workouts(workout_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS workout_progress (
      workout_progress_id INTEGER PRIMARY KEY AUTOINCREMENT,
      workout_info_id INTEGER NOT NULL,
      exercise_id INTEGER NOT NULL,
      weight FLOAT NOT NULL,
      repetition INTEGER NOT NULL,
      FOREIGN KEY (workout_info_id) REFERENCES workouts_info(workouts_info_id) ON DELETE CASCADE,
      FOREIGN KEY (exercise_id) REFERENCES exercise(exercise_id) ON DELETE CASCADE
    );
    `
    );
    console.log("Banco de dados inicializado com sucesso!");
    await populateExerciseTable(db);
    await migrateWorkoutsInfoTable(db);
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
  }
}
