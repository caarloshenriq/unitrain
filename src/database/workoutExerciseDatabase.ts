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

  async function updateWorkoutExercise(workoutExercise: WorkoutExercise) {
    const { workout_id, exercise_id, series, repetition } = workoutExercise;
    try {
      await db.runAsync(
        "UPDATE workout_exercise SET series = ?, repetition = ? WHERE workout_id = ? AND exercise_id = ?;",
        [series, repetition, workout_id, exercise_id]
      );
    } catch (error) {
      console.error("Erro ao atualizar exercício do treino:", error);
    }
  }

  async function deleteWorkoutExercise(workout_id: number, exercise_id: number) {
    try {
      await db.runAsync(
        "DELETE FROM workout_exercise WHERE workout_id = ? AND exercise_id = ?;",
        [workout_id, exercise_id]
      );
    } catch (error) {
      console.error("Erro ao remover exercício do treino:", error);
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
        `SELECT 
          e.name, 
          e.exercise_id, 
          b.name AS body_part, 
          we.repetition, 
          e.description, 
          we.series 
        FROM workout_exercise we 
        INNER JOIN exercise e ON e.exercise_id = we.exercise_id  
        INNER JOIN body_part b ON e.body_part_id = b.body_part_id 
        WHERE we.workout_id = ?;`,
        [workoutId]
      );
      return result;
    } catch (error) {
      console.error("Erro ao buscar detalhes do treino:", error);
      return [];
    }
  }

  return {
    workoutExercise,
    createWorkoutExercise,
    updateWorkoutExercise,
    deleteWorkoutExercise,
    getWorkoutDetail,
  };
}
