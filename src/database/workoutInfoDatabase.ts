import { WorkoutsInfo } from "@/types/WorkoutsInfo";
import { SQLiteDatabase } from "expo-sqlite";
import { useState } from "react";

export function useWorkoutInfoDatabase(db: SQLiteDatabase) {
  const [workoutInfo, setWorkoutInfo] = useState<WorkoutsInfo[]>([]);

  async function createWorkoutInfo(workoutInfo: WorkoutsInfo): Promise<number | null> {
    const { workout_id, time } = workoutInfo;
    try {
      const result = await db.runAsync(
        "INSERT INTO workouts_info (workout_id, time, date) VALUES (?, ?, ?);",
        [workout_id, time, new Date().toISOString()]
      );
  
      return result.lastInsertRowId as number;
    } catch (error) {
      console.error("Erro ao adicionar exercício ao treino:", error);
      return null;
    }
  }
  


  return {
    workoutInfo,
    createWorkoutInfo,
  };
}
