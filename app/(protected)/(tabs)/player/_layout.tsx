import { Stack } from "expo-router";
import React from "react";
import { useUnistyles } from "react-native-unistyles";

export default function PlayerLayout() {
  const { theme } = useUnistyles();

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          color: theme.colors.typography,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
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
