import { useState } from "react";

import { useRouter } from "expo-router";

import { useSignInWithOtp } from "@/hooks/useSignInWithOtp";
import { ThemedButton } from "@/components/themed-button";
import { AuthError } from "@supabase/supabase-js";
import { StyleSheet } from "react-native-unistyles";
import { ScrollView, View } from "react-native";
import { ThemedTextInput } from "@/components/themed-text-input";

export default function SignInScreen() {
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
    <View style={styles.container}>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedTextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <ThemedButton
          title={isLoading ? "Sending..." : "Continue"}
          onPress={onSignInPress}
          disabled={!email || isLoading}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.gap(2),
    gap: theme.gap(2),
    alignItems: "stretch",
    justifyContent: "flex-start",
    flexGrow: 1,
  },
}));
