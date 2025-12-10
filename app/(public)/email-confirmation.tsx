import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

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

  if (!email) {
    // Handle missing email - redirect back or show error
    console.error("Email parameter is missing");
    return <ThemedText>Email parameter is required</ThemedText>;
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
        "Verification failed — please check your code and try again"
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.scrollView}
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
          onChangeText={(token) => setToken(token)}
          keyboardType="number-pad"
        />
        <ThemedButton
          title="Continue"
          onPress={onSignInPress}
          disabled={!token}
        />
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
  scrollView: {
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
