import { useEffect, useState } from "react";
import { SQLiteDatabase } from "expo-sqlite";
import { Exercise } from "@/types/Exercise";
import { BodyPart } from "@/types/BodyPart";

export function useExerciseDatabase(db: SQLiteDatabase) {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  async function getExercises() {
    try {
      const result = await db.getAllAsync<Exercise>(
        "SELECT e.exercise_id, e.name, e.description, b.name as body_part FROM exercise e INNER JOIN body_part b ON e.body_part_id = b.body_part_id WHERE active = 1 ORDER BY body_part ASC;"
      );
      setExercises(result);
      return result;
    } catch (error) {
      console.error("Erro ao buscar exercícios:", error);
      return [];
    }
  }

  async function getExercise(exercise_id: number) {
    try {
      const result = await db.getFirstAsync<Exercise>(
        "SELECT e.exercise_id, e.name, e.description, b.name as body_part FROM exercise e INNER JOIN body_part b ON e.body_part_id = b.body_part_id WHERE exercise_id = ?;",
        [exercise_id]
      );
      return result;
    } catch (error) {
      console.error("Erro ao buscar exercício:", error);
      return null;
    }
  }

  async function getBodyPart() {
    try {
      const result = await db.getAllAsync<BodyPart>(
        "SELECT * from body_part;"
      );
      return result || [];
    } catch (error) {
      console.error("Erro ao buscar partes do corpo distintas:", error);
      return [];
    }
  }

  async function getExerciseByBodyPart(body_part: number) {
    try {
      const result = await db.getAllAsync<Exercise>(
        "SELECT e.exercise_id, e.name, e.description, b.name as body_part FROM exercise e INNER JOIN body_part b ON e.body_part_id = b.body_part_id WHERE e.body_part_id = ?;",
        [body_part]
      );
      return result || [];
    } catch (error) {
      console.error("Erro ao buscar exercícios por parte do corpo:", error);
      return [];
    }
  }

  async function addExercise(exercise: Exercise) {
    const { name, description, body_part, img } = exercise;
    try {
      const result = await db.runAsync(
        "INSERT INTO exercise (name, description, body_part_id, img) VALUES (?, ?, ?, ?);",
        [name, description, Number(body_part), img || null]
      );
      await getExercises();
      return result;
    } catch (error) {
      console.error("Erro ao adicionar exercício:", error);
    }
  }

  async function updateExercise(exercise: Exercise) {
    const { exercise_id, name, description, body_part, img } = exercise;
    try {
      await db.runAsync(
        "UPDATE exercise SET name = ?, description = ?, body_part_id = ?, img = ? WHERE exercise_id = ?;",
        [name, description, Number(body_part), img || null, exercise_id]
      );
      await getExercises();
    } catch (error) {
      console.error("Erro ao atualizar exercício:", error);
    }
  }

  async function deleteExercise(exercise_id: number) {
    try {
      await db.runAsync(
        "UPDATE exercise SET active = 0 WHERE exercise_id = ?;",
        [exercise_id]
      );
      await getExercises();
    } catch (error) {
      console.error("Erro ao deletar exercício:", error);
    }
  }

  useEffect(() => {
    getExercises();
  }, []);

  return {
    exercises,
    getExercises,
    getExercise,
    addExercise,
    updateExercise,
    deleteExercise,
    getBodyPart,
    getExerciseByBodyPart,
  };
}
