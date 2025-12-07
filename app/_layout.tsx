import React, { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import { useSupabase } from "@/hooks/useSupabase";
import { SupabaseProvider } from "@/providers/supabase-provider";
import { SuperwallProvider } from "@/providers/superwall-provider";

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
          <BlurredStatusBar />
        </SupabaseProvider>
      </SuperwallProvider>
      <StatusBar style="auto" />
    </React.Fragment>
  );
}

function BlurredStatusBar() {
  const { theme, rt } = useUnistyles();

  return (
    <BlurView
      intensity={25}
      style={[styles.statusBarBlur, { height: rt.insets.top }]}
    />
  );
}

function RootNavigator() {
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

const styles = StyleSheet.create({
  statusBarBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});
