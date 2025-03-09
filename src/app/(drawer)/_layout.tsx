import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function DrawerLayout() {
  return (
    <Drawer >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="Statistics"
        options={{
          title: "Estatísticas",
        }}
      />
      <Drawer.Screen
        name="Config"
        options={{
          title: "Configurações",
        }}
      />
    </Drawer>
  );
}
