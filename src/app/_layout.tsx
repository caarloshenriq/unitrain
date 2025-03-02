import {InitilizeDatabase} from "@/database/InitilizeDatabase";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import '../styles/global.css';

export default function Layout() {
  return (
    <SQLiteProvider databaseName="unitrain.db" onInit={InitilizeDatabase}>
      <Slot />
    </SQLiteProvider>
  );
}
