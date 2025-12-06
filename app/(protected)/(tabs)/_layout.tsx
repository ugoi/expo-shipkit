import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
// import { useEffect } from "react";
// import { Appearance } from "react-native";
import { useUnistyles, UnistylesRuntime } from "react-native-unistyles";

export default function TabsLayout() {
  const { theme } = useUnistyles();

  // // Override the system color scheme to match the app's theme
  // // This makes native components (like NativeTabs) follow the app's theme
  // useEffect(() => {
  //   const themeName = UnistylesRuntime.themeName;
  //   Appearance.setColorScheme(themeName === "dark" ? "dark" : "light");
  // }, [theme]);

  return (
    <NativeTabs
      backgroundColor="blue"
      indicatorColor={theme.colors.foreground}
      badgeTextColor={theme.colors.typography}
      iconColor={{
        default: theme.colors.tint,
        selected: theme.colors.activeTint,
      }}
      labelStyle={{
        default: { color: theme.colors.tint },
        selected: { color: theme.colors.activeTint },
      }}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon
          sf={{ default: "house", selected: "house.fill" }}
          drawable="home"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Label>Settings</Label>
        <Icon
          sf={{ default: "gearshape", selected: "gearshape.fill" }}
          drawable="settings"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
