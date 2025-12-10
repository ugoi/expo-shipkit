import { Alert, ScrollView, View } from "react-native";
import { useSupabase } from "@/hooks/useSupabase";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { useUser } from "expo-superwall";
import { useEffect, useState } from "react";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import { SettingTile } from "@/components/setting-tile";
import { router } from "expo-router";

export default function Page() {
  const systemTheme = UnistylesRuntime.hasAdaptiveThemes;
  const { signOut } = useSupabase();

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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.contentContainer]}>
        <View style={styles.settingsContainer}>
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
        </View>
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
    flexGrow: 1,
    paddingHorizontal: theme.gap(2),
  },
  settingsContainer: {
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
