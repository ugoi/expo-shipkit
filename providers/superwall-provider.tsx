import { ReactNode } from "react";
import {
  SuperwallProvider as RealSuperwallProvider,
  SuperwallExpoModule,
} from "expo-superwall";

type SuperwallModule = typeof SuperwallExpoModule & {
  __patchedIgnoreNonSuperwallLinks?: boolean;
};

const patchSuperwallDeepLinkHandler = () => {
  const moduleRef = SuperwallExpoModule as SuperwallModule;
  const handler = moduleRef?.handleDeepLink;

  if (
    !moduleRef ||
    typeof handler !== "function" ||
    moduleRef.__patchedIgnoreNonSuperwallLinks
  ) {
    return;
  }

  const shouldIgnoreError = (error: unknown) => {
    if (!(error instanceof Error)) {
      return false;
    }

    const message = error.message?.toLowerCase?.();

    return message?.includes("not a superwall link") ?? false;
  };

  const callSafely = async (url: string): Promise<boolean> => {
    if (!url) {
      return false;
    }

    try {
      return await handler.call(moduleRef, url);
    } catch (error) {
      if (shouldIgnoreError(error)) {
        if (__DEV__) {
          console.log("[superwall] Ignored non-Superwall deep link", url);
        }
        return false;
      }
      throw error;
    }
  };

  // NOTE: This patch intercepts deep links to safely ignore non-Superwall URLs.
  // The original handler throws for non-Superwall links, which we catch and handle gracefully.
  moduleRef.handleDeepLink = (url: string) => callSafely(url);

  moduleRef.__patchedIgnoreNonSuperwallLinks = true;
};

patchSuperwallDeepLinkHandler();

interface SuperwallProviderProps {
  children: ReactNode;
}

export const SuperwallProvider = ({ children }: SuperwallProviderProps) => {
  const superwallApiKeyIos = process.env.EXPO_PUBLIC_SUPERWALL_API_KEY_IOS;
  const superwallApiKeyAndroid =
    process.env.EXPO_PUBLIC_SUPERWALL_API_KEY_ANDROID;

  if (!superwallApiKeyIos || !superwallApiKeyAndroid) {
    const missingKeys = [];
    if (!superwallApiKeyIos)
      missingKeys.push("EXPO_PUBLIC_SUPERWALL_API_KEY_IOS");
    if (!superwallApiKeyAndroid)
      missingKeys.push("EXPO_PUBLIC_SUPERWALL_API_KEY_ANDROID");
    throw new Error(`Missing Superwall API keys: ${missingKeys.join(", ")}`);
  }

  return (
    <RealSuperwallProvider
      apiKeys={{ ios: superwallApiKeyIos, android: superwallApiKeyAndroid }}
    >
      {children}
    </RealSuperwallProvider>
  );
};
