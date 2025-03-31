import {BackupTables} from "@/types/BackupTables";
import * as FileSystem from "expo-file-system";
import {SQLiteDatabase} from "expo-sqlite";

export async function exportBackup(db: SQLiteDatabase): Promise<string> {
    const tables = [
        "workouts",
        "exercise",
        "workout_exercise",
        "body_info",
        "workouts_info",
    ];
    const result: Partial<BackupTables> = {};

    for (const table of tables) {
        result[table as keyof BackupTables] = await db.getAllAsync<any>(`SELECT *
                                                                         FROM ${table}`, []);
    }

    const jsonBackup = JSON.stringify({
        metadata: {
            version: "1.0",
            exported_at: new Date().toISOString(),
        },
        tables: result,
    });

    const fileName = `unitrain_backup_${new Date()
        .toISOString()
        .slice(0, 10)}.bak`;
    const fileUri = FileSystem.documentDirectory! + fileName;

    await FileSystem.writeAsStringAsync(fileUri, jsonBackup, {
        encoding: FileSystem.EncodingType.UTF8,
    });

    return fileUri;
}

export async function importBackup(
    db: SQLiteDatabase,
    fileUri: string
): Promise<void> {
    const content = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
    });

    const parsed = JSON.parse(content);
    const tables = parsed.tables as BackupTables;

    await db.withExclusiveTransactionAsync(async (txn) => {
        for (const tableName of Object.keys(tables) as (keyof BackupTables)[]) {
            await txn.execAsync(`DELETE
                                 FROM ${tableName}`);
        }

        for (const [tableName, rows] of Object.entries(tables) as [
            keyof BackupTables,
            any[]
        ][]) {
            for (const row of rows) {
                const columns: string[] = Object.keys(row);
                const placeholders: string = columns.map(() => "?").join(", ");
                const values: any[] = Object.values(row);

                const query: string = `INSERT INTO ${tableName} (${columns.join(
                        ", "
                )})
                                       VALUES (${placeholders})`;

                await txn.runAsync(query, values);
            }
        }
    });
}
