import { Stack } from "expo-router";
import AppHeader from "@/components/AppHeader";
import { getTitleForRoute } from "@/constants/screenNames";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // ...createHeaderOptions(resolvedTheme),
        // headerTitleStyle: {
        //     ...createHeaderOptions(resolvedTheme).headerTitleStyle,
        //     fontWeight: "bold"
        // }
      }}
    >
      <Stack.Screen
        options={{
          title: "Informações Corporais",
          headerShown: false,
        }}
        name="index"
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="form"
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Principal",
          headerShown: false,
        }}
        />
    </Stack>
  );
}
