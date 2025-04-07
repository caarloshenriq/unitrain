import {createHeaderOptions} from "@/constants/headerOptions";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";
import {useTheme} from "@/components/ThemeProvider";

export default function Layout() {
    const {resolvedTheme} = useTheme();
    return (
        <Stack screenOptions={{...createHeaderOptions(resolvedTheme)}}>
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
                name="newWorkout"
            />
        </Stack>
    );
}