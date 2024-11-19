import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SolarSystem from './src/screens/SolarSystem';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SolarSystem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
