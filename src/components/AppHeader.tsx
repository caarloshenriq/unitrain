import { View, Text, Pressable } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/components/ThemeProvider";

type Props = {
    title: string;
    headerLeftButtonType?: "menu" | "back";
};

export default function AppHeader({ title, headerLeftButtonType = "menu" }: Props) {
    const navigation = useNavigation();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <View
            style={{
                height: 56,
                paddingHorizontal: 16,
                backgroundColor: isDark ? "#1e1e1e" : "#f9f9f9",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottomWidth: 1,
                borderBottomColor: isDark ? "#333" : "#ddd",
            }}
        >
            <Pressable
                onPress={() => {
                    if (headerLeftButtonType === "menu") {
                        navigation.dispatch(DrawerActions.toggleDrawer());
                    } else {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        }
                    }
                }
                }

                style={{ padding: 8 }}
            >
                {headerLeftButtonType === "menu" ? (
                    <Ionicons name="menu" size={28} color={isDark ? "#fff" : "#000"} />
                ) : headerLeftButtonType === "back" ? (
                    <Ionicons name="arrow-back" size={28} color={isDark ? "#fff" : "#000"} />
                ) : null}
            </Pressable>

            <Text
                style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    color: isDark ? "#fff" : "#000",
                }}
            >
                {title}
            </Text>

            <View style={{ width: 36 }} />
        </View>
    );
}
