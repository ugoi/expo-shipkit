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
  ...otherProps
}: ThemedScrollViewProps) {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <ScrollView
      style={[{ backgroundColor }, style]}
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: Spacing.md, gap: Spacing.md }}
      keyboardShouldPersistTaps="handled"
      {...otherProps}
    />
  );
}
