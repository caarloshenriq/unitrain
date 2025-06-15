import { Exercise } from "@/types/Exercise";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Button from "./Button";

interface SelectExerciseProps {
  visible: boolean;
  exercises: Exercise[];
  selectedIds: number[];
  onClose: () => void;
  onConfirm: (selected: number[]) => void;
}

export default function SelectExercise({
  visible,
  exercises,
  selectedIds,
  onClose,
  onConfirm,
}: SelectExerciseProps) {
  const [selected, setSelected] = useState<number[]>(selectedIds);

  useEffect(() => {
    setSelected(selectedIds);
  }, [selectedIds, visible]);

  function toggle(id: number) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function confirm() {
    onConfirm(selected);
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={false}
    >
      <View className="flex-1 bg-white p-4">
        <Text className="text-lg font-bold mb-4">Selecione os exercícios</Text>
        <ScrollView>
          {exercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.exercise_id}
              className="flex-row items-center justify-between p-3 border-b border-gray-200"
              onPress={() => toggle(exercise.exercise_id)}
            >
              <Text className="text-black">{exercise.name}</Text>
              {selected.includes(exercise.exercise_id) ? (
                <Ionicons name="checkbox" size={24} color="black" />
              ) : (
                <Ionicons name="square-outline" size={24} color="gray" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View className="flex-row justify-between mt-4">
          <Button title="Cancelar" onPress={onClose} />
          <Button title="Confirmar" onPress={confirm} />
        </View>
      </View>
    </Modal>
  );
}