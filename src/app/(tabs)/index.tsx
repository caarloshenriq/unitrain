import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text } from "react-native";
import ExportDatabase from "@/components/ExportDB";
import { useTheme } from "@/components/ThemeProvider";

export default function Tab() {
  const theme = useTheme();

  return (
    <View
      className="flex-1 p-4"
      style={{
        backgroundColor: theme.resolvedTheme === "dark" ? "#1f2937" : "#FFFFFF",
      }}
    >
      <View className="flex flex-row justify-between">
        <Text
          style={{
            color: theme.resolvedTheme === "dark" ? "#FFFFFF" : "#000000",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Home
        </Text>
        <ExportDatabase />
      </View>
    </View>
  );
}
