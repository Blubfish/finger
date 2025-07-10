import { useState, useRef } from "react";
import { Alert, Pressable } from "react-native";
import { supabase } from "@/lib/supabase";
import { Button, Input, XStack, YStack, Text } from "tamagui";
import { router } from "expo-router";

export default function Auth() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef<any>(null);
  const confirmPasswordRef = useRef<any>(null);

  async function handleAuth() {
    if (!formData.email || !formData.password) {
      Alert.alert("Please enter your email and password");
      return;
    }

    if (mode === "signUp" && formData.password !== formData.confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signIn") {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
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
        <Text fontSize={24} fontWeight="600" marginBottom={8}>
          {mode === "signIn" ? "Welcome back" : "Create an account"}
        </Text>

        <Input
          placeholder="email@address.com"
          width={260}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
        />

        <Input
          ref={passwordRef}
          placeholder="Password"
          width={260}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
          autoCapitalize="none"
          returnKeyType={mode === "signUp" ? "next" : "done"}
          onSubmitEditing={() => {
            if (mode === "signUp") {
              confirmPasswordRef.current?.focus();
            } else {
              handleAuth();
            }
          }}
        />

        {mode === "signUp" && (
          <Input
            ref={confirmPasswordRef}
            placeholder="Confirm Password"
            width={260}
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={handleAuth}
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

        <XStack marginTop={8} alignItems="center" gap={6}>
          <Text>
            {mode === "signIn"
              ? "Don't have an account?"
              : "Already have an account?"}
          </Text>
          <Pressable onPress={() => setMode(mode === "signIn" ? "signUp" : "signIn")} disabled={loading}>
            <Text color="$blue10" fontWeight="600">
              {mode === "signIn" ? "Sign Up" : "Sign In"}
            </Text>
          </Pressable>
        </XStack>
      </YStack>
    </YStack>
  );
}
