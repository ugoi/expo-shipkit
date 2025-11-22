import { useSupabase } from "@/hooks/useSupabase";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Button } from "@/components/ui/button";
import { ThemedSafeAreaView } from "@/components/themed-safe-area-view";

export default function Page() {
  const { signOut } = useSupabase();
  const tintColor = useThemeColor({}, "tint");

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ThemedSafeAreaView
      style={{
        justifyContent: "center",
      }}
    >
      <Button title="Sign Out" onPress={handleSignOut} color={tintColor} />
    </ThemedSafeAreaView>
  );
}
