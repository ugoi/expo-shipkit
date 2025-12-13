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
  disabled?: boolean;
  style?: object;
}) {
  styles.useVariants({
    disabled: !!disabled,
  });
  return (
    <Pressable
      disabled={disabled}
      accessibilityState={{ disabled }}
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

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
