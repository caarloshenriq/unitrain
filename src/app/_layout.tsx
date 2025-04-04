import { InitilizeDatabase } from "@/database/InitilizeDatabase";
import { SQLiteProvider } from "expo-sqlite";
import "../styles/global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SQLiteProvider databaseName="unitrain.db" onInit={InitilizeDatabase}>
                <Drawer>
                    <Drawer.Screen
                        name="(tabs)"
                        options={{ title: 'Principal', headerShown: false }}
                    />
                    <Drawer.Screen
                        name="(config)"
                        options={{ title: 'Configurações', headerShown: false }}
                    />
                    <Drawer.Screen
                        name="statistics"
                        options={{ title: 'Estatísticas', headerShown: true }}
                    />
                    <Drawer.Screen
                        name="(exercise)"
                        options={{ title: 'Exercícios', headerShown: false }}
                    />
                     <Drawer.Screen
                        name="(workout)"
                        options={{
                            // title: "Detalhe do treino",
                            drawerItemStyle: { display: 'none' },
                            headerShown: false,
                        }}
                    />
                </Drawer>
            </SQLiteProvider>
        </GestureHandlerRootView>
    );
}
