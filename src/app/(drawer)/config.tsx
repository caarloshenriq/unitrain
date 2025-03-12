import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Config() {
  const db = useSQLiteContext();

  return (
    <View className="bg-white">
      <Text className="text-center">Hello World (receba page)</Text>
    </View>
  );
}
