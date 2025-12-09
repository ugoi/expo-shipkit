import { Stack } from "expo-router";
import React from "react";
import { useUnistyles } from "react-native-unistyles";

export default function SettingsLayout() {
  const { theme } = useUnistyles();

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerBlurEffect: "regular",
        headerTitleStyle: { color: theme.colors.typography, fontSize: 20 },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        headerShadowVisible: false,
        headerTintColor: theme.colors.tint,
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
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="settings-accent"
        options={{
          title: "Change accent",
          presentation: "modal",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
