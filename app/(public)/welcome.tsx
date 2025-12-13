import Ionicons from "@expo/vector-icons/Ionicons";

import { useRouter } from "expo-router";
import { usePlacement } from "expo-superwall";
import { ThemedButton } from "@/components/themed-button";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { ThemedText } from "@/components/themed-text";
import { ScrollView, View } from "react-native";

// Wrap TextInput with withUnistyles and map placeholderTextColor to theme
const UniIonicons = withUnistyles(Ionicons, (theme) => ({
  color: theme.colors.tint,
  size: theme.sizes.icon.l,
}));

export default function WelcomeScreen() {
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
    <View style={styles.container}>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.contentContainer}
      >
        <ThemedText type="title">
          Welcome to the App! <UniIonicons name="rocket" />
        </ThemedText>
        <ThemedButton
          title="Continue with email"
          onPress={() => router.navigate("/sign-in")}
        />

        <ThemedButton title="Show Paywall" onPress={handleTriggerPlacement} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingBottom: rt.insets.bottom,
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: rt.insets.top,
    padding: theme.gap(2),
    gap: theme.gap(2),
    alignItems: "stretch",
    justifyContent: "flex-end",
    paddingHorizontal: theme.gap(2),
  },
}));
