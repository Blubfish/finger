import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TamaguiProvider } from "@tamagui/core";
import config from "@/tamagui.config";

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  );
}
