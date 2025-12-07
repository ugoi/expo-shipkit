import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/themed-button";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { StyleSheet } from "react-native-unistyles";

export default function PlayerIndexScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Looking for inspiration?</ThemedText>
      <ThemedText>Pick a song from the playlist</ThemedText>
      <ThemedButton
        title="Pick a song"
        onPress={() => router.replace("/(protected)/(tabs)/playlist")}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.gap(2),
    marginTop: rt.insets.top,
  },
}));
