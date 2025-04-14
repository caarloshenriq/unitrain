import { createHeaderOptions } from "@/constants/headerOptions";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";
import { useTheme } from "@/components/ThemeProvider";

export default function Layout() {
    const { resolvedTheme } = useTheme();
    const { headerTintColor } = createHeaderOptions(resolvedTheme);
    return (
        <Stack screenOptions={{
            headerLeft: () => (
                <DrawerToggleButton tintColor={headerTintColor} />
            ),
            headerStyle: {
                backgroundColor: resolvedTheme === "dark" ? "#1e1e1e" : "#f9f9f9"
            },
            headerTintColor: resolvedTheme === "dark" ? "#ffffff" : "#000000",
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
        }}>
            <Stack.Screen
                options={{
                    title: "Treinos",
                    headerShown: true,
                    headerLeft: () => <DrawerToggleButton />,
                }}
                name="index"
            />
            <Stack.Screen
                options={{
                    title: "Treino",
                    headerShown: true,
                }}
                name="[id]"
            />
            <Stack.Screen
                options={{
                    title: "Novo Treino",
                    headerShown: true,
                }}
                name="form"
            />
        </Stack>
    );
}