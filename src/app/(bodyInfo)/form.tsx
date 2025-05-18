import Button from "@/components/Button";
import Input from "@/components/Input";
import { useTheme } from "@/components/ThemeProvider";
import { useSQLiteContext } from "expo-sqlite";
import { ScrollView, View, Text, Platform, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { useBodyInfoDatabase } from "@/database/BodyInfoDatabase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { BodyInfo } from "@/types/BodyInfo";
import { useLocalSearchParams, router } from "expo-router";

export default function FormBodyInfo() {
  const { id } = useLocalSearchParams();
  const isEdit = !!id;

  const theme = useTheme();
  const db = useSQLiteContext();
  const { addBodyInfo, getBodyInfo, updateBodyInfo } = useBodyInfoDatabase(db);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [unit, setUnit] = useState("cm");
  const [bodyInfo, setBodyInfo] = useState<BodyInfo>({
    body_info_id: 0,
    measure_type: "",
    measurement: 0,
    measurement_date: format(new Date(), "yyyy-MM-dd"),
  });

  const measureOptions = [
    { label: "Peso", value: "peso" },
    { label: "Altura", value: "altura" },
    { label: "Cintura", value: "cintura" },
    { label: "Quadril", value: "quadril" },
    { label: "Braço", value: "braco" },
  ];

  const unitOptions = [
    { label: "Centímetros (cm)", value: "cm" },
    { label: "Metros (m)", value: "m" },
    { label: "Quilogramas (kg)", value: "kg" },
  ];

  useEffect(() => {
    if (isEdit) {
      (async () => {
        const existing = await getBodyInfo(Number(id));
        if (existing) {
          const [type, extractedUnit] = existing.measure_type.split(" (");
          setUnit(extractedUnit?.replace(")", "") || "cm");
          setBodyInfo({ ...existing, measure_type: type });
        }
      })();
    }
  }, [id]);

  async function handleSave() {
    if (!bodyInfo.measure_type || !bodyInfo.measurement) return;

    try {
      const dataToSave = {
        ...bodyInfo,
        measure_type: `${bodyInfo.measure_type} (${unit})`,
      };

      if (isEdit) {
        await updateBodyInfo(dataToSave);
        Alert.alert("Medida atualizada com sucesso!");
      } else {
        await addBodyInfo(dataToSave);
        Alert.alert("Medida salva com sucesso!");
      }

      router.push("/(bodyInfo)");
    } catch (error) {
      console.error("Erro ao salvar medida:", error);
    }
  }

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBodyInfo({ ...bodyInfo, measurement_date: format(selectedDate, "yyyy-MM-dd") });
    }
  };

  return (
    <View className="bg-white dark:bg-gray-700 flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
        <View className="flex gap-4">
          <Text className="text-black dark:text-white">Tipo de Medida</Text>
          <View className="border border-gray-300 rounded-md">
            <Picker
              selectedValue={bodyInfo.measure_type}
              onValueChange={(value) => setBodyInfo({ ...bodyInfo, measure_type: value })}
            >
              <Picker.Item label="Selecione a medida" value="" />
              {measureOptions.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>

          <Text className="text-black dark:text-white">Unidade de Medida</Text>
          <View className="border border-gray-300 rounded-md">
            <Picker selectedValue={unit} onValueChange={setUnit}>
              {unitOptions.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>

          <Input
            label="Valor"
            type="number"
            value={bodyInfo.measurement.toString()}
            onChangeText={(val) => setBodyInfo({ ...bodyInfo, measurement: parseFloat(val) || 0 })}
            placeholder="Ex: 70.5"
          />

          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Input
              label="Data da Medida"
              value={format(new Date(bodyInfo.measurement_date), "dd/MM/yyyy")}
              onChangeText={() => {}}
              placeholder="DD/MM/AAAA"
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={new Date(bodyInfo.measurement_date)}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateChange}
            />
          )}

          <View className="mt-4">
            <Button title={isEdit ? "Atualizar Medida" : "Salvar Medida"} onPress={handleSave} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
