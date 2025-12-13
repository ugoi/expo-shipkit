import React from "react";
import { Pressable, StyleProp, Text, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface ThemedButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const ThemedButton: React.FunctionComponent<ThemedButtonProps> = ({
  label,
  onPress,
  disabled,
  style,
  testID,
}) => {
  styles.useVariants({
    disabled: !!disabled,
  });

  return (
    <Pressable
      disabled={disabled}
      accessibilityState={{ disabled }}
      style={[styles.button, style]}
      onPress={onPress}
      testID={testID}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  button: {
    backgroundColor: theme.colors.tint,
    paddingVertical: theme.gap(2),
    paddingHorizontal: theme.gap(2),
    borderRadius: 24,
    alignItems: "center",
    variants: {
      disabled: {
        true: { opacity: 0.5 },
        false: { opacity: 1.0 },
      },
    },
  },
  label: {
    color: theme.colors.background,
    fontFamily: theme.fonts.base,
    fontWeight: "600",
    fontSize: theme.typography.button,
  },
}));
