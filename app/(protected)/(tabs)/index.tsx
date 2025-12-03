import { useSupabase } from "@/hooks/useSupabase";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedScrollView } from "@/components/themed-scroll-view";

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
    <ThemedScrollView>
      <ThemedButton title="Sign Out" onPress={handleSignOut} />
    </ThemedScrollView>
  );
}
