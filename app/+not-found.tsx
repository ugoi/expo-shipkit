import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native-unistyles";

import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <ThemedText type="title">This screen doesn&apos;t exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.gap(2),
  },
  link: {
    marginTop: theme.gap(2),
    paddingVertical: theme.gap(1),
  },
}));
