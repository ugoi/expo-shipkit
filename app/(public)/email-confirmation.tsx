import { useState } from "react";
import { TextInput, Alert } from "react-native";

import { useRouter, useLocalSearchParams } from "expo-router";

import { useSignInWithOtp } from "@/hooks/useSignInWithOtp";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

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
        "Verification failed — please check your code and try again",
      );
    }
  };

  return (
    <ThemedScrollView
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled"
    >
      <ThemedText>Code:</ThemedText>
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
