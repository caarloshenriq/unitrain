import { InitilizeDatabase } from "@/database/InitilizeDatabase";
import { SQLiteProvider } from "expo-sqlite";
import "../styles/global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useTheme } from "@/components/ThemeProvider";
import AppHeader from "@/components/AppHeader";
import { getTitleForRoute } from "@/constants/screenNames";

export default function Layout() {
  return (
    <ThemeProvider>
      <InnerLayout />
    </ThemeProvider>
  );
}

function InnerLayout() {
  const theme = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider databaseName="unitrain.db" onInit={InitilizeDatabase}>
        <Drawer
          screenOptions={() => ({
            headerShown: false,
            drawerType: "front",
            drawerStyle: {
              backgroundColor:
                theme.resolvedTheme === "dark" ? "#1e1e1e" : "#FFFFFF",
              width: 240,
            },
            drawerActiveBackgroundColor: "#4a7696",
            drawerActiveTintColor: "#FFFFFF",
            drawerInactiveTintColor:
              theme.resolvedTheme === "dark" ? "#FFFFFF" : "#000000",
            drawerLabelStyle: {
              fontSize: 15,
              letterSpacing: 0.5,
            },
          })}
        >
          <Drawer.Screen
            name="(tabs)"
            options={{
              title: "Principal",
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="(config)"
            options={{
              title: "Configurações",
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="statistics"
            options={{
              title: "Estatísticas",
              headerShown: true,
              header: () => (
                <AppHeader title={getTitleForRoute("statistics")} />
              ),
            }}
          />
          <Drawer.Screen
            name="(exercise)"
            options={{
              title: "Exercícios",
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="(bodyInfo)"
            options={{
                title: "Dados Corporais",
                headerShown: false
            }}
          />
          <Drawer.Screen
            name="(workout)/[id]"
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
        </Drawer>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
