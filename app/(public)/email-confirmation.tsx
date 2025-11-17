import { useState } from "react";
import { Text, TextInput, Button, ScrollView } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { useSignInWithOtp } from "@/hooks/useSignInWithOtp";
import { useThemeColor } from "@/hooks/useThemeColor";

import { Fonts, Typography, Spacing } from "@/constants/theme";

export default function Page() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const { email } = useLocalSearchParams<{ email: string }>();
  const { verifyOtp, isLoaded } = useSignInWithOtp();
  const [token, setToken] = useState("");

  if (!email) {
    // Handle missing email - redirect back or show error
    return <Text>Email parameter is required</Text>;
  }

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      await verifyOtp({
        email,
        token,
      });
      router.push({
        pathname: "/(protected)/(tabs)",
      });
    } catch (err) {
      // Add email and token to error log for easier debugging
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: Spacing.md, gap: Spacing.md }}
      style={{ backgroundColor }}
    >
      <Text style={{ color: textColor }}>Code:</Text>
      <TextInput
        autoCapitalize="none"
        value={token}
        placeholder="Enter verification code"
        onChangeText={(token) => setToken(token)}
        keyboardType="number-pad"
        style={{
          color: textColor,
          fontFamily: Fonts.sans,
          fontSize: Typography.body.fontSize,
        }}
      />
      <Button
        title="Continue"
        onPress={onSignInPress}
        disabled={!token}
        color={tintColor}
      />
    </ScrollView>
  );
}
