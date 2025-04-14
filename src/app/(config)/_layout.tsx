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
                    title: "Configurações",
                    headerShown: true,
                    headerLeft: () => <DrawerToggleButton/>,
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