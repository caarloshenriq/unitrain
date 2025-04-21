export function getTitleForRoute(routeName: string) {
    switch (routeName) {
        case "(tabs)":
            return "Principal";
        case "(config)":
            return "Configurações";
        case "(config)/backup":
            return "Backup";
        case "statistics":
            return "Estatísticas";
        case "(exercise)":
            return "Exercícios";
        case "(exercise)/[id]":
            return "Detalhe do Exercício";
        case "(exercise)/form":
            return "Novo Exercício";
        case "(workout)":
            return "Treinos";
        case "help":
            return "Ajuda";
        case "(workout)/[id]":
            return "Treino";
        case "(workout)/newWorkout":
            return "Novo Treino";
        default:
            return "Unitrain";
    }
};