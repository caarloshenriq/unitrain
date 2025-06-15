import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import ResumeWorkout from "@/components/ResumeWorkout";

export default function Tab() {
  const db = useSQLiteContext();
  const theme = useTheme();
  const workout = useWorkoutDatabase(db);
  const [workouts, setWorkouts] = useState<number[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchWorkoutIds() {
    const workoutsInfoIds = await workout.getLastSevenDaysWorkouts();
    setWorkouts(workoutsInfoIds || []);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchWorkoutIds();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchWorkoutIds();
  }, []);

  return (
    <View
      className="flex-1 p-4"
      style={{
        backgroundColor: theme.resolvedTheme === "dark" ? "#1f2937" : "#FFFFFF",
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {workouts.length === 0 && (
          <Text className="text-gray-500 dark:text-gray-400 mt-8 text-center">
            Nenhum treino encontrado.
          </Text>
        )}

        {workouts.map((id) => (<ResumeWorkout key={id} workoutsInfoId={id} />))}

      </ScrollView>
    </View>
  );
}
