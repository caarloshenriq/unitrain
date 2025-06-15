import { View, Text, ScrollView } from "react-native";
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

  useEffect(() => {
    async function fetchWorkoutIds() {
      const workoutsInfoIds = await workout.getLastSevenDaysWorkouts();

      if (workoutsInfoIds != null && workoutsInfoIds.length > 0) {
        setWorkouts(workoutsInfoIds);
      }
    }

    fetchWorkoutIds();
  }, []);

  return (
    <View
      className="flex-1 p-4"
      style={{
        backgroundColor: theme.resolvedTheme === "dark" ? "#1f2937" : "#FFFFFF",
      }}
    >
      <ScrollView>
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
