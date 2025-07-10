import { SafeAreaView } from "react-native-safe-area-context";
import Auth from "./auth";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Auth />
    </SafeAreaView>
  );
}
