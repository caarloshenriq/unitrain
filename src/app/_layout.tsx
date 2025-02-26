import {InitilizeDatabase} from "@/database/InitilizeDatabase";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="unitrain.db" onInit={InitilizeDatabase}>
      <Slot />
    </SQLiteProvider>
  );
}
