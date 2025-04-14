import {createHeaderOptions} from "@/constants/headerOptions";
import {DrawerToggleButton} from "@react-navigation/drawer";
import {Stack} from "expo-router";
import {useTheme} from "@/components/ThemeProvider";

export default function Layout() {
    const {resolvedTheme} = useTheme();
    return (
        <Stack screenOptions={{
            ...createHeaderOptions(resolvedTheme),
            headerTitleStyle: {
                ...createHeaderOptions(resolvedTheme).headerTitleStyle,
                fontWeight: "bold"
            }
        }}>
            <Stack.Screen
                options={{
                    title: "Exercícios",
                    headerShown: true,
                    headerLeft: () => <DrawerToggleButton/>,
                }}
                name="index"
            />
            <Stack.Screen
                options={{
                    title: "Detalhe do Exercício",
                    headerShown: true,
                }}
                name="[id]"
            />
            <Stack.Screen
                options={{
                    title: "Novo Exercício",
                    headerShown: true,
                }}
                name="form"
            />
        </Stack>
    );
}