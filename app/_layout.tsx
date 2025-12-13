import React, { useEffect, useLayoutEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Appearance } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";

import { useSupabase } from "@/hooks/useSupabase";
import { SupabaseProvider } from "@/providers/supabase-provider";
import { SuperwallProvider } from "@/providers/superwall-provider";
import { useStore } from "@/store";

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

  useLayoutEffect(() => {
    UnistylesRuntime.setAdaptiveThemes(adaptiveThemes);

    if (!adaptiveThemes) {
      UnistylesRuntime.setTheme(preferredTheme);
      Appearance.setColorScheme(preferredTheme === "dark" ? "dark" : "light");
    } else {
      // Let the system control the color scheme when adaptive themes is enabled
      Appearance.setColorScheme(null);
    }

    const theme = UnistylesRuntime.getTheme();
    UnistylesRuntime.setRootViewBackgroundColor(theme.colors.background);
  }, [preferredTheme, adaptiveThemes]);

  const { isLoaded, session } = useSupabase();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hide();
    }
  }, [isLoaded]);

  // Don't render routes until auth state is determined
  // This prevents the welcome screen from flashing before we know if user is logged in
  if (!isLoaded) {
    return null;
  }

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
