import { Accents, Themes } from "@/unistyles";
import { createStore } from "stan-js";
import { createStorage } from "stan-js/storage";
import { createMMKV } from "react-native-mmkv";

const mmkv = createMMKV({
  id: "app-storage",
});

const storage = createStorage({
  mmkvInstance: mmkv,
});

export const { useStore } = createStore({
  preferredAccent: storage<Accents>("banana"),
  preferredTheme: storage<Themes>("light"),
  adaptiveThemes: storage<boolean>(true),
});
