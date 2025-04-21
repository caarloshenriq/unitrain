import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ExportData from "@/components/ExportData";
import ImportData from "@/components/ImportData";
import { useSQLiteContext } from "expo-sqlite";
import { useTheme } from "@/components/ThemeProvider";

export default function Backup() {
    const db = useSQLiteContext();
    const theme = useTheme();
    const [exportModalVisible, setExportModalVisible] = useState(false);
    const [importModalVisible, setImportModalVisible] = useState(false);

    return (
        <View className="bg-white dark:bg-gray-700 text-white flex-1">
            <View className="flex justify-center gap-2 items-center flex-1">
                <Pressable onPress={() => setExportModalVisible(true)}
                    className="bg-gray-300 dark:bg-gray-900 p-6 rounded-lg mb-4 shadow-sm flex-col justify-between items-center">
                    <Ionicons name="arrow-up-sharp" size={80} color={theme.resolvedTheme === "dark" ? "lightgray" : "gray"} />
                    <Text className="text-black dark:text-white font-bold text-2xl">Exportar</Text>
                </Pressable>

                <Pressable onPress={() => {
                    setImportModalVisible(true)
                }}
                    className="bg-gray-300 dark:bg-gray-900 text-white p-6 rounded-lg mb-4 shadow-sm flex-col justify-between items-center">
                    <Ionicons name="arrow-down-sharp" size={80} color={theme.resolvedTheme === "dark" ? "lightgray" : "gray"} />
                    <Text className="text-black dark:text-white font-bold text-2xl">Importar</Text>
                </Pressable>
            </View>

            {exportModalVisible && <ExportData onClose={() => setExportModalVisible(false)} db={db} />}
            {importModalVisible && <ImportData onClose={() => setImportModalVisible(false)} db={db} />}
        </View>
    );
}