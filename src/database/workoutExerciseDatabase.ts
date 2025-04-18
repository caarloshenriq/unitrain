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

  async function getWorkoutDetail(workoutId: number) {
    try {
      const result = await db.getAllAsync<{
        name: string;
        body_part: string;
        description: string;
        repetition: number;
        series: number;
        exercise_id: number;
      }>(
        "select e.name, e.exercise_id,b.name as body_part, we.repetition, e.description, we.series from workout_exercise we inner join exercise e on e.exercise_id = we.exercise_id  inner join body_part b on e.body_part_id = b.body_part_id where we.workout_id = ?;",
        [workoutId]
      );
      return result;
    } catch (error) {
      console.log("Erro ao buscar detalhes do treino:", error);
      return [];
    }
  }

  return {
    workoutExercise,
    createWorkoutExercise,
    getWorkoutDetail,
  };
}
