import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Pressable, View, ScrollView, Text } from "react-native";

export default function Config() {
    const db = useSQLiteContext();

    return (
        <View className="bg-white flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
                <View className="flex justify-top gap-4 items-center flex-1">
                    <Pressable
                        className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm flex-row justify-between items-center"
                        onPress={() => router.navigate("/(config)/theme")}
                    >
                        <View className="flex-1">
                            <Text className="text-black font-bold text-lg">Tema</Text>
                            <Text className="text-gray-500">Escolha o tema da aplicação</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="gray" />
                    </Pressable>

                    <Pressable
                        className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm flex-row justify-between items-center"
                        onPress={() => router.navigate("/(config)/backup")}
                    >
                        <View className="flex-1">
                            <Text className="text-black font-bold text-lg">Backup</Text>
                            <Text className="text-gray-500">Faça backup dos seus dados</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="gray" />
                    </Pressable>
                </View>
            </ ScrollView>
        </View>
    );
}
