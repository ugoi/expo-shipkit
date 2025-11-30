import { type ViewProps } from "react-native";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

// ✨ Magic auto mapping
const UniSafeAreaView = withUnistyles(SafeAreaView);

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
  return <UniSafeAreaView style={[styles.container, style]} {...otherProps} />;
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: theme.colors.background,
  },
}));
