import Ionicons from "@expo/vector-icons/Ionicons";
import {Tabs} from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#000000",
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({color}) => (
                        <Ionicons size={28} name="home" color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="workouts"
                options={{
                    title: "Treinos",
                    tabBarIcon: ({color}) => (
                        <Ionicons size={28} name="clipboard" color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="help"
                options={{
                    title: "Ajuda",
                    tabBarIcon: ({color}) => (
                        <Ionicons size={28} name="help-circle-outline" color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
}
