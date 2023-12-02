import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginAs from './src/screens/LoginAs';
import Register from './src/screens/Register';
import Signup from './src/screens/Signup';
import Signin from './src/screens/Signin';
import RoutePlanner from './src/screens/RoutePlanner';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  return (
    <GestureHandlerRootView>
    <SafeAreaView>
      <RoutePlanner/>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      marginTop:StatusBar.currentHeight
  }})
