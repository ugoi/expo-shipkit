import { Stack, type ErrorBoundaryProps } from "expo-router";
import { useUnistyles } from "react-native-unistyles";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
      <ThemedText type="title" style={{ marginBottom: 16 }}>Something went wrong</ThemedText>
      <ThemedText style={{ marginBottom: 16, textAlign: "center" }}>{error.message}</ThemedText>
      <ThemedText type="link" onPress={retry}>Try Again</ThemedText>
    </ThemedView>
  );
}

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
