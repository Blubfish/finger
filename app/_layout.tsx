import { Stack } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";  
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="about" options={{ title: 'About' }} />
      </Stack>
    </SafeAreaView>
  );
}

