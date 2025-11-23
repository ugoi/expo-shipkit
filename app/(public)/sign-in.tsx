import { useState } from "react";
import { TextInput } from "react-native";

import { useRouter } from "expo-router";

import { useSignInWithOtp } from "@/hooks/useSignInWithOtp";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Fonts, Typography, Spacing } from "@/constants/theme";
import { Button } from "@/components/ui/button";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { AuthError } from "@supabase/supabase-js";

export default function Page() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const placeHolderTextColor = useThemeColor({}, "placeHolderText");
  const tintColor = useThemeColor({}, "tint");
  const { signInWithOtp, isLoaded } = useSignInWithOtp();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;
    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      alert("Enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      await signInWithOtp({
        email: normalizedEmail,
      });
      router.navigate({
        pathname: "/email-confirmation",
        params: { email: normalizedEmail },
      });
    } catch (error) {
      if (error instanceof AuthError) {
        alert("Error sending OTP: " + error.message);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedScrollView
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: Spacing.md, gap: Spacing.md }}
      style={{ backgroundColor }}
      keyboardShouldPersistTaps="handled"
    >
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        placeholder="Enter email"
        placeholderTextColor={placeHolderTextColor}
        style={{
          color: textColor,
          fontFamily: Fonts.sans,
          fontSize: Typography.body.fontSize,
          borderColor: tintColor,
          borderWidth: 1,
          borderRadius: 8,
          padding: Spacing.md,
        }}
      />
      <Button
        title={isLoading ? "Sending..." : "Continue"}
        onPress={onSignInPress}
        color={tintColor}
        disabled={!email || isLoading}
      />
    </ThemedScrollView>
  );
}
