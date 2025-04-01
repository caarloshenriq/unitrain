import {ScrollView} from "react-native";
import HelpItem from "@/components/HelpItem";

export default function Help() {
    return (
        <   ScrollView contentContainerStyle={{padding: 16}}>
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
        </ScrollView>
    );
}
