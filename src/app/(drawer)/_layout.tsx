import {Drawer} from 'expo-router/drawer'

export default function drawerLayout(){
    return(
        <Drawer>
            <Drawer.Screen name="(tabs)" options={{ title: "Home"}}/>
            <Drawer.Screen name="statistics" options={{ title: "Estatistica"}}/>
            <Drawer.Screen name="config" options={{ title: "Configurações"}}/>
        </Drawer>
    )
}