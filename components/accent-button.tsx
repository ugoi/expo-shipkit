import React from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";
import { useAnimatedVariantColor } from "react-native-unistyles/reanimated";
import { ThemedText } from "./themed-text";
import { useStore } from "@/store";

const ANIMATION_DURATION_MS = 500;

interface ButtonProps extends UnistylesVariants<typeof styles> {
  label: string;
  onPress: () => void;
  testID?: string;
}

export const AccentButton: React.FunctionComponent<ButtonProps> = ({
  label,
  accent,
  onPress,
  testID,
}) => {
  const { preferredAccent } = useStore();

  styles.useVariants({
    accent: accent ?? preferredAccent,
  });

  const color = useAnimatedVariantColor(styles.buttonColor, "backgroundColor");
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(color.value, {
      duration: ANIMATION_DURATION_MS,
    }),
  }));

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      testID={testID}
    >
      <Animated.View style={[styles.button, animatedStyle]}>
        <ThemedText bold>{label}</ThemedText>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  button: {
    width: "100%",
    padding: theme.gap(2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.gap(1),
  },
  buttonColor: {
    variants: {
      accent: {
        banana: {
          backgroundColor: theme.colors.accents.banana,
        },
        pumpkin: {
          backgroundColor: theme.colors.accents.pumpkin,
        },
        apple: {
          backgroundColor: theme.colors.accents.apple,
        },
        grass: {
          backgroundColor: theme.colors.accents.grass,
        },
        storm: {
          backgroundColor: theme.colors.accents.storm,
        },
        default: {
          backgroundColor: theme.colors.accents.banana,
        },
      },
    },
  },
}));
