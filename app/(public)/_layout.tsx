import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useUnistyles } from "react-native-unistyles";

export default function PublicLayout() {
  const { theme } = useUnistyles();
  return (
    <Stack initialRouteName="welcome">
      <Stack.Screen
        name="welcome"
        options={{
          title: "Welcome",
          headerTransparent: Platform.OS === "ios",
          headerTintColor: theme.colors.tint,
          headerStyle:
            Platform.OS === "ios"
              ? undefined
              : { backgroundColor: theme.colors.background },
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
          headerTintColor: theme.colors.tint,
          headerStyle:
            Platform.OS === "ios"
              ? undefined
              : { backgroundColor: theme.colors.background },
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
          headerTintColor: theme.colors.tint,
          headerStyle:
            Platform.OS === "ios"
              ? undefined
              : { backgroundColor: theme.colors.background },
        }}
      />
    </Stack>
  );
}
