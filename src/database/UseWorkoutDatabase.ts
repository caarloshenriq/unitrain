import { FormattedWorkout, ProgressResult, Workout } from "@/types/Workout";
import { SQLiteDatabase } from "expo-sqlite";
import { useState } from "react";

export function useWorkoutDatabase(db: SQLiteDatabase) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  async function getWorkouts() {
    try {
      const result = await db.getAllAsync<Workout>(
        "SELECT * FROM workouts WHERE active = 1;"
      );
      setWorkouts(result);
      return result;
    } catch (error) {
      console.error("Erro ao buscar treinos:", error);
      return [];
    }
  }

  async function getWorkout(workout_id: number) {
    try {
      const result = await db.getFirstAsync<Workout>(
        `SELECT * FROM workouts WHERE workout_id = ?;`,
        [workout_id]
      );
      return result;
    } catch (error) {
      console.error("Erro ao buscar treino:", error);
      return null;
    }
  }

  async function addWorkout(workout: Omit<Workout, "workout_id">) {
    const { name, weekday } = workout;
    try {
      await db.runAsync(
        "INSERT INTO workouts (name, weekday, active) VALUES (?, ?, ?);",
        [name, weekday, true]
      );

      const result = await db.getFirstAsync<{ workout_id: number }>(
        "SELECT last_insert_rowid() as workout_id;"
      );
      await getWorkouts();

      return result?.workout_id || null;
    } catch (error) {
      console.error("Erro ao adicionar treino:", error);
      return null;
    }
  }

  async function updateWorkout(workout: Workout) {
    const { workout_id, name, weekday } = workout;
    try {
      await db.runAsync(
        `UPDATE workouts SET name = ?, weekday = ? WHERE workout_id = ?;`,
        [name, weekday, workout_id]
      );

      await getWorkouts();
    } catch (error) {
      console.error("Erro ao atualizar treino:", error);
    }
  }

  async function deleteWorkout(workout_id: number) {
    try {
      await db.runAsync(
        `UPDATE workouts SET active = 0 WHERE workout_id = ${workout_id};`
      );
      await getWorkouts();
    } catch (error) {
      console.error("Erro ao deletar treino:", error);
    }
  }

  async function getWorkoutsProgress() {
    try {
      const results = await db.getAllAsync<{
        workout_name: string;
        date: string;
        average_weight: number;
      }>(
        `
        SELECT w.name as workout_name, wi.date as date, AVG(wp.weight) as average_weight
        FROM workouts_info wi
        JOIN workout_progress wp ON wp.workout_info_id = wi.workouts_info_id
        JOIN workouts w ON w.workout_id = wi.workout_id AND w.active = 1
        GROUP BY w.name, wi.date
        ORDER BY wi.date ASC;
        `
      );

      const grouped = results.reduce((acc, curr) => {
        const workout = acc.find((w) => w.workout_name === curr.workout_name);
        if (workout) {
          workout.data.push({
            date: curr.date,
            average_weight: curr.average_weight,
          });
        } else {
          acc.push({
            workout_name: curr.workout_name,
            data: [{ date: curr.date, average_weight: curr.average_weight }],
          });
        }
        return acc;
      }, [] as { workout_name: string; data: { date: string; average_weight: number }[] }[]);

      return grouped;
    } catch (error) {
      console.error("Erro ao buscar progresso dos treinos:", error);
      return [];
    }
  }

  return {
    workouts,
    getWorkouts,
    getWorkout,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkoutsProgress,
  };
}
