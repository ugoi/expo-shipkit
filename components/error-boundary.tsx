import { type ErrorBoundaryProps } from "expo-router";
import { View } from "react-native";
import { ThemedText } from "./themed-text";
import { StyleSheet } from "react-native-unistyles";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Something went wrong
      </ThemedText>
      <ThemedText style={styles.message}>{error.message}</ThemedText>
      <ThemedText type="link" onPress={retry}>
        Try Again
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.gap(2.5),
    backgroundColor: theme.colors.background,
  },
  title: {
    marginBottom: theme.gap(2),
  },
  message: {
    marginBottom: theme.gap(2),
    textAlign: "center",
  },
}));
