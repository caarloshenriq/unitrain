import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs, useSegments } from "expo-router";
import { createHeaderOptions } from "@/constants/headerOptions";
import { useTheme } from "@/components/ThemeProvider";

export default function TabsLayout() {
    const { resolvedTheme } = useTheme();
    const { headerTintColor } = createHeaderOptions(resolvedTheme);
    const segments: string[] = useSegments();
    const isWorkoutDetail = segments[segments.length - 1] === "[id]" && segments.includes("(workout)");

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: resolvedTheme === "dark" ? "lightgray" : "black",
                tabBarStyle: {
                    backgroundColor: resolvedTheme === "dark" ? "#1e1e1e" : "#f9f9f9",
                    borderTopWidth: 0,
                },
                headerLeft: () => (
                    <DrawerToggleButton tintColor={headerTintColor} />
                ),
                headerLeftContainerStyle: {
                    paddingLeft: 10,
                },
                headerStyle: {
                    backgroundColor: resolvedTheme === "dark" ? "#1e1e1e" : "#f9f9f9",
                    shadowColor: "transparent",

                },
                headerTintColor: resolvedTheme === "dark" ? "#ffffff" : "#000000",
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf: "center",
                    textAlign: "center",
                },
                headerTitleAlign: "center",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(workout)"
                options={{
                    title: "Treinos",
                    headerShown: false,
                    tabBarStyle: isWorkoutDetail
                        ? { display: "none" }
                        : {
                            backgroundColor:
                                resolvedTheme === "dark" ? "#1e1e1e" : "#f9f9f9",
                            borderTopWidth: 0,
                        },
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name="clipboard" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="help"
                options={{
                    title: "Ajuda",
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name="help-circle-outline" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
