import { Modal, View, Text } from "react-native";

export default function ExportData() {
    return (
        <Modal
            visible={true}
        >
            <View className="bg-white flex-1">
                <View className="flex justify-center gap-2 items-center flex-1">
                    <View className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm flex-col justify-between items-center">
                        <Text className="text-black font-bold text-lg">Exportar</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}