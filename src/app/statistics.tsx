import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutProgressChart from "@/components/WorkoutProgressChart";
import BodyInfoProgressChart from "@/components/BodyInfoProgressChart";
import Tabs from "@/components/Tabs";
import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";
import { useBodyInfoDatabase } from "@/database/BodyInfoDatabase";

// Tipos para os dados esperados
type WorkoutProgressData = {
  workout_name: string;
  data: { date: string; average_weight: number }[];
};

type BodyInfoProgressData = {
  measure_type: string;
  data: { date: string; average_measurement: number }[];
};

export default function Statistics() {
  const db = useSQLiteContext();
  const { getWorkoutsProgress } = useWorkoutDatabase(db);
  const { getBodyInfoProgress } = useBodyInfoDatabase(db);

  const [workoutsData, setWorkoutsData] = useState<WorkoutProgressData[]>([]);
  const [bodyInfoData, setBodyInfoData] = useState<BodyInfoProgressData[]>([]);
  const [activeTab, setActiveTab] = useState("carga");

  useEffect(() => {
    async function fetchData() {
      const workouts = await getWorkoutsProgress();
      const bodyInfo = await getBodyInfoProgress();
      setWorkoutsData(workouts || []);
      setBodyInfoData(bodyInfo || []);
    }

    fetchData();
  }, []);

  const cargaTab = (
    <View>
      {workoutsData.map((workout, index) => (
        <WorkoutProgressChart
          key={index}
          workout_name={workout.workout_name}
          data={workout.data}
        />
      ))}
    </View>
  );

  const medidasTab = (
    <View>
      {bodyInfoData.map((measure, index) => (
        <BodyInfoProgressChart
          key={index}
          measure_type={measure.measure_type}
          data={measure.data}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
      <ScrollView>
        <Tabs
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          tabs={[
            { key: "carga", title: "Carga", content: cargaTab },
            { key: "medidas", title: "Medidas", content: medidasTab },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
