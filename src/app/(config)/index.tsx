import { useTheme } from "@/components/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View, ScrollView, Text, Switch } from "react-native";

export default function Config() {
    const theme = useTheme();
    const themeName: string = theme.resolvedTheme === "dark" ? "escuro" : "claro";

    return (
        <View className="bg-white dark:bg-gray-700 flex-1">
            {/* <View className="bg-white flex-1"> */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
                <View className="flex justify-top gap-4 items-center flex-1">
                    <View className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 shadow-sm flex-row justify-between items-center w-full">
                    {/* <View className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm flex-row justify-between items-center w-full"> */}
                        <View className="flex-1">
                            <Text className="text-black dark:text-white font-bold text-lg">Tema</Text>
                            {/* <Text className="text-black font-bold text-lg">Tema</Text> */}
                            <Text className="text-gray-500 dark:text-gray-400">Escolha entre claro ou escuro</Text>
                            {/* <Text className="text-gray-500">Escolha entre claro ou escuro</Text> */}
                            <Text className="text-gray-500 dark:text-gray-400">Tema atual: {themeName}</Text>
                        </View>
                        <Switch
                            value={theme.theme === "dark"}
                            onValueChange={() => theme.setTheme(theme.theme === "dark" ? "light" : "dark")}
                            thumbColor={theme.theme === "dark" ? "#fff" : "#444"}
                            trackColor={{ false: "#ccc", true: "#4a4a4a" }}
                        />
                    </View>
                    <Pressable
                        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 shadow-sm flex-row justify-between items-center w-full"
                        // className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm flex-row justify-between items-center w-full"
                        onPress={() => router.navigate("/(config)/backup")}
                    >
                        <View className="flex-1">
                            <Text className="text-black dark:text-white font-bold text-lg">Backup</Text>
                            {/* <Text className="text-black font-bold text-lg">Backup</Text> */}
                            <Text className="text-gray-500 dark:text-gray-400">Faça backup dos seus dados</Text>
                            <Text className="text-gray-500">Faça backup dos seus dados</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color={theme.resolvedTheme === "dark" ? "#ccc" : "gray"} />
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}