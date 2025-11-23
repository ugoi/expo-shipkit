import { Spacing } from "@/constants/theme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ScrollView, ScrollViewProps } from "react-native";

export type ThemedScrollViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedScrollView({
  style,
  lightColor,
  darkColor,
  contentContainerStyle,
  ...otherProps
}: ThemedScrollViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <ScrollView
      style={[{ backgroundColor }, style]}
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        { padding: Spacing.md, gap: Spacing.md },
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      {...otherProps}
    />
  );
}
