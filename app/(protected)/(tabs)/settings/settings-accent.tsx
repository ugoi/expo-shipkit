import { AccentName, AnimatedButton } from "@/components/animated-button";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

export default function SettingsAccentScreen() {
  const { theme } = useUnistyles();
  const allAccents = theme.colors.accents;
  const [selectedAccent, setSelectedAccent] = useState<AccentName>("banana");

  return (
    <ThemedView style={styles.container}>
      <ThemedScrollView contentContainerStyle={styles.scrollView}>
        <ThemedView style={styles.row}>
          {Object.entries(allAccents).map(([accentName, accentColor]) => (
            <Pressable
              key={accentName}
              style={styles.item}
              onPress={() => {
                setSelectedAccent(accentName as keyof typeof allAccents);
              }}
            >
              <View
                style={styles.box(accentColor, accentName === selectedAccent)}
              />
              <ThemedText bold>{accentName}</ThemedText>
            </Pressable>
          ))}
        </ThemedView>
      </ThemedScrollView>
      <ThemedView style={styles.buttonContainer}>
        <AnimatedButton
          label="Save"
          accent={selectedAccent}
          onPress={() => {
            router.back();
          }}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    paddingBottom: rt.insets.bottom,
  },
  scrollView: {
    flex: 1,
    gap: theme.gap(2),
    paddingTop: theme.gap(2),
    paddingHorizontal: theme.gap(2),
  },
  box: (accentColor: string, isSelected: boolean) => ({
    height: 40,
    width: 40,
    backgroundColor: accentColor,
    borderRadius: 10,
    borderWidth: isSelected ? 2 : 0,
    borderColor: theme.colors.tint,
  }),
  row: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: theme.gap(2),
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.gap(2),
    paddingVertical: theme.gap(2),
    width: "100%",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dimmed,
  },
  buttonContainer: {
    marginBottom: rt.insets.bottom,
    paddingHorizontal: theme.gap(2),
  },
}));
