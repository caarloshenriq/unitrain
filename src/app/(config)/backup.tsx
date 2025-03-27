import ExportData from "@/components/ExportData";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function Backup() {
    return (
        <View className="bg-white flex-1">
            <View className="flex justify-center gap-2 items-center flex-1">
                <Pressable onPress={() => <ExportData />} className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm flex-col justify-between items-center">
                    <Ionicons name="arrow-up-sharp" size={40} color="gray" />
                    <Text className="text-black font-bold text-lg">Exportar</Text>
                </Pressable>

                <Pressable onPress={() => {}} className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm flex-col justify-between items-center">
                    <Ionicons name="arrow-down-sharp" size={40} color="gray" />
                    <Text className="text-black font-bold text-lg">Importar</Text>
                </Pressable>
            </View>
        </View>
    );
}