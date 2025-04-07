import {InitilizeDatabase} from "@/database/InitilizeDatabase";
import {SQLiteProvider} from "expo-sqlite";
import "../styles/global.css";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Drawer} from "expo-router/drawer";
import {createHeaderOptions} from "@/constants/headerOptions";
import {ThemeProvider} from "@/components/ThemeProvider";
import {useTheme} from "@/components/ThemeProvider";

export default function Layout() {
    return (
        <ThemeProvider>
            <InnerLayout/>
        </ThemeProvider>
    );
}

function InnerLayout() {
    const theme = useTheme();

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SQLiteProvider databaseName="unitrain.db" onInit={InitilizeDatabase}>
                <Drawer screenOptions={{
                    headerStyle: {
                        backgroundColor: "#000000",
                    },
                    headerTintColor: "#FFFFFF",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                    },
                    headerTitleAlign: "center",
                    drawerType: "front",
                    drawerStyle: {
                        backgroundColor: "#FFFFFF",
                        width: 240,
                    },
                }}>
                    <Drawer.Screen
                        name="(tabs)"
                        options={{title: 'Principal', headerShown: false}}
                    />
                    <Drawer.Screen
                        name="(config)"
                        options={{title: 'Configurações', headerShown: false}}
                    />
                    <Drawer.Screen
                        name="statistics"
                        options={{title: 'Estatísticas', headerShown: true}}
                    />
                    <Drawer.Screen
                        name="(exercise)"
                        options={{title: 'Exercícios', headerShown: false}}
                    />
                </Drawer>
            </SQLiteProvider>
        </GestureHandlerRootView>
    );
}
