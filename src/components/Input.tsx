import React from "react";
import { TextInput, View, Text } from "react-native";

interface InputProps {
  label?: string;
  type?: "text" | "password" | "email" | "number";
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function Input({
  label,
  type = "text",
  value,
  onChangeText,
  placeholder,
}: InputProps) {
  return (
    <View className="w-full mb-4">
      {label && <Text className="text-gray-700 mb-1">{label}</Text>}
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 text-black"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={type === "password"} 
        keyboardType={
          type === "email"
            ? "email-address"
            : type === "number"
            ? "numeric"
            : "default"
        }
        autoCapitalize={type === "email" ? "none" : "sentences"}
      />
    </View>
  );
}
