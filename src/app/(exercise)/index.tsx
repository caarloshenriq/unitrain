import Button from "@/components/Button";
import { useExerciseDatabase } from "@/database/UseExerciseDatabase";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ModalSelector from "react-native-modal-selector";
import { Exercise } from '@/types/Exercise';
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native"; // Importa o hook para detectar o tema do sistema
import { useFocusEffect } from "@react-navigation/native"; // Importa o hook para detectar o foco da tela
=======
import { useEffect, useRef, useState } from "react";
import { BodyPart } from "@/types/BodyPart";
import { Swipeable } from "react-native-gesture-handler";
>>>>>>> a2fe641a (finalizando crud treino e exercicio)

export default function Exercises() {
  const db = useSQLiteContext();
  const router = useRouter();
<<<<<<< HEAD
  const { getExercises, getExerciseByBodyPart, getDistinctBodyPart } = useExerciseDatabase(db);

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("");
  const colorScheme = useColorScheme(); // Detecta o tema atual (light ou dark)
=======
  const { getExercises, getExerciseByBodyPart, getBodyPart, deleteExercise } = useExerciseDatabase(db);

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<number>();
  const swipeableRef = useRef<Swipeable | null>(null);
>>>>>>> a2fe641a (finalizando crud treino e exercicio)

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

  const handleDelete = async (id: number) => {
    await deleteExercise(id);
    const updatedList = await getExercises();
    setExercises(updatedList || []);
  };

  const renderRightActions = (exercise_id: number) => (
    <View style={{ flexDirection: "row", height: "100%" }}>
      <TouchableOpacity
        onPress={() => router.push(`/form?id=${exercise_id}`)}
        style={{ backgroundColor: "#d1d5db", justifyContent: "center", alignItems: "center", width: 60,height: 72, borderRadius: 8 }}
      >
        <Ionicons name="create-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDelete(exercise_id)}
        style={{ backgroundColor: "#ef4444", justifyContent: "center", alignItems: "center", width: 60,height: 72, borderRadius: 8 }}
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

<<<<<<< HEAD
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
=======
      <View className="border border-gray-300 rounded-md mt-4 mx-4">
        <Picker
          selectedValue={selectedBodyPart}
          onValueChange={handleFilterChange}
        >
          <Picker.Item label="Todos os grupos musculares" value={0} />
          {bodyParts.map((part) => (
            <Picker.Item key={part.body_part_id} label={part.name} value={part.body_part_id} />
          ))}
        </Picker>
>>>>>>> a2fe641a (finalizando crud treino e exercicio)
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
<<<<<<< HEAD
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
=======
              ref={(ref) => {
                if (ref) swipeableRef.current = ref;
              }}
              onSwipeableWillOpen={() => {
                if (swipeableRef.current) swipeableRef.current.close();
                swipeableRef.current = null;
              }}
              renderRightActions={() => renderRightActions(exercise.exercise_id)}
            >
              <TouchableOpacity
                className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm flex-row justify-between items-center"
                onPress={() => router.push(`/(exercise)/${exercise.exercise_id}`)}
              >
                <View>
                  <Text className="text-black font-bold text-lg">
                    {exercise.name}
                  </Text>
                  <Text className="text-gray-500">
                    Grupo muscular: {exercise.body_part}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="gray" />
              </TouchableOpacity>
            </Swipeable>
>>>>>>> a2fe641a (finalizando crud treino e exercicio)
          ))
        )}
      </ScrollView>
    </View>
  );
}
