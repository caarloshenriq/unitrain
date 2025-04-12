import { SQLiteDatabase } from "expo-sqlite";

export async function migrateWorkoutsInfoTable(db: SQLiteDatabase) {
    try {
      const existingColumns = await db.getAllAsync<{ name: string }>(
        `PRAGMA table_info(workouts_info);`
      );
  
      const hasExerciseId = existingColumns.some(col => col.name === "exercise_id");
  
      if (hasExerciseId) {
        console.log("Migrando tabela workouts_info...");
  
        await db.execAsync(`ALTER TABLE workouts_info RENAME TO workouts_info_old;`);
  
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS workouts_info (
            workouts_info_id INTEGER PRIMARY KEY AUTOINCREMENT,
            workout_id INTEGER NOT NULL,
            time FLOAT NOT NULL,
            date DATE NOT NULL,
            FOREIGN KEY (workout_id) REFERENCES workouts(workout_id) ON DELETE CASCADE
          );
        `);
  
        await db.execAsync(`DROP TABLE workouts_info_old;`);
  
        console.log("Migração concluída com sucesso.");
      }
    } catch (error) {
      console.error("Erro durante a migração da tabela workouts_info:", error);
    }
  }
  