import { ScrollView, ScrollViewProps } from "react-native";
import { StyleSheet } from "react-native-unistyles";

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
  return (
    <ScrollView
      style={[styles.scrollView, style]}
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[styles.scrollViewContent, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create((theme) => ({
  scrollView: {
    backgroundColor: theme.colors.background,
  },
  scrollViewContent: {
    padding: theme.gap(2),
    gap: theme.gap(2),
  },
}));
