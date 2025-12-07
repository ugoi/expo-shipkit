import { useState } from "react";
import { TextInput, Alert } from "react-native";

import { useRouter, useLocalSearchParams } from "expo-router";

import { useSignInWithOtp } from "@/hooks/useSignInWithOtp";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedView } from "@/components/themed-view";

// Wrap TextInput with withUnistyles and map placeholderTextColor to theme
const UniTextInput = withUnistyles(TextInput, (theme) => ({
  placeholderTextColor: theme.colors.dimmed,
}));

export default function Page() {
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
    <ThemedView style={{ flex: 1 }}>
      <ThemedScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.scrollView}
      >
        <ThemedText style={styles.dimmedText}>
          Please enter the 4-digit verification code we&apos;ve just sent to{" "}
          <ThemedText style={styles.emailText}>{email}</ThemedText>
        </ThemedText>
        <UniTextInput
          autoCapitalize="none"
          value={token}
          placeholder="Enter verification code"
          onChangeText={(token) => setToken(token)}
          keyboardType="number-pad"
          style={styles.textInput}
        />
        <ThemedButton
          title="Continue"
          onPress={onSignInPress}
          disabled={!token}
        />
      </ThemedScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  scrollView: {
    padding: theme.gap(2),
    gap: theme.gap(2),
    alignItems: "stretch",
    justifyContent: "flex-start",
    marginTop: rt.insets.top,
    flexGrow: 1,
    paddingHorizontal: theme.gap(2),
  },
  textInput: {
    color: theme.colors.typography,
    fontFamily: theme.fonts.base,
    fontSize: theme.typography.body,
    borderColor: theme.colors.tint,
    borderWidth: 1,
    borderRadius: 8,
    padding: theme.gap(2),
    backgroundColor: "transparent",
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
