import {ThemeType} from "@/components/ThemeProvider";
import {Platform} from "react-native";

export const createHeaderOptions = (theme: ThemeType) => {
    const isDark = theme === "dark";

    return {
        headerStyle: {
            backgroundColor: isDark ? "#1e1e1e" : "#f9f9f9",
            shadowColor: "transparent",
            elevation: 0,
        },
        headerTintColor: isDark ? "#ffffff" : "#000000",
        headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            letterSpacing: 0.5,
        },
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        ...(Platform.OS === "android" && {
            headerStatusBarHeight: 24,
        }),
    };
};
