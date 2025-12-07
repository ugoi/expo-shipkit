import { Stack } from "expo-router";

export { ErrorBoundary } from "@/components/error-boundary";

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
