import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                options={{
                    title: "Configurações",
                    headerShown: true,
                    headerLeft: () => <DrawerToggleButton />,
                }}
                name="index"
            />

            <Stack.Screen
                options={{
                    title: "Backup",
                    headerShown: true,
                }}
                name="backup"
            />
        </Stack>
    );
}