import { StyleSheet } from "react-native-unistyles";
import { Image } from "expo-image";
import { Pressable, PressableStateCallbackType, View } from "react-native";
import { ThemedText } from "./themed-text";
import { Song } from "@/types";

type SongProps = {
  song: Song;
  onPress: () => void;
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const SongTile: React.FunctionComponent<SongProps> = ({
  song,
  onPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={song.imageUrl}
        style={styles.image}
        placeholder={{ blurhash }}
      />
      <View style={styles.textContainer}>
        <ThemedText bold>{song.title}</ThemedText>
        <ThemedText dimmed>{song.genre}</ThemedText>
      </View>
      <ThemedText>{song.duration}</ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: (state: PressableStateCallbackType) => ({
    flexDirection: "row",
    gap: theme.gap(2),
    alignItems: "center",
    opacity: state.pressed ? 0.75 : 1,
  }),
  image: {
    width: 80,
    height: 80,
    borderRadius: theme.gap(2),
  },
  textContainer: {
    flex: 1,
  },
}));
