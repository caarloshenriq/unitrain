import { WorkoutsInfo } from "@/types/WorkoutsInfo";
import { SQLiteDatabase } from "expo-sqlite";
import { useState } from "react";

export function useWorkoutInfoDatabase(db: SQLiteDatabase) {
  const [workoutInfo, setWorkoutInfo] = useState<WorkoutsInfo[]>([]);

  async function createWorkoutInfo(workoutInfo: WorkoutsInfo) {
    const { workout_id, exercise_id, weight, date } = workoutInfo;
    try {
      await db.runAsync(
        "INSERT INTO workouts_info (workout_id, exercise_id, weight, date) VALUES (?, ?, ?, ?);",
        [workout_id, exercise_id, weight, date]
      );
    } catch (error) {
      console.error("Erro ao adicionar exercício ao treino:", error);
    }
  }


  return {
    workoutInfo,
    createWorkoutInfo,
  };
}
