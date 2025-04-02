import {Linking, ScrollView, View} from "react-native";
import HelpItem from "@/components/HelpItem";
import {Ionicons} from "@expo/vector-icons";
import Button from "@/components/Button";

export default function Help() {
    return (
        <ScrollView contentContainerStyle={{padding: 16, flexGrow: 1}}>
            <HelpItem
                question="Como criar um treino?"
                answer="Vá até a aba 'Treinos', clique em '+ Novo treino', escolha o dia da semana e adicione os exercícios desejados."
            />
            <HelpItem
                question="Posso usar o app offline?"
                answer="Sim! O Unitrain funciona completamente offline e não exige conexão com a internet."
            />
            <HelpItem
                question="Como fazer backup dos meus dados?"
                answer="Acesse as configurações e clique em 'Backup'. Você poderá exportar um arquivo .bak com seus dados."
            />
            <View className="absolute bottom-4 right-4">
                <Button
                    icon={<Ionicons name="help" size={20} color="white"/>}
                    onPress={() => {
                        Linking.openURL('mailto:felipenegrelleramos@gmail.com?subject=Ajuda&body=Descreva%20sua%20dúvida%20aqui');
                    }}
                    small={true}
                />
            </View>
        </ScrollView>
    );
}