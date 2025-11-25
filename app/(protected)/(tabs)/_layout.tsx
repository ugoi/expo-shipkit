import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.indicatorColor}
      badgeTextColor={colors.tabBadgeText}
      iconColor={{
        default: colors.tabIconDefault,
        selected: colors.tabIconSelected,
      }}
      labelStyle={{
        default: { color: colors.tabIconDefault },
        selected: { color: colors.tabIconSelected },
      }}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Label>Settings</Label>
        <Icon sf="gearshape.fill" drawable="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
