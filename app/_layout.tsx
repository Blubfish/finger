import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TamaguiProvider } from "@tamagui/core";
import tamaguiConfig from "../tamagui.config";

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="homeScreen" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  );
}
