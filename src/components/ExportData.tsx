import {Modal, Pressable, Text, View} from "react-native";
import {exportBackup} from "@/scripts/backup";
import * as Sharing from "expo-sharing";
import {SQLiteDatabase} from "expo-sqlite";

export default function ExportData({onClose, db}: { onClose: () => void, db: SQLiteDatabase }) {
    const handleExport = async () => {
        try {
            const fileUri = await exportBackup(db);

            await Sharing.shareAsync(fileUri);
        } catch (error) {
            console.error("Error exporting data:", error);
        }
        onClose();
    };

    return (
        <Modal
            transparent={true}
            visible={true}
            animationType="slide"
        >
            <View className="flex-1 justify-center items-center bg-transparent bg-opacity-50">
                <View className="bg-white p-6 rounded-lg shadow-lg w-3/4 border-2 border-gray-300">
                    <Text className="text-black font-bold text-lg mb-4">Deseja fazer backup dos seus dados?</Text>
                    <Pressable
                        onPress={handleExport}
                        className="bg-blue-500 p-4 rounded-lg mb-4 shadow-sm flex-col justify-between items-center"
                    >
                        <Text className="text-white font-bold text-lg">Exportar</Text>
                    </Pressable>
                    <Pressable
                        onPress={onClose}
                        className="bg-gray-300 p-4 rounded-lg shadow-sm flex-col justify-between items-center"
                    >
                        <Text className="text-black font-bold text-lg">Cancelar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}