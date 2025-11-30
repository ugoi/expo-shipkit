import { useSupabase } from "@/hooks/useSupabase";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedSafeAreaView } from "@/components/themed-safe-area-view";
import { StyleSheet } from "react-native-unistyles";

export default function Page() {
  const { signOut } = useSupabase();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedButton
        title="Sign Out"
        onPress={handleSignOut}
        color={styles.buttonColor.color}
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    justifyContent: "center",
  },
  buttonColor: {
    color: theme.colors.tint,
  },
}));
