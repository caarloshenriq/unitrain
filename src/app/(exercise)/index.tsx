import Button from "@/components/Button";
import { useExerciseDatabase } from "@/database/UseExerciseDatabase";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ModalSelector from "react-native-modal-selector";
import { Exercise } from '@/types/Exercise';
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native"; // Importa o hook para detectar o tema do sistema
import { useFocusEffect } from "@react-navigation/native"; // Importa o hook para detectar o foco da tela

export default function Exercises() {
  const db = useSQLiteContext();
  const router = useRouter();
  const { getExercises, getExerciseByBodyPart, getDistinctBodyPart } = useExerciseDatabase(db);

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("");
  const colorScheme = useColorScheme(); // Detecta o tema atual (light ou dark)

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true; // Controle para evitar atualizações após o componente ser desmontado

      async function fetchInitialData() {
        try {
          const parts = await getDistinctBodyPart();
          const allExercises = await getExercises();

          if (isActive) {
            setSelectedBodyPart(""); // Reseta o filtro
            setBodyParts(parts || []);
            setExercises(allExercises || []);
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      }

      fetchInitialData();

      // Função de limpeza para evitar atualizações após desmontar
      return () => {
        isActive = false;
      };
    }, [getDistinctBodyPart, getExercises]) // Apenas funções externas como dependências
  );

  const handleFilterChange = async (value: string) => {
    setSelectedBodyPart(value);

    try {
      if (value === "") {
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
            { key: "", label: "Todos os grupos musculares" },
            ...bodyParts.map((part) => ({ key: part, label: part })),
          ]}
          initValue="Selecione um grupo muscular" // Valor inicial padrão
          selectedKey={selectedBodyPart} // Vincula o item selecionado ao estado
          onChange={(option) => handleFilterChange(option.key)}
          selectTextStyle={{ color: colorScheme === "dark" ? "white" : "black", fontSize: 16 }}
          optionContainerStyle={{ backgroundColor: colorScheme === "dark" ? "#1f2937" : "white", borderRadius: 8 }}
          optionTextStyle={{ color: colorScheme === "dark" ? "white" : "black", fontSize: 16 }}
          cancelStyle={{ backgroundColor: colorScheme === "dark" ? "#1f2937" : "white", borderRadius: 8 }}
          cancelTextStyle={{ color: colorScheme === "dark" ? "white" : "black", fontSize: 16 }}
        />
      </View>

      <ScrollView className="mt-4 px-4">
        {exercises.length === 0 ? (
          <Text className="text-gray-500 text-center mt-10">
            Nenhum exercício encontrado.
          </Text>
        ) : (
          exercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.exercise_id}
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
          ))
        )}
      </ScrollView>
    </View>
  );
}
