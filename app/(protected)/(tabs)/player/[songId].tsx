import { PlayerControls } from "@/components/player-controls";
import { ThemedText } from "@/components/themed-text";
import { playlist } from "@/mocks";
import { useLocalSearchParams, Redirect } from "expo-router";
import { Image } from "expo-image";
import { ScrollView, View } from "react-native";
import { mq, StyleSheet } from "react-native-unistyles";

export default function PlayerScreen() {
  const { songId } = useLocalSearchParams();

  const song = playlist.find((song) => song.id === Number(songId));

  if (!songId || !song) {
    return <Redirect href="/(protected)/(tabs)/player" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={{ uri: song.imageUrl }} style={styles.image} />
        <ThemedText type="title">{song.title}</ThemedText>
        <ThemedText dimmed type="subtitle">
          {song.genre}
        </ThemedText>
        <ThemedText>{song.duration}</ThemedText>
        <PlayerControls />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    marginTop: rt.insets.top,
    backgroundColor: theme.colors.background,
    paddingBottom: rt.insets.bottom,
  },
  contentContainer: {
    flexGrow: 1,
    gap: theme.gap(2),
    alignItems: "center",
    justifyContent: {
      [mq.only.width(600)]: "center",
    },
    paddingTop: theme.gap(3),
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: theme.gap(2),
  },
}));
