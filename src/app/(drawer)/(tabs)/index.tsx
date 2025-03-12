import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text } from "react-native";

export default function Tab() {
  const db = useSQLiteContext();

  return (
    <View className="bg-white">
      <Text className="text-center">Hello World (Home page)</Text>
      <Button
        icon={<Ionicons name="add" size={20} color="white" />}
        onPress={() => console.log("Adicionar")}
        small = {true}
      />
    </View>
  );
}
