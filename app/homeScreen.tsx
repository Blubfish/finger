import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Auth from "./Auth";
import { Session } from "@supabase/supabase-js";
import { Button, Text, YStack } from "tamagui";
import { router } from "expo-router";

export default function AboutScreen() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      router.replace("/");
    }
  }

  return (
    <YStack flex={1} alignItems="center" justifyContent="center" padding={16}>
      <Text>Welcome to Finger!</Text>
      <Text>Current User Email: {session?.user?.email}</Text>
      <Button onPress={() => signOut()}> Sign out </Button>
    </YStack>
  );
}
