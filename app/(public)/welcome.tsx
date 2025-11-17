import { Alert, Button, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePlacement } from "expo-superwall";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Fonts, Typography, IconSizes, Spacing } from "@/constants/theme";

export default function Page() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
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
      feature() {
        console.log("Feature called");
        Alert.alert(
          "Feature Unlocked! 🎉",
          "Successfully accessed fishing feature"
        );
      },
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor,
      }}
    >
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
        onPress={() => router.push("/sign-in")}
        color={tintColor}
      />
      <Button
        title="Show Paywall"
        onPress={handleTriggerPlacement}
        color={tintColor}
      />
      {/* {placementState && (
        <Text style={{ color: textColor }}>
          Last Paywall Result: {JSON.stringify(placementState)}
        </Text>
      )} */}
    </SafeAreaView>
  );
}
