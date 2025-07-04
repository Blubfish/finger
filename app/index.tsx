import { Text, StyleSheet } from "react-native";
import { Link } from "expo-router"; 
import { SafeAreaView } from "react-native-safe-area-context";  

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.text, { fontFamily: "$body" }, { color: "cyan" }]}>Hello Sleepy Boy</Text>
      <Link href="/about" style={styles.button}>
        Go to About 
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});