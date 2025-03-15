import Input from "@/components/Input";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function newWorkout() {
  const db = useSQLiteContext();
  const [name, setName] = useState("");
  const [weekday, setWeekday] = useState("");
  const [exercises, setExercises] = useState([]);

  return (
      <View className="bg-white p-4">
        <Input label="Nome do Treino" type="text" value={name} onChangeText={setName} placeholder="Ex: Treino de Costas"/>
 
      </View>
  );
}

export const options = {
  title: "Novo Treino",
};