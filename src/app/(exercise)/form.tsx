import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useExerciseDatabase } from "@/database/UseExerciseDatabase";
import { Exercise } from "@/types/Exercise";
import { BodyPart } from "@/types/BodyPart";
import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { TextInput } from "react-native-gesture-handler";
import { useTheme } from "@/components/ThemeProvider";
import { Picker } from "@react-native-picker/picker";

export default function ExerciseForm() {
  const { id } = useLocalSearchParams();
  const isEdit = !!id;
  const db = useSQLiteContext();
  const router = useRouter();
  const { getExercise, addExercise, updateExercise, getBodyPart } =
    useExerciseDatabase(db);
  const theme = useTheme();

  const [bodyParts, setBodyParts] = useState<BodyPart[]>([]);
  const [exercise, setExercise] = useState<Exercise>({
    exercise_id: 0,
    name: "",
    description: "",
    body_part: "",
    img: "",
  });

  useEffect(() => {
    async function loadData() {
      const parts = await getBodyPart();
      setBodyParts(parts || []);

      if (isEdit) {
        const existing = await getExercise(Number(id));
        if (existing) {
          const matchedPart = parts.find((p) => p.name === existing.body_part);
          setExercise({
            ...existing,
            body_part: matchedPart?.body_part_id.toString() || "",
          });
        }
      }
    }

    loadData();
  }, [id]);

  async function handleSubmit() {
    const payload: Exercise = {
      ...exercise,
      body_part: exercise.body_part,
    };

    if (isEdit) {
      await updateExercise(payload);
    } else {
      await addExercise(payload);
    }

    Alert.alert(
      "Sucesso",
      isEdit
        ? "Exercício atualizado com sucesso!"
        : "Exercício criado com sucesso!"
    );

    router.push("/(exercise)/");
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

      <Text className="text-black dark:text-white font-semibold mt-4 mb-1">
        Grupo Muscular
      </Text>
      <View className="border border-gray-300 rounded-md bg-white dark:bg-gray-600">
        <Picker
          selectedValue={exercise.body_part}
          onValueChange={(val) => setExercise({ ...exercise, body_part: val })}
        >
          <Picker.Item label="Selecione um grupo muscular" value="" />
          {bodyParts.map((bp) => (
            <Picker.Item
              key={bp.body_part_id}
              label={bp.name}
              value={bp.body_part_id.toString()}
            />
          ))}
        </Picker>
      </View>

      <Text className="text-black dark:text-white font-semibold mt-4 mb-1">
        Descrição
      </Text>
      <TextInput
        multiline
        numberOfLines={4}
        value={exercise.description}
        onChangeText={(val) => setExercise({ ...exercise, description: val })}
        placeholder="Descreva a execução"
        className="border border-gray-300 rounded-md p-2 text-black dark:text-white bg-white dark:bg-gray-600"
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
