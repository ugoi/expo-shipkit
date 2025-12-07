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
      <NativeTabs.Trigger name="playlist">
        <Label>Playlist</Label>
        <Icon
          sf={{ default: "music.note.list", selected: "music.note.list" }}
          drawable="playlist"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="player">
        <Label>Player</Label>
        <Icon
          sf={{ default: "play.circle", selected: "play.circle.fill" }}
          drawable="player"
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
