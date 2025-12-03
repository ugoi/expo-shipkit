import { Alert, Platform } from "react-native";

import { useSupabase } from "@/hooks/useSupabase";

import { Switch as ComposeSwitch } from "@expo/ui/jetpack-compose";
import { Host as SwiftHost, Switch as SwiftSwitch } from "@expo/ui/swift-ui";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedSafeAreaView } from "@/components/themed-safe-area-view";
import { ThemedText } from "@/components/themed-text";
import { useUser } from "expo-superwall";
import { useEffect, useState } from "react";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

// Wrap Switch components with withUnistyles for color mapping
const UniSwiftHost = withUnistyles(SwiftHost);
const UniSwiftSwitch = withUnistyles(SwiftSwitch);
const UniComposeSwitch = withUnistyles(ComposeSwitch);

export default function Page() {
  const { signOut } = useSupabase();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const { subscriptionStatus } = useUser();
  const [isPaidUser, setIsPaidUser] = useState(false);
  useEffect(() => {
    if (subscriptionStatus?.status === "ACTIVE") {
      if (__DEV__) {
        console.log("User has active entitlements");
      }
      setIsPaidUser(true);
    } else {
      if (__DEV__) {
        console.log("User is on free plan");
      }
      setIsPaidUser(false);
    }
  }, [subscriptionStatus]);

  const handleNotificationsToggle = (checked: boolean) => {
    setNotificationsEnabled(checked);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Sign out error:", err);
      // Consider showing a toast/alert to the user
      Alert.alert(
        "Sign Out Failed",
        "An error occurred while signing out. Please try again.",
      );
    }
  };
  const renderNotificationsToggle = () => {
    if (Platform.OS === "ios") {
      return (
        <UniSwiftHost matchContents style={styles.switchContainer}>
          <UniSwiftSwitch
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
            label="Enable notifications"
            variant="switch"
            uniProps={(theme) => ({
              color: notificationsEnabled
                ? theme.colors.tint
                : theme.colors.dimmed,
            })}
          />
        </UniSwiftHost>
      );
    }

    return (
      <UniComposeSwitch
        style={styles.switchContainer}
        value={notificationsEnabled}
        onValueChange={handleNotificationsToggle}
        label="Enable notifications"
        variant="switch"
        uniProps={(theme) => ({
          color: notificationsEnabled ? theme.colors.tint : theme.colors.dimmed,
        })}
      />
    );
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      {/* Use native UI switches per-platform to avoid HostView errors. */}
      {renderNotificationsToggle()}
      <ThemedButton
        style={styles.button}
        title="Sign Out"
        onPress={handleSignOut}
      />
      <ThemedText>
        {isPaidUser ? "You are a paid user" : "You are on the free plan"}
      </ThemedText>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    justifyContent: "center",
  },
  switchContainer: {
    marginBottom: theme.gap(2),
  },
  button: {
    marginBottom: theme.gap(2),
  },
}));
