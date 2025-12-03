import { View, type ViewProps } from "react-native";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

// ✨ Magic auto mapping
const UniView = withUnistyles(View);

export type ThemedSafeAreaViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedSafeAreaView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedSafeAreaViewProps) {
  return <UniView style={[styles.container, style]} {...otherProps} />;
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: theme.colors.background,
    paddingBottom: rt.insets.bottom,
  },
}));
