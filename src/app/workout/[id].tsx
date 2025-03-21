import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useWorkoutExerciseDatabase } from "@/database/workoutExerciseDatabase";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";
import { Workout } from "@/types/Workout";
import { Ionicons } from "@expo/vector-icons";

export default function WorkoutDetails() {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const { getWorkout } = useWorkoutDatabase(db);
  const { getWorkoutDetail } = useWorkoutExerciseDatabase(db);
  const [exercises, setExercises] = useState<
    { name: string; body_part: string; repetition: number; series: number; description: string }[]
  >([]);
  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    async function fetchWorkoutDetails() {
      if (!id) return;
      const workout = await getWorkout(Number(id));
      setWorkout(workout);
      const workoutExercises = await getWorkoutDetail(Number(id));
      const exercisesWithDescription = workoutExercises.map(exercise => ({
        ...exercise,
        description: exercise.description || "No description available",
      }));
      setExercises(exercisesWithDescription);
    }
    fetchWorkoutDetails();
  }, [id]);

  function showExerciseInfo(exerciseName: string, description: string) {
    Alert.alert(exerciseName, description);
  }

  return (
    <View className="bg-white p-4 flex-1">
      <Text className="text-black text-2xl font-bold text-center">{workout?.name}</Text>

      <Text className="mt-4 text-black font-bold">Exercícios</Text>
      <ScrollView className="border border-gray-300 rounded-md mt-2 p-2">
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <View key={index} className="p-2 border-b border-gray-300">
              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row items-center">
                  <Text className="text-black font-semibold">{exercise.name}</Text>
                  <TouchableOpacity
                    onPress={() => showExerciseInfo(exercise.name, exercise.description)}
                    className="ml-2"
                  >
                    <Ionicons name="help-circle-outline" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
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
