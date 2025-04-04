import headerStyle from "@/constants/HeaderStyle";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack screenOptions={{headerStyle: headerStyle.headerStyle}}>
            <Stack.Screen
                options={{
                    title: "Treinos",
                    headerShown: true,
                    headerLeft: () => <DrawerToggleButton />,
                    headerStyle: headerStyle.headerStyle,
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