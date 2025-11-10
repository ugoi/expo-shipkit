import { Button, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSupabase } from "@/hooks/useSupabase";
import { useThemeColor } from "@/hooks/useThemeColor";

import { Fonts } from "@/constants/theme";
import { Typography } from "@/constants/theme";
import { IconSizes } from "@/constants/theme";
import { Spacing } from "@/constants/theme";

export default function Page() {
  const { signOut } = useSupabase();
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");

  const handleSignOut = async () => {
    try {
      await signOut();
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
      <Button title="Sign Out" onPress={handleSignOut} color={tintColor} />
    </View>
  );
}
