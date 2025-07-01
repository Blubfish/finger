import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Auth from "./Auth";
import { View, Text } from "react-native";

export default function App() {
  return (
    <View>
      <Auth />
    </View>
  );
}
