import headerStyle from "@/constants/HeaderStyle";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack screenOptions={{headerStyle: headerStyle.headerStyle}}>
            <Stack.Screen
                options={{
                    title: "Exercícios",
                    headerShown: true,
                    headerLeft: () => <DrawerToggleButton />,
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