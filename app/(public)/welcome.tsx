import { Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useRouter } from "expo-router";
import { usePlacement } from "expo-superwall";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Fonts, Typography, IconSizes, Spacing } from "@/constants/theme";
import { Button } from "@/components/ui/button";
import { ThemedSafeAreaView } from "@/components/themed-safe-area-view";

export default function Page() {
  const router = useRouter();
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
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
      <Text
        style={{
          color: textColor,
          fontFamily: Fonts.sans,
          fontSize: Typography.h1.fontSize,
          marginBottom: Spacing.md,
        }}
      >
        Welcome to the App!{" "}
        <Ionicons name="rocket" size={IconSizes.lg} color={iconColor} />
      </Text>
      <Button
        title="Continue with email"
        onPress={() => router.navigate("/sign-in")}
      />

      <Button title="Show Paywall" onPress={handleTriggerPlacement} />
    </ThemedSafeAreaView>
  );
}
