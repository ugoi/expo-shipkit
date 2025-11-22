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

  const callSafely = async (url: string) => {
    if (!url) {
      return false;
    }

    try {
      return await handler.call(moduleRef, url);
    } catch (error) {
      if (shouldIgnoreError(error)) {
        console.debug("[superwall] Ignored non-Superwall deep link", url);
        return false;
      }
      throw error;
    }
  };

  moduleRef.handleDeepLink = (url: string) => callSafely(url);

  moduleRef.__patchedIgnoreNonSuperwallLinks = true;
};

patchSuperwallDeepLinkHandler();

interface SuperwallProviderProps {
  children: ReactNode;
}

export const SuperwallProvider = ({ children }: SuperwallProviderProps) => {
  const superwallApiKeyIos = process.env.EXPO_PUBLIC_SUPERWALL_API_KEY_IOS!;
  const superwallApiKeyAndroid =
    process.env.EXPO_PUBLIC_SUPERWALL_API_KEY_ANDROID!;

  return (
    <RealSuperwallProvider
      apiKeys={{ ios: superwallApiKeyIos, android: superwallApiKeyAndroid }}
    >
      {children}
    </RealSuperwallProvider>
  );
};
