import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useWorkoutExerciseDatabase } from "@/database/workoutExerciseDatabase";
import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Workout } from "@/types/Workout";
import { WorkoutsInfo } from "@/types/WorkoutsInfo";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { useWorkoutInfoDatabase } from "@/database/workoutInfoDatabase";

export default function WorkoutExecution() {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const { getWorkout } = useWorkoutDatabase(db);
  const { getWorkoutDetail } = useWorkoutExerciseDatabase(db);
  const {createWorkoutInfo} = useWorkoutInfoDatabase(db);

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState("00:00");
  const [exerciseState, setExerciseState] = useState<
    {
      exercise_id: number;
      name: string;
      description: string;
      body_part: string;
      series: number;
      repetition: number;
      inputs: { weight: string; completed: boolean }[];
    }[]
  >([]);

  useEffect(() => {
    async function fetchWorkoutDetails() {
      if (!id) return;

      const workout = await getWorkout(Number(id));
      setWorkout(workout);

      const workoutExercises = await getWorkoutDetail(Number(id));
      const formatted = workoutExercises.map((exercise) => ({
        ...exercise,
        inputs: Array.from({ length: exercise.series }).map(() => ({
          weight: "",
          completed: false,
        })),
      }));
      setExerciseState(formatted);
    }

    fetchWorkoutDetails();
  }, [id]);

  const toggleCompleted = (exerciseIndex: number, setIndex: number) => {
    const updated = [...exerciseState];
    const input = updated[exerciseIndex].inputs[setIndex];
    input.completed = !input.completed;
    updated[exerciseIndex].inputs[setIndex] = input;
    setExerciseState(updated);
  };

  const updateWeight = (
    exerciseIndex: number,
    setIndex: number,
    weight: string
  ) => {
    const updated = [...exerciseState];
    updated[exerciseIndex].inputs[setIndex].weight = weight;
    setExerciseState(updated);
  };

  useEffect(() => {
    let interval: any;

    if (isRunning && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        const minutes = String(Math.floor(diff / 60)).padStart(2, "0");
        const seconds = String(diff % 60).padStart(2, "0");
        setElapsed(`${minutes}:${seconds}`);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const handleStartStop = async () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(new Date());
    } else {
      setIsRunning(false);

      const date = new Date().toISOString().split("T")[0];

      const workoutInfos: WorkoutsInfo[] = [];

      exerciseState.forEach((exercise) => {
        exercise.inputs.forEach((input) => {
          if (input.weight && input.completed) {
            workoutInfos.push({
              workout_id: Number(id),
              exercise_id: exercise.exercise_id,
              weight: parseFloat(input.weight),
              date,
            });
          }
        });
      });

      try {
        for (const info of workoutInfos) {
          await createWorkoutInfo(info);
        }

        Alert.alert("Treino finalizado", `Duração: ${elapsed}`);
      } catch (error) {
        console.error("Erro ao salvar os dados do treino:", error);
        Alert.alert("Erro", "Não foi possível salvar os dados do treino.");
      }
    }
  };

  return (
    <ScrollView className="bg-white p-4 flex-1">
      <Text className="text-2xl font-bold text-black text-center">
        {workout?.name} {isRunning && `(${elapsed})`}
      </Text>

      <Text className="mt-4 text-black font-bold">Exercícios</Text>
      <View className="border border-gray-300 rounded-md mt-2 p-2">
        {exerciseState.map((exercise, exerciseIndex) => (
          <View
            key={exercise.exercise_id}
            className="mb-6 border-b border-gray-300 pb-4"
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-black font-semibold text-lg">
                {exercise.name} ({exercise.series} x {exercise.repetition})
              </Text>
              <TouchableOpacity
                onPress={() => {
                  alert(exercise.description);
                }}
              >
                <Ionicons name="help-circle-outline" size={20} color="black" />
              </TouchableOpacity>
            </View>

            <Text className="text-gray-500 mb-2">{exercise.body_part}</Text>

            {exercise.inputs.map((input, setIndex) => (
              <View
                key={setIndex}
                className="flex-row items-center justify-between mb-2"
              >
                <Text className="text-black">Série {setIndex + 1}</Text>
                <TextInput
                  className={`border p-2 rounded-md text-black w-32 ${
                    input.completed ? "bg-gray-200" : "bg-white"
                  }`}
                  placeholder="Peso (kg)"
                  keyboardType="numeric"
                  editable={!input.completed}
                  value={input.weight}
                  onChangeText={(value) =>
                    updateWeight(exerciseIndex, setIndex, value)
                  }
                />
                <TouchableOpacity
                  onPress={() => toggleCompleted(exerciseIndex, setIndex)}
                >
                  <Ionicons
                    name={input.completed ? "checkbox" : "square-outline"}
                    size={24}
                    color={input.completed ? "green" : "gray"}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </View>
      <View className="mt-2">
        <Button
          title={isRunning ? "Finalizar" : "Iniciar Treino"}
          onPress={handleStartStop}
        />
      </View>
    </ScrollView>
  );
}
