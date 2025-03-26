import {useSQLiteContext} from "expo-sqlite";
import {Text, View} from "react-native";

export default function Config() {
    const db = useSQLiteContext();

    return (
        <View className="bg-white">
            <Text className="text-center">Config</Text>
        </View>
    );
}
