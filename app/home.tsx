import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Button, Text, YStack, XStack, Card, H1, H2, Separator } from "tamagui";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        padding={24}
        backgroundColor="$background"
        gap="$4"
      >
        <Card
          elevate
          size="$4"
          padded
          animation="bouncy"
          scale={0.9}
          hoverStyle={{ scale: 0.95 }}
          pressStyle={{ scale: 0.85 }}
          backgroundColor="$background"
          borderColor="$borderColor"
          borderWidth={1}
          borderRadius="$4"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.1}
          shadowRadius={8}
          elevation={4}
        >
          <YStack alignItems="center" gap="$4" padding="$4">
            <H1
              textAlign="center"
              color="$color"
              fontWeight="bold"
              fontSize="$8"
              letterSpacing="$1"
            >
              Welcome to finger! 🫵
            </H1>

            <Separator marginVertical="$2" />

            <YStack alignItems="center" gap="$2">
              <H2
                color="$color"
                fontSize="$4"
                fontWeight="600"
                textAlign="center"
              >
                You&apos;re signed in as:
              </H2>
              <Text
                color="$color"
                fontSize="$3"
                textAlign="center"
                backgroundColor="$background"
                paddingHorizontal="$3"
                paddingVertical="$2"
                borderRadius="$2"
                borderWidth={1}
                borderColor="$borderColor"
                fontFamily="$mono"
              >
                {session?.user?.email || "Loading..."}
              </Text>
            </YStack>

            <Separator marginVertical="$2" />

            <XStack gap="$3" justifyContent="center">
              <Button
                onPress={() => {
                  supabase.auth.signOut();
                  router.replace("/");
                }}
                backgroundColor="$red9"
                color="white"
                fontWeight="600"
                fontSize="$3"
                paddingHorizontal="$4"
                paddingVertical="$2"
                borderRadius="$3"
                borderWidth={0}
                pressStyle={{
                  backgroundColor: "$red10",
                  scale: 0.95,
                }}
                hoverStyle={{
                  backgroundColor: "$red8",
                }}
                animation="bouncy"
              >
                Sign Out
              </Button>
            </XStack>
          </YStack>
        </Card>
      </YStack>
    </SafeAreaView>
  );
}
