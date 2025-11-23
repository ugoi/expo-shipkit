import { Platform, Text } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useSupabase } from "@/hooks/useSupabase";

import { Fonts, Spacing, Typography } from "@/constants/theme";

import { Switch as ComposeSwitch } from "@expo/ui/jetpack-compose";
import { Host as SwiftHost, Switch as SwiftSwitch } from "@expo/ui/swift-ui";
import { useMMKVBoolean } from "react-native-mmkv";
import { Button } from "@/components/ui/button";
import { ThemedSafeAreaView } from "@/components/themed-safe-area-view";
import { useUser } from "expo-superwall";
import { useEffect, useState } from "react";

export default function Page() {
  const { signOut } = useSupabase();
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const switchOnColor = useThemeColor({}, "switchOn");
  const switchOffColor = useThemeColor({}, "switchOff");

  const [isDarkModeEnabled, setIsDarkModeEnabled] =
    useMMKVBoolean("darkModeEnabled");
  const darkModeEnabled = Boolean(isDarkModeEnabled);

  const { subscriptionStatus } = useUser();
  const [isPaidUser, setIsPaidUser] = useState(false);
  useEffect(() => {
    if (subscriptionStatus?.status === "ACTIVE") {
      console.log(
        "User has active entitlements:",
        subscriptionStatus.entitlements,
      );
      setIsPaidUser(true);
    } else {
      console.log("User is on free plan");
      setIsPaidUser(false);
    }
  }, [subscriptionStatus]);

  const handleDarkModeToggle = (checked: boolean) => {
    try {
      setIsDarkModeEnabled(checked);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  const renderDarkModeToggle = () => {
    if (Platform.OS === "ios") {
      return (
        <SwiftHost matchContents style={{ marginBottom: Spacing.md }}>
          <SwiftSwitch
            value={darkModeEnabled}
            onValueChange={handleDarkModeToggle}
            color={darkModeEnabled ? switchOnColor : switchOffColor}
            label="Enable dark mode"
            variant="switch"
          />
        </SwiftHost>
      );
    }

    return (
      <ComposeSwitch
        style={{ marginBottom: Spacing.md }}
        value={darkModeEnabled}
        onValueChange={handleDarkModeToggle}
        color={darkModeEnabled ? switchOnColor : switchOffColor}
        label="Enable dark mode"
        variant="switch"
      />
    );
  };

  return (
    <ThemedSafeAreaView
      style={{
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: textColor,
          fontFamily: Fonts.sans,
          fontSize: Typography.body.fontSize,
          marginBottom: Spacing.sm,
        }}
      >
        Enable Dark Mode
      </Text>
      {darkModeEnabled ? (
        <Text
          style={{
            color: textColor,
            fontFamily: Fonts.sans,
            fontSize: Typography.body.fontSize,
            marginBottom: Spacing.md,
          }}
        >
          Dark mode is enabled
        </Text>
      ) : (
        <Text
          style={{
            color: textColor,
            fontFamily: Fonts.sans,
            fontSize: Typography.body.fontSize,
            marginBottom: Spacing.md,
          }}
        >
          Dark mode is disabled
        </Text>
      )}
      {/* Use native UI switches per-platform to avoid HostView errors. */}
      {renderDarkModeToggle()}
      <Button
        style={{ marginBottom: Spacing.md }}
        title="Sign Out"
        color={tintColor}
        onPress={handleSignOut}
      />
      {isPaidUser ? (
        <Text
          style={{
            color: textColor,
            fontFamily: Fonts.sans,
            fontSize: Typography.body.fontSize,
          }}
        >
          You are a paid user
        </Text>
      ) : (
        <Text
          style={{
            color: textColor,
            fontFamily: Fonts.sans,
            fontSize: Typography.body.fontSize,
          }}
        >
          You are on the free plan
        </Text>
      )}
    </ThemedSafeAreaView>
  );
}
