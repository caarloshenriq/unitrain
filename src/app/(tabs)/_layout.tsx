import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, useSegments } from "expo-router";
import { createHeaderOptions } from "@/constants/headerOptions";
import { useTheme } from "@/components/ThemeProvider";
import AppHeader from "@/components/AppHeader";
import { getTitleForRoute } from "@/constants/screenNames";

export default function TabsLayout() {
    const { resolvedTheme } = useTheme();
    const { headerTintColor } = createHeaderOptions(resolvedTheme);
    const segments: string[] = useSegments();
    const isWorkoutDetail = segments[segments.length - 1] === "[id]" && segments.includes("(workout)");

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: resolvedTheme === "dark" ? "lightgray" : "black",
                tabBarStyle: {
                    backgroundColor: resolvedTheme === "dark" ? "#1e1e1e" : "#f9f9f9",
                    borderTopWidth: 0,
                },
                // headerLeft: () => (
                //     <DrawerToggleButton tintColor={headerTintColor} />
                // ),
                // headerLeftContainerStyle: {
                //     paddingLeft: 10,
                // },
                // headerStyle: {
                //     backgroundColor: resolvedTheme === "dark" ? "#1e1e1e" : "#f9f9f9",
                //     shadowColor: "transparent",

                // },
                // headerTintColor: resolvedTheme === "dark" ? "#ffffff" : "#000000",
                // headerTitleStyle: {
                //     fontSize: 20,
                //     fontWeight: "bold",
                //     alignSelf: "center",
                //     textAlign: "center",
                // },
                // headerTitleAlign: "center",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name="home" color={color} />
                    ),
                    headerShown: true,
                    header: () => <AppHeader title={getTitleForRoute("(tabs)")} />,
                }}
            />
            <Tabs.Screen
                name="(workout)"
                options={{
                    title: "Treinos",
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
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="help"
                options={{
                    title: "Ajuda",
                    tabBarIcon: ({ color }) => (
                        <Ionicons size={28} name="help-circle-outline" color={color} />
                    ),
                    headerShown: true,
                    header: () => <AppHeader title={getTitleForRoute("help")} />,
                }}
            />
        </Tabs>
    );
}
