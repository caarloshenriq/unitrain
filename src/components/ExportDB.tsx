import React from 'react';
import { Pressable, Text, View, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function ExportDatabase() {
  const exportDB = async () => {
    try {
      const dbName = 'unitrain.db';
      const from = `${FileSystem.documentDirectory}SQLite/${dbName}`;
      const to = `${FileSystem.documentDirectory}${dbName}`;

      const dbExists = await FileSystem.getInfoAsync(from);
      if (!dbExists.exists) {
        Alert.alert("Erro", "Banco de dados não encontrado.");
        return;
      }

      // Copia o arquivo da pasta protegida para um local compartilhável
      await FileSystem.copyAsync({ from, to });

      // Abre o menu nativo de compartilhamento (AirDrop, Arquivos etc.)
      await Sharing.shareAsync(to);
    } catch (error) {
      console.error("Erro ao exportar banco:", error);
      Alert.alert("Erro", "Não foi possível exportar o banco.");
    }
  };

  return (
    <View className="p-6">
      <Pressable
        onPress={exportDB}
        className="bg-blue-600 p-4 rounded-lg"
      >
        <Text className="text-white text-center font-bold text-lg">
          Exportar banco de dados
        </Text>
      </Pressable>
    </View>
  );
}