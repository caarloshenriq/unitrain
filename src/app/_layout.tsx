import { InitilizeDatabase } from "@/database/InitilizeDatabase";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import "../styles/global.css";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="unitrain.db" onInit={InitilizeDatabase}>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      {/* </SafeAreaView> */}
    </SQLiteProvider>
  );
}
