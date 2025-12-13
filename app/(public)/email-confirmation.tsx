import { useState, useCallback } from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";

import { useRouter, useLocalSearchParams } from "expo-router";

import { useSignInWithOtp } from "@/hooks/useSignInWithOtp";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { StyleSheet } from "react-native-unistyles";
import { ThemedTextInput } from "@/components/themed-text-input";

export default function EmailConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string | string[] }>();
  const email = typeof params.email === "string" ? params.email : undefined;
  const { verifyOtp, isLoaded } = useSignInWithOtp();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSignInPress = useCallback(async () => {
    if (!isLoaded || isLoading || !email) return;

    setIsLoading(true);
    try {
      await verifyOtp({
        email,
        token,
      });
      router.navigate({
        pathname: "/(protected)/(tabs)",
      });
    } catch (err) {
      if (__DEV__) {
        console.error(
          "OTP verification failed:",
          err instanceof Error ? err.message : err,
        );
      }
      Alert.alert(
        "Verification Failed",
        "Verification failed — please check your code and try again",
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, isLoading, verifyOtp, email, token, router]);

  if (!email) {
    if (__DEV__) {
      console.error("Email parameter is missing");
    }
    return <ThemedText>Email parameter is required</ThemedText>;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedText style={styles.dimmedText}>
          Please enter the 4-digit verification code we&apos;ve just sent to{" "}
          <ThemedText style={styles.emailText}>{email}</ThemedText>
        </ThemedText>
        <ThemedTextInput
          autoCapitalize="none"
          value={token}
          placeholder="Enter verification code"
          onChangeText={setToken}
          keyboardType="number-pad"
        />
        <ThemedButton
          label={isLoading ? "Verifying..." : "Continue"}
          onPress={onSignInPress}
          disabled={!token || isLoading}
        />
        {isLoading && <ActivityIndicator />}
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
    padding: theme.gap(2),
    gap: theme.gap(2),
    alignItems: "stretch",
    justifyContent: "flex-start",
    flexGrow: 1,
  },
  dimmedText: {
    color: theme.colors.dimmed,
    fontFamily: theme.fonts.base,
    fontSize: theme.typography.body,
  },
  emailText: {
    color: theme.colors.typography,
    fontFamily: theme.fonts.base,
    fontSize: theme.typography.body,
  },
}));
