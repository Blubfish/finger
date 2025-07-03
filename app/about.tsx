import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";  
import { Button } from 'tamagui';


export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>About screen</Text>
        <Button onPress={() => alert('Button Pressed!')}>Click Me</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
