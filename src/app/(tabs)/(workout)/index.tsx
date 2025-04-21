import Button from "@/components/Button";
import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";
import { getWeekdayName } from "@/utils/GetWeekdayName";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Workout } from "@/types/Workout";
import { useTheme } from "@/components/ThemeProvider";

export default function Tab() {
  const db = useSQLiteContext();
  const router = useRouter();
  const { getWorkouts, deleteWorkout } = useWorkoutDatabase(db);

  const [workouts, setWorkouts] = useState<Workout[]>([]);
<<<<<<< HEAD
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar o refresh
  const theme = useTheme();
=======
  const [refreshing, setRefreshing] = useState(false);
  const [openItem, setOpenItem] = useState<number | null>(null);
  const swipeableRefs = useRef<{ [key: number]: Swipeable | null }>({});
>>>>>>> a2fe641a (finalizando crud treino e exercicio)

  const fetchWorkouts = async () => {
    const data = await getWorkouts();
    setWorkouts(data || []);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchWorkouts();
    setRefreshing(false);
  };

  const handleDelete = (id: number, name: string) => {
    Alert.alert("Excluir Treino", `Deseja excluir o treino "${name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deleteWorkout(id);
          await fetchWorkouts();
        },
      },
    ]);
  };

  const renderRightActions = (item: Workout) => (
      <View style={{ flexDirection: "row", height: "100%" }}>
        <TouchableOpacity
          onPress={() => router.push(`/form?id=${item.workout_id}`)}
          style={{ backgroundColor: "#d1d5db", justifyContent: "center", alignItems: "center", width: 60, height: 72, borderRadius: 8 }}
        >
          <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.workout_id, item.name)}
          style={{ backgroundColor: "#ef4444", justifyContent: "center", alignItems: "center", width: 60, height: 72, borderRadius: 8 }}
        >
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );

  const handleSwipeStart = (id: number) => {
    if (openItem && openItem !== id) {
      swipeableRefs.current[openItem]?.close();
    }
    setOpenItem(id);
  };

  return (
    <View className="bg-white dark:bg-gray-700 dark:color-white p-4 flex-1">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-center text-black dark:color-white text-2xl mt-3 font-bold">Seus Treinos</Text>
        <Button
          icon={<Ionicons name="add" size={20} color="white" />}
          onPress={() => router.push("/form")}
          small
        />
      </View>

      <FlatList
        className="mt-4"
        data={workouts}
        keyExtractor={(item) => item.workout_id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
<<<<<<< HEAD
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
=======
        renderItem={({ item }) => (
          <Swipeable
            ref={(ref) => (swipeableRefs.current[item.workout_id] = ref)}
            renderRightActions={() => renderRightActions(item)}
            onSwipeableOpen={() => handleSwipeStart(item.workout_id)}
          >
            <TouchableOpacity className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm flex-row justify-between items-center" onPress={() => router.push(`/(workout)/${item.workout_id}`)}>
              <View>
                <Text className="text-black font-bold text-lg">{item.name}</Text>
                <Text className="text-gray-500">Dia: {getWeekdayName(item.weekday)}</Text>
>>>>>>> a2fe641a (finalizando crud treino e exercicio)
              </View>
              <Ionicons name="chevron-forward" size={24} color={theme.resolvedTheme === "dark" ? "white" : "gray"} />
            </TouchableOpacity>
          </Swipeable>
        )}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center mt-10">Nenhum treino cadastrado.</Text>
        }
      />
    </View>
  );
}
