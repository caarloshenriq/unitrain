import Button from "@/components/Button";
import { useTheme } from "@/components/ThemeProvider";
import { useBodyInfoDatabase } from "@/database/BodyInfoDatabase";
import { BodyInfo } from "@/types/BodyInfo";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

export default function BodyInfoList() {
  const theme = useTheme();
  const db = useSQLiteContext();
  const colorScheme = useColorScheme();
  const { getAllBodyInfo } = useBodyInfoDatabase(db);
  const [bodyInfoList, setBodyInfoList] = useState<BodyInfo[]>([]);
  const [activeSwipeable, setActiveSwipeable] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const data = await getAllBodyInfo();
    setBodyInfoList(data || []);
  }

  const handleDelete = async (bodyInfo_id: number) => {
    try {
      await db.runAsync("DELETE FROM body_info WHERE body_info_id = ?;", [
        bodyInfo_id,
      ]);
      loadData();
    } catch (error) {
      console.error("Erro ao deletar informações do corpo:", error);
    }
  };

  const renderRightActions = (bodyInfo_id: number) => (
    <View style={{ flexDirection: "row", height: "100%" }}>
      <TouchableOpacity
        onPress={() => router.push(`/form?id=${bodyInfo_id}`)}
        style={{
          backgroundColor: "#d1d5db",
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          height: 72,
          borderRadius: 8,
        }}
      >
        <Ionicons name="create-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDelete(bodyInfo_id)}
        style={{
          backgroundColor: "#ef4444",
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          height: 72,
          borderRadius: 8,
        }}
      >
        <Ionicons name="trash-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="bg-white dark:bg-gray-700 flex-1">
      <View className="flex flex-row justify-end pt-4 px-4">
        <Button
          icon={<Ionicons name="add" size={20} color="white" />}
          onPress={() => router.push("/form")}
          small={true}
        />
      </View>
      <ScrollView className="p-4">
        {bodyInfoList.length === 0 ? (
          <Text className="text-gray-500 dark:text-gray-400 text-center">
            Nenhuma medida registrada.
          </Text>
        ) : (
          bodyInfoList.map((item) => (
            <Swipeable
              key={item.body_info_id}
              renderRightActions={() =>
                item.body_info_id !== undefined && renderRightActions(item.body_info_id)
              }
              onSwipeableWillOpen={() => setActiveSwipeable(item.body_info_id ?? null)}
              onSwipeableWillClose={() => setActiveSwipeable(null)}
            >
              <TouchableOpacity className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-2 w-full flex-row justify-between items-center">
                <View>
                  <Text className="text-black dark:text-white font-bold">
                    {item.measure_type}
                  </Text>
                  <Text className="text-gray-500 dark:text-gray-400">
                    {item.measurement} -{" "}
                    {format(new Date(item.measurement_date), "dd/MM/yyyy")}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "gray"}
                />
              </TouchableOpacity>
            </Swipeable>
          ))
        )}
      </ScrollView>
    </View>
  );
}
