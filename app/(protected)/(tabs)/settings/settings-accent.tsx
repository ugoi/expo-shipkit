import { ThemedText } from "@/components/themed-text";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function SettingsAccentScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Change accent</ThemedText>
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
