import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useWorkoutExerciseDatabase } from "@/database/workoutExerciseDatabase";
import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";
import { useWorkoutInfoDatabase } from "@/database/workoutInfoDatabase";
import { useWorkoutProgressDatabase } from "@/database/WorkoutProgressDatabase";
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
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { useTheme } from "@/components/ThemeProvider";

export default function WorkoutExecution() {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const router = useRouter();
  const { getWorkout } = useWorkoutDatabase(db);
  const { getWorkoutDetail } = useWorkoutExerciseDatabase(db);
  const { createWorkoutInfo } = useWorkoutInfoDatabase(db);
  const { createWorkoutProgress } = useWorkoutProgressDatabase(db);
  const theme = useTheme();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState("00:00");
  const [exerciseState, setExerciseState] = useState(
    [] as {
      exercise_id: number;
      name: string;
      description: string;
      body_part: string;
      series: number;
      repetition: number;
      inputs: { weight: string; reps: string; completed: boolean }[];
    }[]
  );

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
          reps: "",
          completed: false,
        })),
      }));
      setExerciseState(formatted);
    }

    fetchWorkoutDetails();
  }, [id]);

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

  const toggleCompleted = (exerciseIndex: number, setIndex: number) => {
    const updated = [...exerciseState];
    updated[exerciseIndex].inputs[setIndex].completed =
      !updated[exerciseIndex].inputs[setIndex].completed;
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

  const updateReps = (
    exerciseIndex: number,
    setIndex: number,
    reps: string
  ) => {
    const updated = [...exerciseState];
    updated[exerciseIndex].inputs[setIndex].reps = reps;
    setExerciseState(updated);
  };

  const handleStartStop = async () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(new Date());
    } else {
      setIsRunning(false);

      if (!startTime) return;

      const endTime = new Date();
      const durationInMinutes =
        (endTime.getTime() - startTime.getTime()) / 60000;

      try {
        const workout_info_id = await createWorkoutInfo({
          workout_id: Number(id),
          time: parseFloat(durationInMinutes.toFixed(2)),
          date: new Date().toISOString(),
        });

        if (!workout_info_id) {
          Alert.alert("Erro", "Não foi possível salvar os dados do treino.");
          return;
        }

        for (const exercise of exerciseState) {
          for (const input of exercise.inputs) {
            if (input.completed && input.weight && input.reps) {
              await createWorkoutProgress({
                workout_info_id,
                exercise_id: exercise.exercise_id,
                repetition: Number(input.reps),
                weight: parseFloat(input.weight),
              });
            }
          }
        }

        Alert.alert("Treino finalizado", `Duração: ${elapsed}`);
        router.push("/(tabs)/(workout)");
      } catch (error) {
        console.error("Erro ao salvar o treino:", error);
        Alert.alert("Erro", "Não foi possível salvar os dados do treino.");
      }
    }
  };

  return (
    <ScrollView className="bg-white p-4 flex-1 dark:bg-gray-700">
      <Text className="text-2xl font-bold text-black text-center dark:text-white">
        {workout?.name} {isRunning && `(${elapsed})`}
      </Text>

      <Text className="mt-4 text-black font-bold dark:text-white">
        Exercícios
      </Text>
      <View className="border border-gray-300 rounded-md mt-2 p-2">
        {exerciseState.map((exercise, exerciseIndex) => (
          <View
            key={exercise.exercise_id}
            className="mb-6 border-b border-gray-300 pb-4"
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-black font-semibold text-lg dark:text-white">
                {exercise.name} ({exercise.series} x {exercise.repetition})
              </Text>
              <TouchableOpacity onPress={() => alert(exercise.description)}>
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color={theme.resolvedTheme === "dark" ? "white" : "gray"}
                />
              </TouchableOpacity>
            </View>

            <Text className="text-gray-500 mb-2 dark:text-gray-300">
              {exercise.body_part}
            </Text>

            {exercise.inputs.map((input, setIndex) => {
              const previousCompleted =
                setIndex === 0 || exercise.inputs[setIndex - 1].completed;

              return (
                <View
                  key={setIndex}
                  className="flex-row items-center justify-between mb-2"
                >
                  <Text className="text-black dark:text-white">
                    Série {setIndex + 1}
                  </Text>
                  <TextInput
                    className={`border p-2 rounded-md w-20 mx-2 ${
                      input.completed
                        ? "bg-gray-200 text-black"
                        : previousCompleted
                        ? "bg-white dark:bg-gray-700 text-black dark:text-white"
                        : "bg-gray-300 text-gray-500"
                    }`}
                    placeholder="Reps"
                    keyboardType="numeric"
                    editable={
                      !input.completed && isRunning && previousCompleted
                    }
                    value={input.reps}
                    onChangeText={(value) =>
                      updateReps(exerciseIndex, setIndex, value)
                    }
                  />

                  <TextInput
                    className={`border p-2 rounded-md w-24 ${
                      input.completed
                        ? "bg-gray-200 text-black"
                        : previousCompleted
                        ? "bg-white dark:bg-gray-700 text-black dark:text-white"
                        : "bg-gray-300 text-gray-500"
                    }`}
                    placeholder="Peso (kg)"
                    keyboardType="numeric"
                    editable={
                      !input.completed && isRunning && previousCompleted
                    }
                    value={input.weight}
                    onChangeText={(value) =>
                      updateWeight(exerciseIndex, setIndex, value)
                    }
                  />

                  <TouchableOpacity
                    onPress={() =>
                      previousCompleted
                        ? toggleCompleted(exerciseIndex, setIndex)
                        : Alert.alert(
                            "Aviso",
                            "Complete a série anterior antes!"
                          )
                    }
                  >
                    <Ionicons
                      name={input.completed ? "checkbox" : "square-outline"}
                      size={24}
                      color={
                        input.completed
                          ? "green"
                          : previousCompleted
                          ? "gray"
                          : "lightgray"
                      }
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <View className="mt-4 mb-6">
        <Button
          title={isRunning ? "Finalizar" : "Iniciar Treino"}
          onPress={handleStartStop}
        />
      </View>
    </ScrollView>
  );
}
