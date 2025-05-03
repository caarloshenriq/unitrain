import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartesianChart, Line } from "victory-native";
import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";
import { format } from "date-fns";
import { useFont } from "@shopify/react-native-skia";

export default function Statistics() {
  const db = useSQLiteContext();
  const { getWorkoutsProgress } = useWorkoutDatabase(db);
  const font = useFont(require("@/fonts/Roboto-Regular.ttf"));

  const [progressData, setProgressData] = useState<
    { workout_name: string; data: { date: string; average_weight: number }[] }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      const workouts = await getWorkoutsProgress();
      const processed = workouts.map((workout) => ({
        workout_name: workout.workout_name,
        data: [...workout.data],
      }));
      setProgressData(processed);
    }
    fetchData();
  }, [progressData]);

  if (!font) {
    return <Text style={{ textAlign: "center", marginTop: 50 }}>Carregando fonte...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Estatísticas de Carga</Text>

        {progressData.map((workout, index) => {
          const chartData =
            workout.data.length >= 2
              ? workout.data.map((d) => ({
                  day: new Date(d.date).getTime(),
                  weight: d.average_weight,
                }))
              : workout.data.length === 1
              ? [
                  {
                    day: new Date(workout.data[0].date).getTime(),
                    weight: workout.data[0].average_weight,
                  },
                  {
                    day:
                      new Date(workout.data[0].date).getTime() + 1000 * 60 * 60,
                    weight: workout.data[0].average_weight,
                  },
                ]
              : [];

          return (
            <View
              key={`${workout.workout_name}-${index}`}
              style={styles.chartContainer}
            >
              <Text style={styles.workoutName}>{workout.workout_name}</Text>

              <View style={{ width: "100%", height: 300 }}>
                {chartData.length > 0 ? (
                  <CartesianChart
                    data={chartData}
                    xKey="day"
                    yKeys={["weight"]}
                    axisOptions={{
                      tickCount: 5,
                      font: font,
                      labelOffset: { x: 3, y: 5 },
                      labelPosition: "inset",
                      formatYLabel: (value) => `${value} kg`,
                      formatXLabel: (value) =>
                        format(new Date(value), "dd/MM"),
                    }}
                  >
                    {({ points }) =>
                      points.weight?.length > 0 ? (
                        <Line
                          points={points.weight}
                          color="black"
                          strokeWidth={4}
                        />
                      ) : null
                    }
                  </CartesianChart>
                ) : (
                  <Text style={styles.noData}>Sem dados suficientes</Text>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    marginBottom: 16,
  },
  chartContainer: {
    marginBottom: 32,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    marginBottom: 8,
  },
  noData: {
    textAlign: "center",
    color: "gray",
    fontStyle: "italic",
    marginTop: 20,
  },
});
