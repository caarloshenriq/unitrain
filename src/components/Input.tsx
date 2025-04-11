import React from "react";
import { TextInput, View, Text } from "react-native";
import { useTheme } from "./ThemeProvider";

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
  const theme = useTheme();

  return (
    <View className="w-full mb-4">
      {label && <Text className="text-gray-700 dark:text-white mb-1">{label}</Text>}
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 text-black dark:text-white"
        placeholder={placeholder}
        placeholderTextColor={theme.resolvedTheme === "dark" ? "#ccc" : "#999"}
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
