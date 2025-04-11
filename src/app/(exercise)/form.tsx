import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useExerciseDatabase } from "@/database/UseExerciseDatabase";
import { Exercise } from "@/types/Exercise";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { TextInput } from "react-native-gesture-handler";
import { useTheme } from "@/components/ThemeProvider";

export default function ExerciseForm() {
  const { id } = useLocalSearchParams(); // pega o ID se existir
  const isEdit = !!id;
  const db = useSQLiteContext();
  const router = useRouter();
  const { getExercise, addExercise, updateExercise } = useExerciseDatabase(db);
  const theme = useTheme();

  const [exercise, setExercise] = useState<Exercise>({
    exercise_id: 0,
    name: "",
    description: "",
    body_part: "",
    img: "",
  });

  useEffect(() => {
    if (isEdit) {
      (async () => {
        const existing = await getExercise(Number(id));
        if (existing) setExercise(existing);
      })();
    }
  }, [id]);

  async function handleSubmit() {
    if (isEdit) {
      await updateExercise(exercise);
    } else {
      await addExercise(exercise);
    }
    router.push("/(exercise)/index");
  }

  return (
    <View className="bg-white dark:bg-gray-700 dark:text-white p-4 flex-1">
      <Text className="text-xl font-bold text-black dark:text-white mb-4">
        {isEdit ? "Editar Exercício" : "Novo Exercício"}
      </Text>

      <Input
        label="Nome do Exercício"
        type="text"
        value={exercise.name}
        onChangeText={(val) => setExercise({ ...exercise, name: val })}
        placeholder="Ex: Rosca Direta"
      />

      <Input
        label="Grupo Muscular"
        type="text"
        value={exercise.body_part}
        onChangeText={(val) => setExercise({ ...exercise, body_part: val })}
        placeholder="Ex: Bíceps"
      />

      <Text className="text-black dark:text-white font-semibold mb-1">Descrição</Text>
      <TextInput
        multiline
        numberOfLines={4}
        value={exercise.description}
        onChangeText={(val) => setExercise({ ...exercise, description: val })}
        placeholder="Descreva a execução"
        className="border border-gray-300 rounded-md p-2 text-black dark:text-white"
        placeholderTextColor={theme.resolvedTheme === "dark" ? "#ccc" : "#999"}
        textAlignVertical="top"
      />

      <View className="mt-4">
        <Button
          title={isEdit ? "Salvar Alterações" : "Criar Exercício"}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}
