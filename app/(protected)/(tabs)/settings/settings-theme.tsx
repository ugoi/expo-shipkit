import { SettingOptionRadio } from "@/components/setting-option-radio";
import { ThemeColor } from "@/components/theme-color";
import { ScrollView, View } from "react-native";
import {
  StyleSheet,
  useUnistyles,
  UnistylesRuntime,
} from "react-native-unistyles";
import { useStore } from "@/store";

export default function SettingsThemeScreen() {
  const { rt } = useUnistyles();
  const {
    setPreferredTheme,
    setAdaptiveThemes,
  } = useStore();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <SettingOptionRadio
          label="System"
          isSelected={rt.hasAdaptiveThemes}
          onPress={() => {
            if (rt.hasAdaptiveThemes) return;
            UnistylesRuntime.setAdaptiveThemes(true);
            setAdaptiveThemes(true);
          }}
        />
        <SettingOptionRadio
          label="User"
          isSelected={!rt.hasAdaptiveThemes}
          onPress={() => {
            if (!rt.hasAdaptiveThemes) return;
            UnistylesRuntime.setAdaptiveThemes(false);
            setAdaptiveThemes(false);
          }}
        />
        {!rt.hasAdaptiveThemes && (
          <View style={styles.row}>
            <ThemeColor
              label="light"
              onPress={() => {
                UnistylesRuntime.setTheme("light");
                setPreferredTheme("light");
              }}
            />
            <ThemeColor
              label="dark"
              onPress={() => {
                UnistylesRuntime.setTheme("dark");
                setPreferredTheme("dark");
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
