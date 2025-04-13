import { WorkoutProgress } from "@/types/WorkoutProgress";
import { SQLiteDatabase } from "expo-sqlite";
import { useState } from "react";

export function useWorkoutProgressDatabase(db: SQLiteDatabase) {
  const [workoutProgress, setWorkoutProgress] = useState<WorkoutProgress[]>([]);

  async function createWorkoutProgress(workoutProgress: WorkoutProgress) {
    const { workout_info_id, exercise_id, repetition, weight } =
      workoutProgress;
    try {
      await db.runAsync(
        "INSERT INTO workout_progress (workout_info_id, exercise_id, repetition, weight) VALUES ( ?, ?, ?, ?);",
        [workout_info_id, exercise_id, repetition, weight]
      );
    } catch (error) {
      console.error("Erro ao adicionar exercício ao treino:", error);
    }
  }

  async function getWorkoutProgress(workout_info_id: number) {
    try {
      const result = await db.getAllAsync<WorkoutProgress>(
        "SELECT * FROM workout_progress WHERE workout_info_id = ?",
        [workout_info_id]
      );
      return result;
    } catch (error) {
      console.error("Erro ao obter os dados do treino:", error);
    }
  }

  async function getAllWorkoutProgress() {
    try {
      const result = await db.getAllAsync<WorkoutProgress>(
        "SELECT * FROM workout_progress"
      );
      setWorkoutProgress(result);
    } catch (error) {
      console.error("Erro ao obter os dados do treino:", error);
    }
  }

  return {
    workoutProgress,
    createWorkoutProgress,
    getWorkoutProgress,
    getAllWorkoutProgress,
  };
}
