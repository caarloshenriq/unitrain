import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text } from "react-native";
import { Workout } from "@/types/Workout";
import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";

export default function Tab() {
  const db = useSQLiteContext();
  const router = useRouter();

  return (
    <View className="bg-white p-4">
      <View className="flex flex-row justify-between">
        <Text>Estatisticas</Text>
      
      </View>
    </View>
  );
}
