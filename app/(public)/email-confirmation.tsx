import { useState } from "react";
import { Text, TextInput, Alert } from "react-native";

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
  const params = useLocalSearchParams<{ email?: string | string[] }>();
  const email = typeof params.email === "string" ? params.email : undefined;
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
      console.error(JSON.stringify(err, null, 2));
      Alert.alert(
        "Verification Failed",
        "Verification failed — please check your code and try again",
      );
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
