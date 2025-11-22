import { Platform, Text } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useSupabase } from "@/hooks/useSupabase";

import { Fonts, Typography } from "@/constants/theme";

import { Switch as ComposeSwitch } from "@expo/ui/jetpack-compose";
import { Host as SwiftHost, Switch as SwiftSwitch } from "@expo/ui/swift-ui";
import { useMMKVBoolean } from "react-native-mmkv";
import { Button } from "@/components/ui/button";
import { ThemedSafeAreaView } from "@/components/themed-safe-area-view";

export default function Page() {
  const { signOut } = useSupabase();
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const switchOnColor = useThemeColor({}, "switchOn");
  const switchOffColor = useThemeColor({}, "switchOff");

  const [isDarkModeEnabled, setIsDarkModeEnabled] =
    useMMKVBoolean("darkModeEnabled");
  const darkModeEnabled = Boolean(isDarkModeEnabled);

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
    // log tintColor to verify it's being applied correctly
    console.log("Rendering switch with tintColor:", tintColor);
    if (Platform.OS === "ios") {
      return (
        <SwiftHost matchContents>
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
          }}
        >
          Dark mode is disabled
        </Text>
      )}
      {/* Use native UI switches per-platform to avoid HostView errors. */}
      {renderDarkModeToggle()}
      <Button title="Sign Out" color={tintColor} onPress={handleSignOut} />
    </ThemedSafeAreaView>
  );
}
