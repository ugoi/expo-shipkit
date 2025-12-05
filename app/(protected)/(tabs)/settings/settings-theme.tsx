import { ThemedText } from "@/components/themed-text";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function SettingsThemeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Change theme</ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    marginTop: rt.insets.top,
    paddingHorizontal: theme.gap(2),
  },
}));
