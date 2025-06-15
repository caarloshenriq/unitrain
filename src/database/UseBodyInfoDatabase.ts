import { BodyInfo } from "@/types/BodyInfo";
import { SQLiteDatabase } from "expo-sqlite";
import { useState } from "react";

export function useBodyInfoDatabase(db: SQLiteDatabase) {
  const [bodyInfo, setBodyInfo] = useState<BodyInfo[]>([]);

  async function getAllBodyInfo() {
    try {
      const result = await db.getAllAsync<BodyInfo>("SELECT * FROM body_info;");
      setBodyInfo(result);
      return result;
    } catch (error) {
      console.error("Erro ao buscar informações do corpo:", error);
      return [];
    }
  }

  async function getBodyInfo(body_info_id: number) {
    try {
      const result = await db.getFirstAsync<BodyInfo>(
        "SELECT * FROM body_info WHERE body_info_id = ?;",
        [body_info_id]
      );
      return result;
    } catch (error) {
      console.error("Erro ao buscar informações do corpo:", error);
      return null;
    }
  }

  async function addBodyInfo(bodyInfo: BodyInfo) {
    try {
      const result = await db.runAsync(
        "INSERT INTO body_info (measure_type, measurement, measurement_date) VALUES (?, ?, ?);",
        [bodyInfo.measure_type, bodyInfo.measurement, bodyInfo.measurement_date]
      );
      return result;
    } catch (error) {
      console.error("Erro ao adicionar informações do corpo:", error);
      return null;
    }
  }

  async function updateBodyInfo(bodyInfo: BodyInfo) {
    try {
      if (!bodyInfo.body_info_id) {
        console.error("ID de informações do corpo não fornecido.");
        return null;
      }
      const result = await db.runAsync(
        "UPDATE body_info SET measure_type = ?, measurement = ?, measurement_date = ? WHERE body_info_id = ?;",
        [
          bodyInfo.measure_type,
          bodyInfo.measurement,
          bodyInfo.measurement_date,
          bodyInfo.body_info_id,
        ]
      );
      return result;
    } catch (error) {
      console.error("Erro ao atualizar informações do corpo:", error);
      return null;
    }
  }

  async function deleteBodyInfo(body_info_id: number) {
    try {
      const result = await db.runAsync(
        "DELETE FROM body_info WHERE body_info_id = ?;",
        [body_info_id]
      );
      return result;
    } catch (error) {
      console.error("Erro ao deletar informações do corpo:", error);
      return null;
    }
  }

  type RawProgressRow = {
    measure_type: string;
    measurement_date: string;
    average_measurement: number;
  };

  type GroupedProgress = {
    measure_type: string;
    data: { date: string; average_measurement: number }[];
  };

  async function getBodyInfoProgress() {
    const sql = `
      SELECT measure_type, measurement_date, AVG(measurement) as average_measurement
      FROM body_info
      GROUP BY measure_type, measurement_date
      ORDER BY measurement_date ASC;
    `;
    try {
      const result = await db.getAllAsync<RawProgressRow>(sql);
      const grouped = result.reduce<GroupedProgress[]>((acc, item) => {
        const existing = acc.find((g) => g.measure_type === item.measure_type);
        const dataPoint = {
          date: item.measurement_date,
          average_measurement: item.average_measurement,
        };
        if (existing) {
          existing.data.push(dataPoint);
        } else {
          acc.push({ measure_type: item.measure_type, data: [dataPoint] });
        }
        return acc;
      }, []);

      return grouped;
    } catch (error) {
      console.error("Erro ao buscar progresso de medidas corporais:", error);
      return [];
    }
  }

  return {
    getAllBodyInfo,
    getBodyInfo,
    addBodyInfo,
    updateBodyInfo,
    deleteBodyInfo,
    bodyInfo,
    getBodyInfoProgress,
  };
}
