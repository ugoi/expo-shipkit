import { Alert, Platform } from "react-native";

import { useSupabase } from "@/hooks/useSupabase";

import { Switch as ComposeSwitch } from "@expo/ui/jetpack-compose";
import { Host as SwiftHost, Switch as SwiftSwitch } from "@expo/ui/swift-ui";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useUser } from "expo-superwall";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  UnistylesRuntime,
  withUnistyles,
} from "react-native-unistyles";
import { SettingTile } from "@/components/setting-tile";
import { router } from "expo-router";

// Wrap Switch components with withUnistyles for color mapping
const UniSwiftHost = withUnistyles(SwiftHost);
const UniSwiftSwitch = withUnistyles(SwiftSwitch);
const UniComposeSwitch = withUnistyles(ComposeSwitch);

export default function Page() {
  const systemTheme = UnistylesRuntime.hasAdaptiveThemes;
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
        <ThemedView style={styles.settingRow}>
          <ThemedText>Notifications</ThemedText>
          <UniSwiftHost matchContents>
            <UniSwiftSwitch
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
              variant="switch"
              uniProps={(theme) => ({
                color: notificationsEnabled
                  ? theme.colors.tint
                  : theme.colors.dimmed,
              })}
            />
          </UniSwiftHost>
        </ThemedView>
      );
    }

    return (
      <ThemedView style={styles.settingRow}>
        <ThemedText>Notifications</ThemedText>
        <UniComposeSwitch
          value={notificationsEnabled}
          onValueChange={handleNotificationsToggle}
          variant="switch"
          uniProps={(theme) => ({
            color: notificationsEnabled
              ? theme.colors.tint
              : theme.colors.dimmed,
          })}
        />
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedScrollView contentContainerStyle={styles.scrollView}>
        <ThemedText type="title">Settings</ThemedText>
        {/* Use native UI switches per-platform to avoid HostView errors. */}
        {/* {renderNotificationsToggle()} */}
        <ThemedView style={styles.settingsContainer}>
          <SettingTile
            settingName="Theme"
            selectedValue="Light"
            description={systemTheme ? "System" : "User"}
            onPress={() =>
              router.push("/(protected)/(tabs)/settings/settings-theme")
            }
          />
          <SettingTile
            settingName="App accent"
            selectedValue="Default"
            description="Primary app color"
            onPress={() =>
              router.push("/(protected)/(tabs)/settings/settings-accent")
            }
          />
          <ThemedButton title="Sign Out" onPress={handleSignOut} />
          <ThemedText style={styles.subscriptionText}>
            {isPaidUser ? "You are a paid user" : "You are on the free plan"}
          </ThemedText>
        </ThemedView>
      </ThemedScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
  scrollView: {
    marginTop: rt.insets.top,
    paddingHorizontal: theme.gap(2),
    flexGrow: 1,
  },
  settingsContainer: {
    marginTop: theme.gap(4),
    gap: theme.gap(4),
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subscriptionText: {
    textAlign: "center",
  },
}));
