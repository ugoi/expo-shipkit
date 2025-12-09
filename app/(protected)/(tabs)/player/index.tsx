import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/themed-button";
import { router } from "expo-router";
import { StyleSheet } from "react-native-unistyles";
import { View } from "react-native";

export default function PlayerIndexScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Looking for inspiration?</ThemedText>
      <ThemedText>Pick a song from the playlist</ThemedText>
      <ThemedButton
        title="Pick a song"
        onPress={() => router.replace("/(protected)/(tabs)/playlist")}
      />
    </View>
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
