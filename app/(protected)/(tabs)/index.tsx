import { useSupabase } from "@/hooks/useSupabase";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
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
    <ThemedView style={styles.container}>
      <ThemedScrollView>
        <ThemedText type="title">Home Screen</ThemedText>
        <ThemedButton title="Sign Out" onPress={handleSignOut} />
      </ThemedScrollView>
    </ThemedView>
  );
}
const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
}));
