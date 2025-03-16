import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View, StyleSheet } from "react-native";
import { ReactNode } from "react";

interface ButtonProps {
  title?: string;
  icon?: ReactNode;
  onPress: () => void;
  variant?: "solid" | "outline";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  small?: boolean;
}

export default function Button({
  title,
  icon,
  onPress,
  variant = "solid",
  fullWidth = false,
  disabled = false,
  loading = false,
  small = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        variant === "solid" ? styles.solid : styles.outline,
        small && styles.small,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "solid" ? "black" : "white"} />
      ) : (
        <View style={styles.content}>
          {icon}
          {title && <Text style={[styles.text, small && styles.smallText]}>{title}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  solid: {
    backgroundColor: "#000",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#000",
  },
  fullWidth: {
    width: "100%",
  },
  small: {
    width: 40,
    height: 40,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  smallText: {
    fontSize: 14,
    marginLeft: 0,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
});
