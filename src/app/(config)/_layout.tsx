import { Stack } from "expo-router";
import { useTheme } from "@/components/ThemeProvider";
import AppHeader from "@/components/AppHeader";
import { getTitleForRoute } from "@/constants/screenNames";

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerShown: false,
            // ...createHeaderOptions(resolvedTheme),
            // headerTitleStyle: {
            //     ...createHeaderOptions(resolvedTheme).headerTitleStyle,
            //     fontWeight: "bold"
            // }
        }}>
            <Stack.Screen
                options={{
                    title: "Configurações",
                    headerShown: true,
                    header: () => <AppHeader title={getTitleForRoute("(config)")} />,
                }}
                name="index"
            />

            <Stack.Screen
                options={{
                    title: "Backup",
                    headerShown: true,
                    header: () => <AppHeader title={getTitleForRoute("(config)/backup")} headerLeftButtonType="back" />,
                }}
                name="backup"
            />
        </Stack>
    );
}