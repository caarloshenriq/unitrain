import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ExportData from "@/components/ExportData";
import ImportData from "@/components/ImportData";
import { useSQLiteContext } from "expo-sqlite";

export default function Backup() {
    const db = useSQLiteContext();
    const [exportModalVisible, setExportModalVisible] = useState(false);
    const [importModalVisible, setImportModalVisible] = useState(false);

    const handleExport = () => {
        console.log("Exportando dados...");
        setExportModalVisible(false);
    };

    const handleImport = () => {
        console.log("Importando dados...");
        setImportModalVisible(false);
    }

    return (
        <View className="bg-white flex-1">
            <View className="flex justify-center gap-2 items-center flex-1">
                <Pressable onPress={() => setExportModalVisible(true)}
                    className="bg-gray-300 p-6 rounded-lg mb-4 shadow-sm flex-col justify-between items-center">
                    <Ionicons name="arrow-up-sharp" size={80} color="gray" />
                    <Text className="text-black font-bold text-2xl">Exportar</Text>
                </Pressable>

                <Pressable onPress={() => {
                    setImportModalVisible(true)
                }}
                    className="bg-gray-300 p-6 rounded-lg mb-4 shadow-sm flex-col justify-between items-center">
                    <Ionicons name="arrow-down-sharp" size={80} color="gray" />
                    <Text className="text-black font-bold text-2xl">Importar</Text>
                </Pressable>
            </View>

            {exportModalVisible && <ExportData onClose={() => setExportModalVisible(false)} db={db} />}
            {importModalVisible && <ImportData onClose={() => setImportModalVisible(false)} db={db} />}
        </View>
    );
}