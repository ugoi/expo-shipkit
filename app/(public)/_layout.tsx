import { Stack } from "expo-router";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Platform } from "react-native";

export default function PublicLayout() {
  const tintColor = useThemeColor({}, "tint");
  return (
    <Stack initialRouteName="welcome">
      <Stack.Screen
        name="welcome"
        options={{
          title: "Welcome",
          headerTransparent: Platform.OS === "ios",
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign In",
          headerTransparent: Platform.OS === "ios",
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: tintColor,
        }}
      />
      <Stack.Screen
        name="email-confirmation"
        options={{
          title: "Email Confirmation",
          headerTransparent: Platform.OS === "ios",
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: tintColor,
        }}
      />
    </Stack>
  );
}
