import Ionicons from "@expo/vector-icons/Ionicons";

import { useRouter } from "expo-router";
import { usePlacement } from "expo-superwall";
import { ThemedButton } from "@/components/ui/themed-button";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";

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
    <ThemedView style={{ flex: 1 }}>
      <ThemedScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.scrollView}
      >
        <ThemedText type="title">
          Welcome to the App! <UniIonicons name="rocket" />
        </ThemedText>
        <ThemedButton
          title="Continue with email"
          onPress={() => router.navigate("/sign-in")}
        />

        <ThemedButton title="Show Paywall" onPress={handleTriggerPlacement} />
      </ThemedScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  scrollView: {
    marginTop: rt.insets.top,
    marginBottom: rt.insets.bottom,
    padding: theme.gap(2),
    gap: theme.gap(2),
    alignItems: "stretch",
    justifyContent: "flex-end",
    flexGrow: 1,
    paddingHorizontal: theme.gap(2),
  },
}));
