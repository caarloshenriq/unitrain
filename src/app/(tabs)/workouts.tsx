import Button from "@/components/Button";
import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";
import { getWeekdayName } from "@/utils/GetWeekdayName";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function Tab() {
  const db = useSQLiteContext();
  const router = useRouter();
  const { getWorkouts } = useWorkoutDatabase(db);
  const [workouts, setWorkouts] = useState<{ workout_id: number; name: string; weekday: string }[]>([]);

  useEffect(() => {
    async function fetchWorkouts() {
      const data = await getWorkouts();
      setWorkouts(data || []);
    }
    fetchWorkouts();
  }, []);

  return (
    <View className="bg-white p-4 flex-1">
      <View className="flex flex-row justify-between items-center">
        <Text></Text>
        <Text className="text-center text-black text-2xl mt-3 font-bold">Seus Treinos</Text>
        <Button
          icon={<Ionicons name="add" size={20} color="white" />}
          onPress={() => router.push("/newWorkout")}
          small={true}
        />
      </View>
      <ScrollView className="mt-4">
        {workouts.length === 0 ? (
          <Text className="text-gray-500 text-center mt-10">Nenhum treino cadastrado.</Text>
        ) : (
          workouts.map((workout) => (
            <TouchableOpacity
              key={workout.workout_id}
              className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm flex-row justify-between items-center"
              // onPress={() => router.push(`/workout/${workout.workout_id}`)}
            >
              <View>
                <Text className="text-black font-bold text-lg">{workout.name}</Text>
                <Text className="text-gray-500">Dia: {getWeekdayName(workout.weekday)}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
