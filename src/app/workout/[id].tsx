import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useWorkoutExerciseDatabase } from "@/database/workoutExerciseDatabase";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";
import { Workout } from "@/types/Workout";
import { getWeekdayName } from "@/utils/GetWeekdayName";

export default function WorkoutDetails() {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const { getWorkout } = useWorkoutDatabase(db);
  const { getWorkoutDetail } = useWorkoutExerciseDatabase(db);
  const [exercises, setExercises] = useState<{ name: string; body_part: string; repetition: number; series: number }[]>([]);
  const [workout, setWorkout] = useState<Workout | null>();
  useEffect(() => {
    async function fetchWorkoutDetails() {
      if (!id) return;
      const workout = await getWorkout(Number(id));
      setWorkout(workout);
      const workoutExercises = await getWorkoutDetail(Number(id));
      console.log(workoutExercises);
      setExercises(workoutExercises);
    }
    fetchWorkoutDetails();
  }, [id]);

  return (
    <View className="bg-white p-4 flex-1">
      <Text className="text-black text-2xl font-bold text-center">{workout?.name}</Text>

      <Text className="mt-4 text-black font-bold">Exercícios</Text>
      <ScrollView className="border border-gray-300 rounded-md mt-2 p-2">
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <View key={index} className="p-2 border-b border-gray-300">
              <Text className="text-black font-semibold">{exercise.name}</Text>
              <Text className="text-gray-500">{exercise.body_part}</Text>
              <Text className="text-gray-500">Séries: {exercise.series} | Repetições: {exercise.repetition}</Text>
            </View>
          ))
        ) : (
          <Text className="text-gray-500 text-center">Nenhum exercício cadastrado.</Text>
        )}
      </ScrollView>
    </View>
  );
}
