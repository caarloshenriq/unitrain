import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartesianChart, Line } from "victory-native";
import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";
import { format } from "date-fns";

export default function Statistics() {
  const db = useSQLiteContext();
  const { getWorkoutsProgress } = useWorkoutDatabase(db);

  const [progressData, setProgressData] = useState<
    { workout_name: string; data: { date: string; average_weight: number }[] }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      const workouts = await getWorkoutsProgress();
      setProgressData(workouts);
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Estatísticas de Carga</Text>

        {progressData.map((workout, index) => (
          <View key={index} style={styles.chartContainer}>
            <Text style={styles.workoutName}>{workout.workout_name}</Text>

            <View style={{ width: "100%", height: 300 }}>
              <CartesianChart
                data={
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
                            new Date(workout.data[0].date).getTime() +
                            1000 * 60 * 60,
                          weight: workout.data[0].average_weight,
                        }, // +1h
                      ]
                    : []
                }
                xKey="day"
                yKeys={["weight"]}
                axisOptions={{
                  tickCount: 5,
                  labelPosition: "inset",
                  formatYLabel: (value) => `${value}kg`,
                  formatXLabel: (value) => format(new Date(value), "dd/MM"),
                }}
              >
                {({ points }) =>
                  points.weight.length > 0 ? (
                    <Line
                      points={points.weight}
                      color="black"
                      strokeWidth={4}
                    />
                  ) : (
                    <></>
                  )
                }
              </CartesianChart>
            </View>
          </View>
        ))}
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
  latestWeight: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  latestDate: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginBottom: 8,
  },
});
