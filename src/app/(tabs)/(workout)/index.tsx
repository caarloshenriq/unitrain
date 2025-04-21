import Button from "@/components/Button";
import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";
import { getWeekdayName } from "@/utils/GetWeekdayName";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { Workout } from "@/types/Workout";
import { useTheme } from "@/components/ThemeProvider";

export default function Tab() {
  const db = useSQLiteContext();
  const router = useRouter();
  const { getWorkouts } = useWorkoutDatabase(db);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar o refresh
  const theme = useTheme();

  const fetchWorkouts = async () => {
    const data = await getWorkouts();
    setWorkouts(data || []);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true); // Ativa o estado de "refreshing"
    await fetchWorkouts(); // Recarrega os dados
    setRefreshing(false); // Desativa o estado de "refreshing"
  };

  return (
    <View className="bg-white dark:bg-gray-700 dark:color-white p-4 flex-1">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-center text-black dark:color-white text-2xl mt-3 font-bold">Seus Treinos</Text>
        <Button
          icon={<Ionicons name="add" size={20} color="white" />}
          onPress={() => router.push("/newWorkout")}
          small={true}
        />
      </View>
      <ScrollView
        className="mt-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {workouts.length === 0 ? (
          <Text className="text-gray-500 text-center mt-10">Nenhum treino cadastrado.</Text>
        ) : (
          workouts.map((workout) => (
            <TouchableOpacity
              key={workout.workout_id}
              className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-4 shadow-sm flex-row justify-between items-center"
              onPress={() => router.push(`/(workout)/${workout.workout_id}`)}
            >
              <View>
                <Text className="text-black dark:text-white font-bold text-lg">{workout.name}</Text>
                <Text className="text-gray-500 dark:text-gray-400">Dia: {getWeekdayName(workout.weekday)}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={theme.resolvedTheme === "dark" ? "white" : "gray"} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}