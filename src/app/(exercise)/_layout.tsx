import { Stack } from "expo-router";
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
                    title: "Exercícios",
                    headerShown: true,
                    header: () => <AppHeader title={getTitleForRoute("(exercise)")} />,
                }}
                name="index"
            />
            <Stack.Screen
                options={{
                    title: "Detalhe do Exercício",
                    headerShown: true,
                    header: () => <AppHeader title={getTitleForRoute("(exercise)/[id]")} headerLeftButtonType="back" />,
                }}
                name="[id]"
            />
            <Stack.Screen
                options={{
                    title: "Formulário Exercício",
                    headerShown: true,
                    header: () => <AppHeader title={getTitleForRoute("(exercise)/form")} headerLeftButtonType="back" />,
                }}
                name="form"
            />
        </Stack>
    );
}