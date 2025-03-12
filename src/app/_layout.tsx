import { InitilizeDatabase } from "@/database/InitilizeDatabase";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import "../styles/global.css";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="unitrain.db" onInit={InitilizeDatabase}>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}
