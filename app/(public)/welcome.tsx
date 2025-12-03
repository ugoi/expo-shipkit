import Ionicons from "@expo/vector-icons/Ionicons";

import { useRouter } from "expo-router";
import { usePlacement } from "expo-superwall";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedSafeAreaView } from "@/components/themed-safe-area-view";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

// Wrap TextInput with withUnistyles and map placeholderTextColor to theme
const UniIonicons = withUnistyles(Ionicons, (theme) => ({
  color: theme.colors.tint,
  size: theme.sizes.icon.l,
}));

export default function Page() {
  const router = useRouter();
  const { registerPlacement } = usePlacement({
    onError: (err) => console.error("Placement Error:", err),
    onPresent: (info) => console.log("Paywall Presented:", info),
    onDismiss: (info, result) =>
      console.log("Paywall Dismissed:", info, "Result:", result),
  });

  const handleTriggerPlacement = async () => {
    await registerPlacement({
      placement: "campaign_trigger",
      feature: () => {
        router.navigate("/sign-in");
      },
    });
  };

  return (
    <ThemedSafeAreaView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">
          Welcome to the App! <UniIonicons name="rocket" />
        </ThemedText>
        <ThemedButton
          title="Continue with email"
          onPress={() => router.navigate("/sign-in")}
        />

        <ThemedButton title="Show Paywall" onPress={handleTriggerPlacement} />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "column",
    gap: theme.gap(2),
    alignItems: "stretch",
    paddingHorizontal: theme.gap(2),
  },
}));
