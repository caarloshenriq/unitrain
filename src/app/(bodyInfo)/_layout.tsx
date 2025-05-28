import { Stack } from "expo-router";
import AppHeader from "@/components/AppHeader";
import { getTitleForRoute } from "@/constants/screenNames";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{
          title: "Medidas Corporais",
          headerShown: true,
          header: () => <AppHeader title={getTitleForRoute("(bodyInfo)")} />,

        }}
        name="index"
      />

      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <AppHeader title={getTitleForRoute("(bodyInfo)/form")} />,
        }}
        name="form"
      />
      {/* <Stack.Screen
        name="(tabs)"
        options={{
          title: "Principal",
          headerShown: false,
        }}
      /> */}
    </Stack>
  );
}
