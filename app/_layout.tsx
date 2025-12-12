import React, { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { useSupabase } from "@/hooks/useSupabase";
import { SupabaseProvider } from "@/providers/supabase-provider";
import { SuperwallProvider } from "@/providers/superwall-provider";
import { useStore } from "@/store";
import { UnistylesRuntime } from "react-native-unistyles";
import { Appearance } from "react-native";

export { ErrorBoundary } from "@/components/error-boundary";

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <React.Fragment>
      <SuperwallProvider>
        <SupabaseProvider>
          <RootNavigator />
        </SupabaseProvider>
      </SuperwallProvider>
      <StatusBar style="auto" />
    </React.Fragment>
  );
}

function RootNavigator() {
  const { preferredTheme, adaptiveThemes } = useStore();

  UnistylesRuntime.setAdaptiveThemes(adaptiveThemes);

  if (!adaptiveThemes) {
    UnistylesRuntime.setTheme(preferredTheme);
  }

  const theme = UnistylesRuntime.getTheme();

  UnistylesRuntime.setRootViewBackgroundColor(theme.colors.background);

  useEffect(() => {
    Appearance.setColorScheme(preferredTheme === "dark" ? "dark" : "light");
  }, [preferredTheme]);

  const { isLoaded, session } = useSupabase();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hide();
    }
  }, [isLoaded]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: "none",
        animationDuration: 0,
      }}
    >
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  );
}
