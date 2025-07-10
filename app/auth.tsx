import { useState } from "react";
import { Alert, Pressable } from "react-native";
import { supabase } from "@/lib/supabase";
import { Button, Input, XStack, YStack, Text } from "tamagui";
import { router } from "expo-router";

export default function Auth() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleMode() {
    setMode((m) => (m === "signIn" ? "signUp" : "signIn"));
  }

  async function handleAuth() {
    if (!email || !password) {
      Alert.alert("Please enter your email and password");
      return;
    }

    if (mode === "signUp" && password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signIn") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        if (!data?.user) {
          Alert.alert(
            "Please check your inbox to verify your email before signing in.",
          );
        }
      }

      router.replace("/home");
    } catch (err: any) {
      Alert.alert(err.message ?? "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      padding={24}
      minHeight="100vh"
      width="100%"
      backgroundColor="$background"
    >
      <YStack
        width={320}
        alignItems="center"
        justifyContent="center"
        padding={24}
        gap={12}
      >
        <Text fontSize={24} fontWeight="600">
          {mode === "signIn" ? "Welcome back" : "Create an account"}
        </Text>

        <Input
          placeholder="email@address.com"
          width={260}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          placeholder="Password"
          width={260}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        {mode === "signUp" && (
          <Input
            placeholder="Confirm Password"
            width={260}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        )}

        <Button
          width={260}
          disabled={loading}
          onPress={handleAuth}
          marginTop={8}
        >
          {loading ? "Loading…" : mode === "signIn" ? "Sign In" : "Sign Up"}
        </Button>

        <XStack marginTop={12} alignItems="center" gap={6}>
          <Text>
            {mode === "signIn"
              ? "Don't have an account?"
              : "Already have an account?"}
          </Text>
          <Pressable onPress={toggleMode} disabled={loading}>
            <Text color="$blue10" fontWeight="600">
              {mode === "signIn" ? "Sign Up" : "Sign In"}
            </Text>
          </Pressable>
        </XStack>
      </YStack>
    </YStack>
  );
}
