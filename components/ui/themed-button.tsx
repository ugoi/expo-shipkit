import { Pressable, Text } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function ThemedButton({
  title,
  onPress,
  color,
  disabled,
  style,
}: {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  style?: object;
}) {
  const { button, buttonText, disabledButton, disabledText } = styles;

  return (
    <Pressable
      disabled={disabled}
      accessibilityState={{ disabled }}
      style={[
        button,
        disabled ? disabledButton : color ? { backgroundColor: color } : {},
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[buttonText, disabled && disabledText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  button: {
    backgroundColor: theme.colors.tint,
    paddingVertical: theme.gap(1),
    paddingHorizontal: theme.gap(2),
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.background,
    fontFamily: theme.fonts.base,
    fontWeight: "600",
    fontSize: theme.typography.button,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: theme.colors.background,
  },
}));
