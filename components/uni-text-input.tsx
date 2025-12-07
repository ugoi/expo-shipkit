import { TextInput } from "react-native";
import { withUnistyles } from "react-native-unistyles";

/**
 * Themed TextInput with automatic placeholderTextColor mapping.
 * Use this for all text inputs that need theme-aware placeholder colors.
 */
export const UniTextInput = withUnistyles(TextInput, (theme) => ({
  placeholderTextColor: theme.colors.dimmed,
}));
