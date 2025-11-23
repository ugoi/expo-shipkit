import { Pressable, Text } from "react-native";
import { Fonts, Spacing, Typography } from "@/constants/theme";
import { useThemeColor } from "@/hooks/useThemeColor";

export function Button({
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
  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");
  const disabledBackgroundColor = useThemeColor({}, "disabledBackground");
  const disabledTextColor = useThemeColor({}, "disabledText");

  return (
    <Pressable
      disabled={disabled}
      accessibilityState={{ disabled }}
      style={[
        {
          backgroundColor: disabled
            ? disabledBackgroundColor
            : (color ?? tintColor),
          paddingVertical: Spacing.sm,
          paddingHorizontal: Spacing.lg,
          borderRadius: 8,
          marginBottom: Spacing.xl,
          alignItems: "center",
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={{
          color: disabled ? disabledTextColor : backgroundColor,
          fontFamily: Fonts.sansBold,
          fontSize: Typography.button.fontSize,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
