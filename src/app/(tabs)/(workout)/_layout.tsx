import { createHeaderOptions } from "@/constants/headerOptions";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";
import { useTheme } from "@/components/ThemeProvider";
import AppHeader from "@/components/AppHeader";
import { getTitleForRoute } from "@/constants/screenNames";

export default function Layout() {
    const { resolvedTheme } = useTheme();
    const { headerTintColor } = createHeaderOptions(resolvedTheme);
    return (
        <Stack screenOptions={{
            headerShown: false,
            // headerLeft: () => (
            //     <DrawerToggleButton tintColor={headerTintColor} />
            // ),
            // headerStyle: {
            //     backgroundColor: resolvedTheme === "dark" ? "#1e1e1e" : "#f9f9f9"
            // },
            // headerTintColor: resolvedTheme === "dark" ? "#ffffff" : "#000000",
            // headerTitleStyle: {
            //     fontSize: 20,
            //     fontWeight: "bold",
            // },
            // headerTitleAlign: "center",
            // headerShadowVisible: false,
        }}>
            <Stack.Screen
                options={{
                    title: "Treinos",
                    headerLeft: () => <DrawerToggleButton />,
                    headerShown: true,
                    header: () => <AppHeader title={getTitleForRoute("(workout)")} />,
                }}
                name="index"
            />
            <Stack.Screen
                options={{
                    title: "Treino",
                    headerShown: true,
                    header: () => <AppHeader title={getTitleForRoute("(workout)/[id]")} headerLeftButtonType="back" />,
                }}
                name="[id]"
            />
            <Stack.Screen
                options={{
                    title: "Novo Treino",
                    headerShown: true,
                    header: () => <AppHeader title={getTitleForRoute("(workout)/newWorkout")} headerLeftButtonType="back" />,
                }}
                name="form"
            />
        </Stack>
    );
}