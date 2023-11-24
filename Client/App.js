import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Signin from './src/screens/Signin';


export default function App() {
  return (
    <SafeAreaView>
      <Signin/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      marginTop:StatusBar.currentHeight
  }})
