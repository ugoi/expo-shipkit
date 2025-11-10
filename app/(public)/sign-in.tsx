import { useState } from "react";
import { Text, TextInput, Button, View, ScrollView } from "react-native";

import { router } from "expo-router";

import { useSignInWithOtp } from "@/hooks/useSignInWithOtp";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Fonts } from "@/constants/theme";
import { Typography } from "@/constants/theme";
import { IconSizes } from "@/constants/theme";
import { Spacing } from "@/constants/theme";

export default function Page() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");
  const { signInWithOtp, isLoaded } = useSignInWithOtp();

  const [email, setEmail] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      await signInWithOtp({
        email,
      });
      router.push({ pathname: "/email-confirmation", params: { email } });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: Spacing.md, gap: Spacing.md }}
      style={{ backgroundColor }}
    >
      <Text style={{ color: textColor, fontFamily: Fonts.sans, fontSize: Typography.body.fontSize }}>Email Address:</Text>
      <TextInput
        autoCapitalize="none"
        value={email}
        placeholder="Enter email"
        onChangeText={(email) => setEmail(email)}
        keyboardType="email-address"
        style={{
          color: textColor,
          fontFamily: Fonts.sans,
          fontSize: Typography.body.fontSize,
        }}
      />
      <Button title="Continue" onPress={onSignInPress} disabled={!email} color={tintColor}/>
    </ScrollView>
  );
}
