import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text } from "react-native";

export default function Tab() {
  const db = useSQLiteContext();
  const router = useRouter();

  return (
    <View className="bg-white p-4">
      <View className="flex flex-row justify-between">
        <Text></Text>
      <Text className="text-center text-black text-lg mt-3">Hello World (Home page)</Text>
      <Button
        icon={<Ionicons name="add" size={20} color="white" />}
        onPress={() => router.navigate("/newWorkout")}
        small={true}
      />
      </View>
    </View>
  );
}
