import { useState } from "react";
import { TextInput } from "react-native";

import { useRouter } from "expo-router";

import { useSignInWithOtp } from "@/hooks/useSignInWithOtp";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { AuthError } from "@supabase/supabase-js";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

// Wrap TextInput with withUnistyles and map placeholderTextColor to theme
const UniTextInput = withUnistyles(TextInput, (theme) => ({
  placeholderTextColor: theme.colors.dimmed,
}));

export default function Page() {
  const router = useRouter();
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
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled"
    >
      <UniTextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        placeholder="Enter email"
        underlineColorAndroid="transparent"
        style={styles.textInput}
      />
      <ThemedButton
        title={isLoading ? "Sending..." : "Continue"}
        onPress={onSignInPress}
        disabled={!email || isLoading}
      />
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  scrollViewContent: {
    padding: theme.gap(2),
    gap: theme.gap(2),
  },
  textInput: {
    color: theme.colors.typography,
    fontFamily: theme.fonts.base,
    fontSize: theme.typography.body,
    borderColor: theme.colors.tint,
    borderWidth: 1,
    borderRadius: 8,
    padding: theme.gap(1),
    backgroundColor: "transparent",
  },
}));
