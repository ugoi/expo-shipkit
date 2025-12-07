import { Pressable, PressableStateCallbackType, View } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";
import { ThemedText } from "./themed-text";

interface SettingOptionRadioProps extends UnistylesVariants<typeof styles> {
  label: string;
  onPress(): void;
}

export const SettingOptionRadio: React.FunctionComponent<
  SettingOptionRadioProps
> = ({ label, isSelected, onPress }) => {
  styles.useVariants({
    isSelected,
  });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <ThemedText type="subtitle">{label}</ThemedText>
      <View style={styles.radio}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: (state: PressableStateCallbackType) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.gap(1),
    borderRadius: theme.gap(1),
    padding: theme.gap(2),
    borderWidth: 1,
    borderColor: theme.colors.dimmed,
    opacity: state.pressed ? 0.75 : 1,
  }),
  radio: {
    width: theme.sizes.icon.m,
    height: theme.sizes.icon.m,
    borderRadius: theme.sizes.icon.m / 2,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    variants: {
      isSelected: {
        true: {
          borderColor: theme.colors.tint,
        },
        false: {
          borderColor: theme.colors.dimmed,
        },
      },
    },
  },
  radioInner: {
    width: theme.sizes.icon.m / 2.4,
    height: theme.sizes.icon.m / 2.4,
    borderRadius: theme.sizes.icon.m / 4.8,
    backgroundColor: theme.colors.tint,
  },
}));
