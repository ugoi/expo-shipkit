import { ScrollView, ScrollViewProps } from "react-native";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

// Wrap ScrollView with withUnistyles for automatic contentContainerStyle mapping
const UniScrollView = withUnistyles(ScrollView);

export type ThemedScrollViewProps = ScrollViewProps & {};

export function ThemedScrollView({
  style,
  contentContainerStyle,
  ...otherProps
}: ThemedScrollViewProps) {
  return (
    <UniScrollView
      style={[styles.scrollView, style]}
      contentContainerStyle={[contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  scrollView: {
    backgroundColor: theme.colors.background,
  },
}));
