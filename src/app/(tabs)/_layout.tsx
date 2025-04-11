import Ionicons from "@expo/vector-icons/Ionicons";
import {DrawerToggleButton} from "@react-navigation/drawer";
import {Tabs} from "expo-router";
import {createHeaderOptions} from "@/constants/headerOptions";
import {useTheme} from "@/components/ThemeProvider";

export default function TabsLayout() {
    const {resolvedTheme} = useTheme();
    const {
        headerStyle,
        headerTintColor,
        headerTitleStyle,
        headerTitleAlign,
        headerShadowVisible,
        headerStatusBarHeight, // pode estar undefined no iOS
    } = createHeaderOptions(resolvedTheme);
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: resolvedTheme === "dark" ? "lightgray": "black",
                tabBarStyle: {
                    backgroundColor: resolvedTheme === "dark" ? "#1e1e1e" : "#f9f9f9",
                    borderTopWidth: 0,
                },
                headerShown: true,
                headerLeft: () => (
                    <DrawerToggleButton tintColor={headerTintColor} />
                ),
                headerStyle,
                headerTintColor,
                ...headerTitleStyle,
                ...(typeof headerTitleAlign === "object" ? headerTitleAlign : {}),
                headerShadowVisible,
                ...(headerStatusBarHeight && { headerStatusBarHeight }),
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
                name="(workout)"
                options={{
                    title: "Treinos",
                    headerShown: false,
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
