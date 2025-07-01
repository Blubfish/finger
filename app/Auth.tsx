import React, { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input, YStack } from "tamagui";
import { router } from "expo-router";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      router.replace("/homeScreen"); 
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    console.log(email);
    console.log(password);
    if (!email || !password) {
      Alert.alert("Please enter your email and password");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password: password.trim(),
    });

    if (error) {
      console.log("Sign up error:", error);
      Alert.alert(error.message);
    }
    if (!data?.session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <YStack marginTop={40} padding={12}>
      <YStack paddingVertical={4} alignSelf="stretch">
        <Input
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </YStack>
      <YStack paddingVertical={4} alignSelf="stretch">
        <Input
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </YStack>
      <YStack paddingVertical={4} alignSelf="stretch" marginTop={20}>
        <Button disabled={loading} onPress={() => signInWithEmail()}>
          {" "}
          Sign In{" "}
        </Button>
      </YStack>
      <YStack paddingVertical={4} alignSelf="stretch">
        <Button disabled={loading} onPress={() => signUpWithEmail()}>
          {" "}
          Sign Up{" "}
        </Button>
      </YStack>
    </YStack>
  );
}
