import { Workout } from "@/types/Workout";
import { SQLiteDatabase } from "expo-sqlite";
import { useState } from "react";

export function useWorkoutDatabase(db: SQLiteDatabase){
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    async function getWorkouts(){
        try {
            const result = await db.getAllAsync<Workout>("SELECT * FROM workouts WHERE active = 1;");
            setWorkouts(result);
            return result;
        } catch (error) {
            console.error("Erro ao buscar treinos:", error);
            return [];
        }
    }

    async function getWorkout(workout_id: number){
        try {
            const result = await db.getFirstAsync<Workout>(
                `SELECT * FROM workouts WHERE workout_id = ${workout_id};`
            );
            return result;
        } catch (error) {
            console.error("Erro ao buscar treino:", error);
            return null;
        }
    }

    async function addWorkout(workout: Omit<Workout, "workout_id">){
        const { name,  weekday} = workout;
        try {
            await db.runAsync(
                `INSERT INTO workouts (name, weekday) VALUES (${name}, ${weekday});`
            );
            await getWorkouts();
        } catch (error) {
            console.error("Erro ao adicionar treino:", error);
        }
    }

    async function updateWorkout(workout: Workout){
        const { workout_id, name, weekday } = workout;
        try {
            await db.runAsync(
                `UPDATE workouts SET name = ${name}, weekday = ${weekday} WHERE workout_id = ${workout_id};`
            );
            await getWorkouts();
        } catch (error) {
            console.error("Erro ao atualizar treino:", error);
        }
    }

    async function deleteWorkout(workout_id: number){
        try {
            await db.runAsync(
                `UPDATE workouts SET active = 0 WHERE workout_id = ${workout_id};`
            );
            await getWorkouts();
        } catch (error) {
            console.error("Erro ao deletar treino:", error);
        }
    }

    return {workouts, getWorkouts, getWorkout, addWorkout, updateWorkout, deleteWorkout};

}