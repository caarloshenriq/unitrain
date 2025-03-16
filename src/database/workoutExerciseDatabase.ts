import { WorkoutExercise } from "@/types/WorkoutExercise";
import { SQLiteDatabase } from "expo-sqlite";
import { useState } from "react";

export function useWorkoutExerciseDatabase(db: SQLiteDatabase) {
  const [workoutExercise, setWorkoutExercise] = useState<WorkoutExercise[]>([]);

  async function createWorkoutExercise(workoutExercise: WorkoutExercise) {
    const { workout_id, exercise_id, series, repetition } = workoutExercise;
    try {
      await db.runAsync(
        "INSERT INTO workout_exercise (workout_id, exercise_id, series, repetition) VALUES (?, ?, ?, ?);",
        [workout_id, exercise_id, series, repetition]
      );
    } catch (error) {
      console.error("Erro ao adicionar exercício ao treino:", error);
    }
  }

  return {
    workoutExercise,
    createWorkoutExercise,
  };
}
