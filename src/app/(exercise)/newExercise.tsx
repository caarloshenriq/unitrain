import Input from "@/components/Input";
import Button from "@/components/Button";
import { useExerciseDatabase } from "@/database/UseExerciseDatabase";
import { Exercise } from "@/types/Exercise";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewExercise() {
  const db = useSQLiteContext();
  const router = useRouter();
  const { addExercise, getDistinctBodyPart } = useExerciseDatabase(db);

  const [name, setName] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [description, setDescription] = useState("");
  const [bodyParts, setBodyParts] = useState<string[]>([]);

  useEffect(() => {
    async function fetchParts() {
      const parts = await getDistinctBodyPart();
      if (parts) setBodyParts(parts);
    }
    fetchParts();
  }, []);

  async function handleSave() {
    if (!name || !bodyPart || !description) {
      return Alert.alert("Erro", "Preencha todos os campos.");
    }

    await addExercise({
      name,
      body_part: bodyPart,
      description,
    } as Exercise);

    Alert.alert("Sucesso", "Exercício criado com sucesso!");
    router.push('../exercise/index');
  }

  return (
    <SafeAreaView className="bg-white p-4 flex-1">
      <Text className="text-black text-xl font-bold mb-4">Novo Exercício</Text>

      <Input
        label="Nome do exercício"
        value={name}
        onChangeText={setName}
        placeholder="Ex: Leg Press 45º"
        type="text"
      />

      <Text className="text-black mt-4">Grupo Muscular</Text>
      <View className="border border-gray-300 rounded-md mt-2">
        <Picker
          selectedValue={bodyPart}
          onValueChange={(itemValue) => setBodyPart(itemValue)}
        >
          <Picker.Item label="Selecione" value="" />
          {bodyParts.map((part) => (
            <Picker.Item key={part} label={part} value={part} />
          ))}
        </Picker>
      </View>

      <Text className="text-black mt-4">Descrição do exercício</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-2 text-black mt-2"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
        placeholder="Explique como realizar o exercício"
      />

      <View className="mt-6">
        <Button title="Salvar Exercício" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
}

export const options = {
  title: "Novo Exercício",
};
