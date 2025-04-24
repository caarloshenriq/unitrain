import Input from "@/components/Input";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useExerciseDatabase } from "@/database/UseExerciseDatabase";
import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";
import { useWorkoutExerciseDatabase } from "@/database/workoutExerciseDatabase";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import { Exercise } from "@/types/Exercise";
import { BodyPart } from "@/types/BodyPart";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";

export default function FormWorkout() {
  const db = useSQLiteContext();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const { getBodyPart, getExerciseByBodyPart } = useExerciseDatabase(db);
  const { addWorkout, getWorkout, updateWorkout } = useWorkoutDatabase(db);
  const { createWorkoutExercise, getWorkoutDetail, deleteWorkoutExercise } =
    useWorkoutExerciseDatabase(db);

  const [name, setName] = useState("");
  const [weekday, setWeekday] = useState("");
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<number | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<
    { exercise_id: number; series: string; repetitions: string; name: string }[]
  >([]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: id ? "Editar Treino" : "Novo Treino" });
  }, [id]);

  useEffect(() => {
    async function fetchInitialData() {
      const parts = await getBodyPart();
      setBodyParts(parts || []);

      if (id) {
        const workoutData = await getWorkout(Number(id));
        const exercisesData = await getWorkoutDetail(Number(id));
        setSelectedExercises(
          exercisesData.map((exercise) => ({
            exercise_id: exercise.exercise_id,
            series: String(exercise.series),
            repetitions: String(exercise.repetition),
            name: exercise.name,
          }))
        );
        if (workoutData) {
          setName(workoutData.name);
          setWeekday(workoutData.weekday);
        }
      }
    }
    fetchInitialData();
  }, [id]);

  async function handleBodyPartSelection(bodyPart: number) {
    setSelectedBodyPart(bodyPart);
    const exercisesList = await getExerciseByBodyPart(bodyPart);
    setExercises(exercisesList || []);
  }

  function toggleExerciseSelection(exercise_id: number) {
    const exercise = exercises.find((e) => e.exercise_id === exercise_id);
    if (!exercise) return;
    setSelectedExercises((prev) => {
      const exists = prev.find((e) => e.exercise_id === exercise_id);
      if (exists) {
        return prev.filter((e) => e.exercise_id !== exercise_id);
      } else {
        return [
          ...prev,
          {
            exercise_id,
            series: "",
            repetitions: "",
            name: exercise.name,
          },
        ];
      }
    });
  }

  function updateExerciseDetails(
    exercise_id: number,
    field: "series" | "repetitions",
    value: string
  ) {
    setSelectedExercises((prev) =>
      prev.map((item) =>
        item.exercise_id === exercise_id ? { ...item, [field]: value } : item
      )
    );
  }

  function removeExercise(exercise_id: number) {
    setSelectedExercises((prev) =>
      prev.filter((item) => item.exercise_id !== exercise_id)
    );
  }

  async function saveWorkout() {
    if (!name.trim()) return Alert.alert("Erro", "Informe o nome do treino.");
    if (!weekday) return Alert.alert("Erro", "Selecione um dia da semana.");
    if (selectedExercises.length === 0)
      return Alert.alert("Erro", "Adicione ao menos um exercício.");

    try {
      let workout_id: number | null = null;

      if (id) {
        workout_id = Number(id);
        await updateWorkout({ workout_id, name, weekday });

        await Promise.all(
          selectedExercises.map((ex) =>
            deleteWorkoutExercise(workout_id!, ex.exercise_id)
          )
        );
      } else {
        workout_id = await addWorkout({ name, weekday });
      }

      await Promise.all(
        selectedExercises.map((ex) =>
          createWorkoutExercise({
            workout_id: workout_id!,
            exercise_id: ex.exercise_id,
            series: Number(ex.series),
            repetition: Number(ex.repetitions),
          })
        )
      );

      Alert.alert("Sucesso", id ? "Treino atualizado!" : "Treino criado!");
      router.push("/(tabs)/(workout)");
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Falha ao salvar o treino.");
    }
  }

  return (
    <SafeAreaView className="p-4 flex-1">
      <Input
        label="Nome do Treino"
        type="text"
        value={name}
        onChangeText={setName}
      />

      <Text className="mt-4 text-black">Dia da semana</Text>
      <View className="border border-gray-300 rounded-md mt-2">
        <Picker selectedValue={weekday} onValueChange={setWeekday}>
          <Picker.Item label="Selecione o dia da semana" value="" />
          <Picker.Item label="Domingo" value="1" />
          <Picker.Item label="Segunda-feira" value="2" />
          <Picker.Item label="Terça-feira" value="3" />
          <Picker.Item label="Quarta-feira" value="4" />
          <Picker.Item label="Quinta-feira" value="5" />
          <Picker.Item label="Sexta-feira" value="6" />
          <Picker.Item label="Sábado" value="7" />
        </Picker>
      </View>

      <Text className="mt-4 text-black">Parte do corpo</Text>
      <View className="border border-gray-300 rounded-md mt-2">
        <Picker
          selectedValue={selectedBodyPart}
          onValueChange={(v) => v && handleBodyPartSelection(v)}
        >
          <Picker.Item label="Escolha uma parte do corpo" value="" />
          {bodyParts.map((bp) => (
            <Picker.Item
              key={bp.body_part_id}
              label={bp.name}
              value={bp.body_part_id}
            />
          ))}
        </Picker>
      </View>
      {selectedBodyPart && (
        <>
          <Text className="mt-6 text-black text-xl font-semibold">
            Selecione os Exercícios
          </Text>

          <ScrollView className="border border-gray-300 rounded-lg mt-4 max-h-64 bg-gray-50">
            {exercises.map((exercise) => {
              const isSelected = selectedExercises.some(
                (e) => e.exercise_id === exercise.exercise_id
              );

              return (
                <TouchableOpacity
                  key={exercise.exercise_id}
                  className={`p-3 border-b border-gray-300 ${
                    isSelected ? "bg-gray-100" : ""
                  }`}
                  onPress={() => toggleExerciseSelection(exercise.exercise_id)}
                >
                  <View className="flex-row items-center">
                    <Ionicons
                      name={isSelected ? "checkbox" : "square-outline"}
                      size={20}
                      color={isSelected ? "black" : "gray"}
                      style={{ marginRight: 10 }}
                    />
                    <Text className="text-black text-base">
                      {exercise.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </>
      )}

      {selectedExercises.length > 0 && (
        <>
          <Text className="mt-6 text-black text-xl font-semibold">
            Séries e Repetições
          </Text>

          <ScrollView className="border border-gray-300 rounded-lg mt-4 max-h-64 p-3 bg-gray-50">
            {selectedExercises.map((exercise) => (
              <View
                key={exercise.exercise_id}
                className="mb-4 border-b border-gray-300 pb-4"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-black font-bold text-base">
                    {exercise.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeExercise(exercise.exercise_id)}
                  >
                    <Ionicons name="close-circle" size={22} color="red" />
                  </TouchableOpacity>
                </View>

                <View className="flex-row justify-between">
                  <View className="w-[48%]">
                    <Text className="text-gray-700 mb-1">Séries</Text>
                    <TextInput
                      className="border border-gray-300 bg-white p-2 rounded-md text-black"
                      keyboardType="numeric"
                      placeholder="Ex: 4"
                      value={exercise.series}
                      onChangeText={(val) =>
                        updateExerciseDetails(
                          exercise.exercise_id,
                          "series",
                          val
                        )
                      }
                    />
                  </View>

                  <View className="w-[48%]">
                    <Text className="text-gray-700 mb-1">Repetições</Text>
                    <TextInput
                      className="border border-gray-300 bg-white p-2 rounded-md text-black"
                      keyboardType="numeric"
                      placeholder="Ex: 12"
                      value={exercise.repetitions}
                      onChangeText={(val) =>
                        updateExerciseDetails(
                          exercise.exercise_id,
                          "repetitions",
                          val
                        )
                      }
                    />
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}

      <View className="mt-4">
        <Button
          title={id ? "Atualizar Treino" : "Salvar Treino"}
          onPress={saveWorkout}
        />
      </View>
    </SafeAreaView>
  );
}
