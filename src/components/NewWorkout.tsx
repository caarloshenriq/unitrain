import Input from "@/components/Input";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useExerciseDatabase } from "@/database/UseExerciseDatabase";
import { Exercise } from "@/types/Exercise";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";
import { useWorkoutExerciseDatabase } from "@/database/workoutExerciseDatabase";
import { useRouter } from "expo-router";
import { BodyPart } from "@/types/BodyPart";
import { useTheme } from "./ThemeProvider";
import SelectExercise from "./SelectExercise";

export default function NewWorkout() {
    const db = useSQLiteContext();
    const theme = useTheme();
    const { getBodyPart, getExerciseByBodyPart } = useExerciseDatabase(db);
    const { addWorkout } = useWorkoutDatabase(db);
    const { createWorkoutExercise } = useWorkoutExerciseDatabase(db);
    const [name, setName] = useState("");
    const [weekday, setWeekday] = useState("");
    const [bodyParts, setBodyParts] = useState<BodyPart[]>([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState<number | null>(null);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [showSelectExercise, setShowSelectExercise] = useState(false);
    const [selectedExercises, setSelectedExercises] = useState<
        { exercise_id: number; series: string; repetitions: string }[]
    >([]);

    const router = useRouter();

    useEffect(() => {
        async function fetchBodyParts() {
            const parts = await getBodyPart();
            setBodyParts(parts || []);
        }

        fetchBodyParts();
    }, []);

    async function handleBodyPartSelection(bodyPart: number) {
        setSelectedBodyPart(bodyPart);
        const exercisesList = await getExerciseByBodyPart(bodyPart);
        setExercises(exercisesList || []);
    }

    function toggleExerciseSelection(exercise_id: number) {
        setSelectedExercises((prevSelected) => {
            const exists = prevSelected.find(
                (item) => item.exercise_id === exercise_id
            );
            if (exists) {
                return prevSelected.filter((item) => item.exercise_id !== exercise_id);
            } else {
                return [...prevSelected, { exercise_id, series: "", repetitions: "" }];
            }
        });
    }

    function handleSelectExerciseConfirm(selectedIds: number[]) {
        setSelectedExercises(
            selectedIds.map(id => {
                // Mantém séries/repetições já preenchidas, se houver
                const found = selectedExercises.find(e => e.exercise_id === id);
                return found || { exercise_id: id, series: "", repetitions: "" };
            })
        );
        setShowSelectExercise(false);
    }

    function updateExerciseDetails(
        exercise_id: number,
        field: "series" | "repetitions",
        value: string
    ) {
        setSelectedExercises((prevSelected) =>
            prevSelected.map((item) =>
                item.exercise_id === exercise_id ? { ...item, [field]: value } : item
            )
        );
    }

    function removeExercise(exercise_id: number) {
        setSelectedExercises((prevSelected) =>
            prevSelected.filter((item) => item.exercise_id !== exercise_id)
        );
    }

    async function createWorkout() {
        if (!name.trim()) {
            Alert.alert("Erro", "O nome do treino não pode estar vazio.");
            return;
        }

        if (!weekday) {
            Alert.alert("Erro", "Selecione um dia da semana.");
            return;
        }

        if (selectedExercises.length === 0) {
            Alert.alert("Erro", "Selecione pelo menos um exercício.");
            return;
        }

        try {
            const workout_id = await addWorkout({ name, weekday });

            if (!workout_id) {
                Alert.alert("Erro", "Não foi possível criar o treino.");
                return;
            }

            await Promise.all(
                selectedExercises.map((exercise) =>
                    createWorkoutExercise({
                        workout_id,
                        exercise_id: exercise.exercise_id,
                        series: Number(exercise.series) || 0,
                        repetition: Number(exercise.repetitions) || 0,
                    })
                )
            );

            Alert.alert("Sucesso", "Treino criado com sucesso!");
            router.navigate("/(tabs)/workouts");
        } catch (error) {
            console.error("Erro ao criar treino:", error);
            Alert.alert(
                "Erro",
                "Ocorreu um erro ao criar o treino. Tente novamente."
            );
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView className="bg-white p-4 flex-1">
                    <Text> PENIS</Text>
                    
                    <Input
                        label="Nome do Treino"
                        type="text"
                        value={name}
                        onChangeText={setName}
                        placeholder="Ex: Treino de Costas"
                    />

                    <Text className="mt-4 text-black">Dia da semana</Text>
                    <View className="border border-gray-300 rounded-md mt-2">
                        <Picker
                            selectedValue={weekday}
                            onValueChange={(itemValue) => setWeekday(itemValue)}
                        >
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

                    <Text className="mt-4 text-black">Selecione a parte do corpo</Text>
                    <View className="border border-gray-300 rounded-md mt-2">
                        <Picker
                            selectedValue={selectedBodyPart}
                            onValueChange={(itemValue) =>
                                itemValue && handleBodyPartSelection(itemValue)
                            }
                        >
                            <Picker.Item label="Escolha uma parte do corpo" value="" />
                            {bodyParts.map((part) => (
                                <Picker.Item key={part.body_part_id} label={part.name} value={part.body_part_id} />
                            ))}
                        </Picker>
                    </View>

                    {selectedBodyPart && exercises.length > 0 && (
                        <Button
                            title="Selecionar Exercícios"
                            onPress={() => setShowSelectExercise(true)}
                        />
                    )}

                    <SelectExercise
                        visible={showSelectExercise}
                        exercises={exercises}
                        selectedIds={selectedExercises.map(e => e.exercise_id)}
                        onClose={() => setShowSelectExercise(false)}
                        onConfirm={handleSelectExerciseConfirm}
                    />

                    {selectedExercises.length > 0 && (
                        <>
                            <Text className="mt-4 text-black">Defina Séries e Repetições</Text>
                            <ScrollView className="border border-gray-300 rounded-md mt-2 max-h-64 p-2">
                                {selectedExercises.map((exercise) => (
                                    <View
                                        key={exercise.exercise_id}
                                        className="mb-4 border-b border-gray-300 pb-4"
                                    >
                                        <View className="flex-row justify-between items-center">
                                            <Text className="text-black font-bold">
                                                {
                                                    exercises.find(
                                                        (e) => e.exercise_id === exercise.exercise_id
                                                    )?.name
                                                }
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => removeExercise(exercise.exercise_id)}
                                            >
                                                <Ionicons name="close-circle" size={24} color="red" />
                                            </TouchableOpacity>
                                        </View>

                                        <View className="flex-row justify-between mt-2">
                                            {/* Campo de Séries */}
                                            <View className="w-1/2 pr-2">
                                                <Text className="text-black">Séries</Text>
                                                <TextInput
                                                    className="border border-gray-400 p-2 rounded-md text-black"
                                                    keyboardType="numeric"
                                                    value={exercise.series}
                                                    onChangeText={(value) =>
                                                        updateExerciseDetails(
                                                            exercise.exercise_id,
                                                            "series",
                                                            value
                                                        )
                                                    }
                                                    placeholder="Ex: 4"
                                                />
                                            </View>

                                            {/* Campo de Repetições */}
                                            <View className="w-1/2 pl-2">
                                                <Text className="text-black">Repetições</Text>
                                                <TextInput
                                                    className="border border-gray-400 p-2 rounded-md text-black"
                                                    keyboardType="numeric"
                                                    value={exercise.repetitions}
                                                    onChangeText={(value) =>
                                                        updateExerciseDetails(
                                                            exercise.exercise_id,
                                                            "repetitions",
                                                            value
                                                        )
                                                    }
                                                    placeholder="Ex: 12"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </>
                    )}

                    <View className="mt-2">
                        <Button
                            title="Salvar Treino"
                            onPress={() => {
                                createWorkout();
                            }}
                        />
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export const options = {
    title: "Novo Treino",
};
