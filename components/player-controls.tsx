import { Pressable, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { IconSymbol } from "./ui/icon-symbol";
import { useStore } from "@/store";

export const PlayerControls = () => {
  const { theme } = useUnistyles();
  const { preferredAccent } = useStore();
  const accent = theme.colors.accents[preferredAccent];

  return (
    <View style={styles.container} accessibilityRole="toolbar">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go to beginning"
      >
        <IconSymbol name="backward.end.fill" size={40} color={accent} />
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Rewind">
        <IconSymbol name="backward.fill" size={50} color={accent} />
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Play">
        <IconSymbol name="play.circle.fill" size={100} color={accent} />
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Fast forward">
        <IconSymbol name="forward.fill" size={50} color={accent} />
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Go to end">
        <IconSymbol name="forward.end.fill" size={40} color={accent} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    marginTop: theme.gap(2),
    flexDirection: "row",
    gap: theme.gap(2),
    alignItems: "center",
  },
}));
