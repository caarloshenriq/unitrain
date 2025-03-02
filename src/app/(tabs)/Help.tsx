import { useSQLiteContext } from "expo-sqlite";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  const db = useSQLiteContext();

  return (
    <SafeAreaView>
      <View>
        <Text className="text-center">Hello World (Help page)</Text>
      </View>
    </SafeAreaView>
  );
}
