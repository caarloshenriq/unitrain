import Button from "@/components/Button";
import { useExerciseDatabase } from "@/database/UseExerciseDatabase";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ModalSelector from "react-native-modal-selector";
import { Exercise } from '@/types/Exercise';
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { BodyPart } from "@/types/BodyPart";
import { Swipeable } from "react-native-gesture-handler";

export default function Exercises() {
  const db = useSQLiteContext();
  const router = useRouter();
  const { getExercises, getExerciseByBodyPart, getBodyPart, deleteExercise } = useExerciseDatabase(db);

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<number>(0);
  const [activeSwipeable, setActiveSwipeable] = useState<number | null>(null);
  const colorScheme = useColorScheme();

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      async function fetchInitialData() {
        try {
          const parts = await getBodyPart();
          const allExercises = await getExercises();

          if (isActive) {
            setSelectedBodyPart(0);
            setBodyParts(parts || []);
            setExercises(allExercises || []);
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      }

      fetchInitialData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleFilterChange = async (value: number) => {
    setSelectedBodyPart(value);

    try {
      if (value === 0) {
        const all = await getExercises();
        setExercises(all || []);
      } else {
        const filtered = await getExerciseByBodyPart(value);
        setExercises(filtered || []);
      }
    } catch (error) {
      console.error("Erro ao aplicar filtro:", error);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteExercise(id);
    const updatedList = await getExercises();
    setExercises(updatedList || []);
  };

  const renderRightActions = (exercise_id: number) => (
    <View style={{ flexDirection: "row", height: "100%" }}>
      <TouchableOpacity
        onPress={() => router.push(`/form?id=${exercise_id}`)}
        style={{ backgroundColor: "#d1d5db", justifyContent: "center", alignItems: "center", width: 60, height: 72, borderRadius: 8  }}
      >
        <Ionicons name="create-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDelete(exercise_id)}
        style={{ backgroundColor: "#ef4444", justifyContent: "center", alignItems: "center", width: 60, height: 72, borderRadius: 8  }}
      >
        <Ionicons name="trash-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="bg-white dark:bg-gray-700 flex-1">
      <View className="flex flex-row justify-end pt-4 px-4">
        <Button
          icon={<Ionicons name="add" size={20} color="white" />}
          onPress={() => router.push("/form")}
          small={true}
        />
      </View>

      <View className="border rounded-lg mt-4 mx-4 bg-white dark:bg-gray-600 border-gray-300 dark:border-white">
        <ModalSelector
          data={[
            { key: 0, label: "Todos os grupos musculares" },
            ...bodyParts.map((part) => ({ key: part.body_part_id, label: part.name })),
          ]}
          initValue="Selecione um grupo muscular"
          selectedKey={selectedBodyPart}
          onChange={(option) => handleFilterChange(Number(option.key))}
          selectTextStyle={{ color: colorScheme === "dark" ? "white" : "black", fontSize: 16 }}
          optionContainerStyle={{ backgroundColor: colorScheme === "dark" ? "#1f2937" : "white", borderRadius: 8 }}
          optionTextStyle={{ color: colorScheme === "dark" ? "white" : "black", fontSize: 16 }}
          cancelStyle={{ backgroundColor: colorScheme === "dark" ? "#1f2937" : "white", borderRadius: 8 }}
          cancelTextStyle={{ color: colorScheme === "dark" ? "white" : "black", fontSize: 16 }}
          cancelText="Cancelar"
        />
      </View>

      <ScrollView className="mt-4 px-4">
        {exercises.length === 0 ? (
          <Text className="text-gray-500 text-center mt-10">
            Nenhum exercício encontrado.
          </Text>
        ) : (
          exercises.map((exercise) => (
            <Swipeable
              key={exercise.exercise_id}
              renderRightActions={() => renderRightActions(exercise.exercise_id)}
              onSwipeableWillOpen={() => setActiveSwipeable(exercise.exercise_id)}
              onSwipeableWillClose={() => setActiveSwipeable(null)}
            >
              <TouchableOpacity
                className="bg-gray-100 dark:bg-gray-900 dark:text-white p-4 rounded-lg mb-4 shadow-sm flex-row justify-between items-center"
                onPress={() => router.push(`/(exercise)/${exercise.exercise_id}`)}
              >
                <View>
                  <Text className="text-black dark:text-white font-bold text-lg">
                    {exercise.name}
                  </Text>
                  <Text className="text-gray-400">
                    Grupo muscular: {exercise.body_part}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color={colorScheme === "dark" ? "white" : "gray"} />
              </TouchableOpacity>
            </Swipeable>
          ))
        )}
      </ScrollView>
    </View>
  );
}
