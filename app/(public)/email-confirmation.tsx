import { useState } from "react";
import { Text, TextInput, Button, View, ScrollView } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { useSignInWithOtp } from "@/hooks/useSignInWithOtp";

export default function Page() {
  const { email } = useLocalSearchParams<{ email: string }>();

  const { verifyOtp, isLoaded } = useSignInWithOtp();

  const [token, setToken] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      await verifyOtp({
        email,
        token
      });
      router.push({pathname: "/(protected)/(tabs)", params: {
        email: email
      }});
    } catch (err) {
        // Add email and token to error log for easier debugging
      console.error(JSON.stringify({ email: email ? email : "", token: token ? token : "", error: err }, null, 2));
    }
  };

  return (
    <ScrollView
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16, gap: 8 }}
    >
      <Text>Code:</Text>
      <TextInput
        autoCapitalize="none"
        value={token}
        placeholder="Enter email"
        onChangeText={(token) => setToken(token)}
      />
      <Button
        title="Continue"
        onPress={onSignInPress}
        disabled={!token}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
      </View>
    </ScrollView>
  );
}
