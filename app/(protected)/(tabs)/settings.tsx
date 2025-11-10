import { Button, Text, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSupabase } from "@/hooks/useSupabase";
import { useThemeColor } from "@/hooks/useThemeColor";

import { Fonts } from "@/constants/theme";
import { Typography } from "@/constants/theme";

import { Host, Switch } from "@expo/ui/swift-ui";
import { useMMKVBoolean } from "react-native-mmkv";

export default function Page() {
  const { signOut } = useSupabase();
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useMMKVBoolean('darkModeEnabled');

  const handleDarkModeToggle = (checked: boolean) => {
    try {
      setIsDarkModeEnabled(checked);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor,
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
      {isDarkModeEnabled ? (
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
      {/* Switch between system, light and dark mode */}
      <Host matchContents>
        <Switch
          value={isDarkModeEnabled ? true : false}
          onValueChange={(checked) => {
            handleDarkModeToggle(checked);
          }}
          color="#ff0000"
          label="Play music"
          variant="switch"
        />
      </Host>
    </View>
  );
}
