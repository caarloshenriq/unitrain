import { importBackup } from "@/scripts/backup";
import { SQLiteDatabase } from "expo-sqlite";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default function ImportData({ onClose, db }: { onClose: () => void, db: SQLiteDatabase }) {
    const onImport = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                // type: 'application/json',
                copyToCacheDirectory: true,
            });

            if (result.canceled || !result.assets?.[0]) return;

            const fileUri = result.assets[0].uri;

            await importBackup(db, fileUri);

            Alert.alert('Sucesso', 'Backup restaurado com sucesso!');

            onClose();
        } catch (error) {
            console.error('Erro ao importar dados:', error);

            Alert.alert('Erro', 'Não foi possível importar o backup.');
        }

        onClose();
    };

    return (
        <Modal
            transparent={true}
            visible={true}
            animationType="slide"
        >
            <View className="flex-1 justify-center items-center bg-transparent bg-opacity-50">
                <View className="bg-white p-6 rounded-lg shadow-lg w-3/4 border-2 border-gray-300">
                    <Text className="text-black font-bold text-lg">Deseja restaurar os seus dados?</Text>
                    <Text className="text-gray-500 text-md text-center mb-4">os dados já cadastrados irão ser perdidos
                        nesse processo</Text>
                    <Pressable
                        onPress={onImport}
                        className="bg-blue-500 p-4 rounded-lg mb-4 shadow-sm flex-col justify-between items-center"
                    >
                        <Text className="text-white font-bold text-lg">Importar</Text>
                    </Pressable>
                    <Pressable
                        onPress={onClose}
                        className="bg-gray-300 p-4 rounded-lg shadow-sm flex-col justify-between items-center"
                    >
                        <Text className="text-black font-bold text-lg">Cancelar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}