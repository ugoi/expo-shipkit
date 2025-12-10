import { Stack } from "expo-router";
import React from "react";
import { useUnistyles } from "react-native-unistyles";

export default function PlayerLayout() {
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
          title: "Player",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[songId]"
        options={{
          title: "Now Playing",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
