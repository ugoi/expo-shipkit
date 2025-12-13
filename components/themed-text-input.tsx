import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

const UniTextInput = withUnistyles(TextInput, (theme) => ({
  placeholderTextColor: theme.colors.dimmed,
}));

export type ThemedTextInputProps = TextInputProps;

export const ThemedTextInput: React.FunctionComponent<ThemedTextInputProps> = ({
  style,
  ...otherProps
}) => {
  return (
    <UniTextInput
      style={[styles.textInput, style]}
      underlineColorAndroid="transparent"
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create((theme) => ({
  textInput: {
    color: theme.colors.typography,
    fontFamily: theme.fonts.base,
    fontSize: theme.typography.body,
    borderColor: theme.colors.tint,
    borderWidth: 1,
    borderRadius: 8,
    padding: theme.gap(2),
    backgroundColor: "transparent",
  },
}));
