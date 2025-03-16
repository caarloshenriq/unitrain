import { InitilizeDatabase } from "@/database/InitilizeDatabase";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import "../styles/global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SQLiteProvider databaseName="unitrain.db" onInit={InitilizeDatabase}>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
