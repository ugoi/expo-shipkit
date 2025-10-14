import { ReactNode } from "react";
import { SuperwallProvider as RealSuperwallProvider } from "expo-superwall";

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
