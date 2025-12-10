import { Stack } from "expo-router";
import React from "react";
import { useUnistyles } from "react-native-unistyles";

export default function SettingsLayout() {
  const { theme } = useUnistyles();

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { color: theme.colors.typography, fontSize: 20 },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        headerShadowVisible: false,
        headerTintColor: theme.colors.tint,
        headerStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="settings-theme"
        options={{
          title: "Change theme",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="settings-accent"
        options={{
          title: "Change accent",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
