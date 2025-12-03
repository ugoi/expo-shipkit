import { Stack } from "expo-router";
import { useUnistyles } from "react-native-unistyles";

export default function PublicLayout() {
  const { theme } = useUnistyles();
  return (
    <Stack initialRouteName="welcome">
      <Stack.Screen
        name="welcome"
        options={{
          title: "Welcome",
          headerShown: false,
          headerTransparent: false,
          headerShadowVisible: false,
          headerTintColor: theme.colors.tint,
          headerStyle: { backgroundColor: theme.colors.background },
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign In",
          headerTransparent: false,
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: theme.colors.tint,
          headerStyle: { backgroundColor: theme.colors.background },
        }}
      />
      <Stack.Screen
        name="email-confirmation"
        options={{
          title: "Email Confirmation",
          headerTransparent: false,
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: theme.colors.tint,
          headerStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </Stack>
  );
}
