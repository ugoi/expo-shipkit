import { useColorScheme as useSystemColorScheme } from "react-native";
import { useMMKVBoolean } from "react-native-mmkv";

export function useColorScheme(): "light" | "dark" {
  const [isDarkModeEnabled] = useMMKVBoolean("darkModeEnabled");
  const systemScheme = useSystemColorScheme();
  const prefersDark =
    typeof isDarkModeEnabled === "boolean"
      ? isDarkModeEnabled
      : systemScheme === "dark";
  return prefersDark ? "dark" : "light";
}
