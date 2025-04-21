import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useExerciseDatabase } from "@/database/UseExerciseDatabase";
import { Exercise } from "@/types/Exercise";
import { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";

export default function WorkoutDetails() {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const router = useRouter();
  const navigation = useNavigation();
  const { getExercise, deleteExercise } = useExerciseDatabase(db);
  const [exercise, setExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    async function fetchExerciseDetails() {
      if (!id) return;
      const result = await getExercise(Number(id));
      if (result) {
        setExercise(result);
      }
    }

    fetchExerciseDetails();
  }, [id]);

  useLayoutEffect(() => {
    if (exercise?.name) {
      navigation.setOptions({ title: exercise.name });
    }
  }, [exercise?.name]);

  function handleDelete() {
    Alert.alert(
      "Confirmar Exclusão",
      `Deseja realmente excluir o exercício "${exercise?.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deleteExercise(Number(id));
            router.push("/(exercise)/index");
          },
        },
      ]
    );
  }

  return (
    <ScrollView className="bg-white dark:bg-gray-700 p-4 flex-1">
      <View className="mb-6 mt-4">
        <Text className="text-black dark:text-white text-3xl font-bold text-center mb-2">
          {exercise?.name}
        </Text>
        <Text className="text-gray-600 dark:text-gray-200 text-lg text-center">
          Grupo Muscular:{" "}
          <Text className="font-medium text-black dark:text-white">{exercise?.body_part}</Text>
        </Text>
      </View>

      <View className="border border-gray-300 dark:border-gray-50 rounded-lg p-4 bg-gray-50 dark:bg-gray-500 shadow-sm mb-6">
        <Text className="text-black dark:text-white font-semibold text-lg mb-2">Descrição</Text>
        <Text className="text-gray-700 dark:text-gray-100 leading-relaxed">
          {exercise?.description}
        </Text>
      </View>
    </ScrollView>
  );
}
