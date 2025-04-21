import Button from "@/components/Button";
import { useExerciseDatabase } from "@/database/UseExerciseDatabase";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { Exercise } from '@/types/Exercise';
import { useEffect, useRef, useState } from "react";
import { BodyPart } from "@/types/BodyPart";
import { Swipeable } from "react-native-gesture-handler";

export default function Exercises() {
  const db = useSQLiteContext();
  const router = useRouter();
  const { getExercises, getExerciseByBodyPart, getBodyPart, deleteExercise } = useExerciseDatabase(db);

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<number>();
  const swipeableRef = useRef<Swipeable | null>(null);

  useEffect(() => {
    async function fetchInitialData() {
      const parts = await getBodyPart();
      setBodyParts(parts);
      const allExercises = await getExercises();
      setExercises(allExercises || []);
    }
    fetchInitialData();
  }, []);

  const handleFilterChange = async (value: number) => {
    setSelectedBodyPart(value);

    if (value === 0) {
      const all = await getExercises();
      setExercises(all || []);
    } else {
      const filtered = await getExerciseByBodyPart(value);
      setExercises(filtered || []);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteExercise(id);
    const updatedList = await getExercises();
    setExercises(updatedList || []);
  };

  const renderRightActions = (exercise_id: number) => (
    <View style={{ flexDirection: "row", height: "100%" }}>
      <TouchableOpacity
        onPress={() => router.push(`/form?id=${exercise_id}`)}
        style={{ backgroundColor: "#d1d5db", justifyContent: "center", alignItems: "center", width: 60,height: 72, borderRadius: 8 }}
      >
        <Ionicons name="create-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDelete(exercise_id)}
        style={{ backgroundColor: "#ef4444", justifyContent: "center", alignItems: "center", width: 60,height: 72, borderRadius: 8 }}
      >
        <Ionicons name="trash-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="bg-white flex-1">
      <View className="flex flex-row justify-end pt-4 px-4">
        <Button
          icon={<Ionicons name="add" size={20} color="white" />}
          onPress={() => router.push("/form")}
          small={true}
        />
      </View>

      <View className="border border-gray-300 rounded-md mt-4 mx-4">
        <Picker
          selectedValue={selectedBodyPart}
          onValueChange={handleFilterChange}
        >
          <Picker.Item label="Todos os grupos musculares" value={0} />
          {bodyParts.map((part) => (
            <Picker.Item key={part.body_part_id} label={part.name} value={part.body_part_id} />
          ))}
        </Picker>
      </View>

      <ScrollView className="mt-4 px-4">
        {exercises.length === 0 ? (
          <Text className="text-gray-500 text-center mt-10">
            Nenhum exercício encontrado.
          </Text>
        ) : (
          exercises.map((exercise) => (
            <Swipeable
              key={exercise.exercise_id}
              ref={(ref) => {
                if (ref) swipeableRef.current = ref;
              }}
              onSwipeableWillOpen={() => {
                if (swipeableRef.current) swipeableRef.current.close();
                swipeableRef.current = null;
              }}
              renderRightActions={() => renderRightActions(exercise.exercise_id)}
            >
              <TouchableOpacity
                className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm flex-row justify-between items-center"
                onPress={() => router.push(`/(exercise)/${exercise.exercise_id}`)}
              >
                <View>
                  <Text className="text-black font-bold text-lg">
                    {exercise.name}
                  </Text>
                  <Text className="text-gray-500">
                    Grupo muscular: {exercise.body_part}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="gray" />
              </TouchableOpacity>
            </Swipeable>
          ))
        )}
      </ScrollView>
    </View>
  );
}
