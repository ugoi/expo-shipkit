import { SongTile } from "@/components/playlist-tile";
import { playlist } from "@/mocks";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function Page() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {playlist.map((song) => (
          <SongTile
            song={song}
            onPress={() => {
              router.push(`/(protected)/(tabs)/player/${song.id}`);
            }}
            key={song.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flexGrow: 1,
    gap: theme.gap(3),
    paddingHorizontal: theme.gap(2),
    paddingBottom: theme.gap(10),
  },
}));
