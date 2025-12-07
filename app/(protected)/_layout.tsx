import { Stack, type ErrorBoundaryProps } from "expo-router";
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

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
