import { useState } from "react";
import { Text, TextInput } from "react-native";

import { useRouter, useLocalSearchParams } from "expo-router";

import { useSignInWithOtp } from "@/hooks/useSignInWithOtp";
import { useThemeColor } from "@/hooks/useThemeColor";

import { Fonts, Typography } from "@/constants/theme";
import { Button } from "@/components/ui/button";
import { ThemedScrollView } from "@/components/themed-scroll-view";

export default function Page() {
  const router = useRouter();
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
      router.navigate({
        pathname: "/(protected)/(tabs)",
      });
    } catch (err) {
      // Add email and token to error log for easier debugging
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ThemedScrollView>
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
    </ThemedScrollView>
  );
}
