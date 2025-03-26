import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Config() {
    const db = useSQLiteContext();

    return (
        <View className="bg-white flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
                <View className="flex justify-top gap-4 items-center flex-1">
                    <Button
                        title="Trocar tema"
                        icon={<Ionicons name="color-palette-outline" size={20} color="white" />}
                        onPress={() => router.navigate("/(config)/theme")}
                        fullWidth={true}
                    />

                    <Button
                        title="Backup"
                        icon={<Ionicons name="download-outline" size={20} color="white" />}
                        onPress={() => router.navigate("/(config)/backup")}
                        fullWidth={true}
                    />
                </View>
            </ ScrollView>
        </View>
    );
}
