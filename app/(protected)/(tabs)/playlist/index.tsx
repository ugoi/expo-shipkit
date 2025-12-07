import { SongTile } from "@/components/playlist-tile";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { playlist } from "@/mocks";
import { router } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function Page() {
  return (
    <ThemedView style={styles.container}>
      <ThemedScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText type="title">Playlist</ThemedText>
        </View>
        {playlist.map((song) => (
          <SongTile
            song={song}
            onPress={() => {
              router.push(`/(protected)/(tabs)/player/${song.id}`);
            }}
            key={song.id}
          />
        ))}
      </ThemedScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    marginTop: rt.insets.top + theme.gap(2),
    flex: 1,
  },
  scrollView: {
    gap: theme.gap(3),
    paddingHorizontal: theme.gap(2),
    paddingBottom: rt.insets.bottom + theme.gap(10),
    flexGrow: 1,
  },
  header: {
    paddingBottom: theme.gap(2),
  },
}));
