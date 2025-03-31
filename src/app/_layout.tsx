import { InitilizeDatabase } from "@/database/InitilizeDatabase";
import { SQLiteProvider } from "expo-sqlite";
import "../styles/global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Layout() {
    return (
        <ThemeProvider>
            <GestureHandlerRootView className="flex-1">
                <SQLiteProvider databaseName="unitrain.db" onInit={InitilizeDatabase}>
                    <Drawer>
                        <Drawer.Screen
                            name="(tabs)"
                            options={{ title: 'Principal', headerShown: true }}
                        />
                        <Drawer.Screen
                            name="config"
                            options={{ title: 'Configurações', headerShown: true }}
                        />
                        <Drawer.Screen
                            name="statistics"
                            options={{ title: 'Estatísticas', headerShown: true }}
                        />
                        <Drawer.Screen
                            name="(config)/theme"
                            options={{
                                title: "Tema",
                                drawerItemStyle: { display: 'none' },
                                headerShown: true,
                            }}
                        />
                        <Drawer.Screen
                            name="(config)/backup"
                            options={{
                                title: "Backup",
                                drawerItemStyle: { display: 'none' },
                                headerShown: true,
                            }}
                        />
                    </Drawer>
                </SQLiteProvider>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
