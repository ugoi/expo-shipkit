import { SettingOptionRadio } from "@/components/setting-option-radio";
import { ThemeColor } from "@/components/theme-color";
import { ThemedView } from "@/components/themed-view";
import { use } from "react";
import { ScrollView } from "react-native";
import {
  StyleSheet,
  useUnistyles,
  UnistylesRuntime,
} from "react-native-unistyles";

export default function SettingsThemeScreen() {
  const { rt } = useUnistyles();
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <SettingOptionRadio
          label="System"
          isSelected={rt.hasAdaptiveThemes}
          onPress={() => {
            if (rt.hasAdaptiveThemes) return;
            UnistylesRuntime.setAdaptiveThemes(true);
          }}
        />
        <SettingOptionRadio
          label="User"
          isSelected={!rt.hasAdaptiveThemes}
          onPress={() => {
            if (!rt.hasAdaptiveThemes) return;
            UnistylesRuntime.setAdaptiveThemes(false);
          }}
        />
        {!rt.hasAdaptiveThemes && (
          <ThemedView style={styles.row}>
            <ThemeColor
              label="light"
              onPress={() => {
                UnistylesRuntime.setTheme("light");
              }}
            />
            <ThemeColor
              label="dark"
              onPress={() => {
                UnistylesRuntime.setTheme("dark");
              }}
            />
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    gap: theme.gap(2),
    paddingTop: theme.gap(2),
    paddingHorizontal: theme.gap(2),
  },
  row: {
    justifyContent: "center",
    flexDirection: "row",
    gap: theme.gap(2),
  },
}));
