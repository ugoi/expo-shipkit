import { Pressable, Text } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function ThemedButton({
  title,
  onPress,
  disabled,
  style,
}: {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  style?: object;
}) {
  styles.useVariants({
    opacity: !disabled,
  });
  return (
    <Pressable
      disabled={disabled}
      accessibilityState={{ disabled }}
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText]}>{title}</Text>
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
    variants: {
      opacity: {
        true: { opacity: 0.5 },
        false: { opacity: 0.5 },
        default: { opacity: 1.0 },
      },
    },
  },
  buttonText: {
    color: theme.colors.background,
    fontFamily: theme.fonts.base,
    fontWeight: "600",
    fontSize: theme.typography.button,
    variants: {
      opacity: {
        true: { opacity: 0.5 },
        false: { opacity: 0.5 },
        default: { opacity: 1.0 },
      },
    },
  },
}));
