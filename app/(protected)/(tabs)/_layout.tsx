import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
import { useUnistyles } from "react-native-unistyles";

export default function TabsLayout() {
  const { theme } = useUnistyles();

  return (
    <NativeTabs
      backgroundColor={theme.colors.background}
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
