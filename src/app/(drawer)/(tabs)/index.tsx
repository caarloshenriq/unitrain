import { useSQLiteContext } from "expo-sqlite";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  const db = useSQLiteContext();

  return (
    <SafeAreaView>
      <View className="bg-white">
        <Text className="text-center">Hello World (Home page)</Text>
      </View>
    </SafeAreaView>
  );
}
