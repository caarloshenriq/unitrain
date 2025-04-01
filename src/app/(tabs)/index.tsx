import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text } from "react-native";
import ExportDatabase from "@/components/ExportDB";

export default function Tab() {
  return (
    <View className="bg-white p-4">
      <View className="flex flex-row justify-between">
        <Text>Home</Text>
        <ExportDatabase />
      </View>
    </View>
  );
}
