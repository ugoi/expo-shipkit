import { Stack } from "expo-router";

import { useThemeColor } from "@/hooks/useThemeColor";


export default function PublicLayout() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");

  return (
    <Stack initialRouteName="welcome">
      <Stack.Screen
        name="welcome"
        options={{
          title: "Welcome",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign In",
          headerTransparent: true,
          headerLargeTitle: true,
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: tintColor,
        }}
      />
      <Stack.Screen
        name="email-confirmation"
        options={{
          title: "Email Confirmation",
          headerTransparent: true,
          headerLargeTitle: true,
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: tintColor,
        }}
      />
    </Stack>
  );
}
