import { SettingOptionRadio } from "@/components/setting-option-radio";
import { ThemeColor } from "@/components/theme-color";
import { ScrollView, View } from "react-native";
import {
  StyleSheet,
  useUnistyles,
  UnistylesRuntime,
} from "react-native-unistyles";

export default function SettingsThemeScreen() {
  const { rt } = useUnistyles();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
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
          <View style={styles.row}>
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
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingBottom: rt.insets.bottom,
  },
  contentContainer: {
    flexGrow: 1,
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
