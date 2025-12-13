import React from "react";
import { Text, type TextProps } from "react-native";
import { StyleSheet, type UnistylesVariants } from "react-native-unistyles";

export type ThemedTextProps = TextProps & UnistylesVariants<typeof styles>;

export const ThemedText: React.FunctionComponent<ThemedTextProps> = ({
  style,
  type,
  bold,
  dimmed,
  ...rest
}) => {
  styles.useVariants({ type, bold, dimmed });
  return <Text style={[styles.text, style]} {...rest} />;
};

const styles = StyleSheet.create((theme) => ({
  text: {
    color: theme.colors.typography,
    variants: {
      type: {
        default: {
          fontSize: 16,
          lineHeight: 24,
        },
        title: {
          fontSize: 32,
          fontWeight: "bold",
          lineHeight: 32,
        },
        subtitle: {
          fontSize: 20,
          fontWeight: "bold",
        },
        link: {
          lineHeight: 30,
          fontSize: 16,
          color: theme.colors.link,
        },
      },
      bold: {
        true: {
          fontWeight: "bold",
        },
      },
      dimmed: {
        true: {
          color: theme.colors.dimmed,
        },
      },
    },
  },
}));
