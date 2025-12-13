import { useCallback } from "react";
import { FlatList, View } from "react-native";
import { router } from "expo-router";
import { StyleSheet } from "react-native-unistyles";
import { PlaylistTile } from "@/components/playlist-tile";
import { playlist } from "@/mocks";
import { Song } from "@/types";

export default function PlaylistScreen() {
  const handlePress = useCallback((songId: number) => {
    router.push(`/(protected)/(tabs)/player/${songId}`);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Song }) => (
      <PlaylistTile song={item} onPress={() => handlePress(item.id)} />
    ),
    [handlePress],
  );

  const keyExtractor = useCallback((item: Song) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      <FlatList
        data={playlist}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    gap: theme.gap(3),
    paddingHorizontal: theme.gap(2),
    paddingBottom: theme.gap(10),
  },
}));
