import 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginAs from './src/screens/LoginAs';
import Register from './src/screens/Register';
import Signup from './src/screens/Signup';
import Signin from './src/screens/Signin';
import RoutePlanner from './src/screens/RoutePlanner';
import DriverEditProfile from './src/screens/DriverEditProfile';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Maps from './src/components/Maps';
import { NavigationContainer } from '@react-navigation/native';
import Feedback from './src/screens/Feedback';

import SideDrawer from "./src/components/SideDrawer";
import StarRating from './src/components/StarRating';


export default function App() {

  return (

    <GestureHandlerRootView>
      <SafeAreaView>
        <LoginAs />
        {/* <Register /> */}
        {/* <Signin /> */}
        {/* <Signup /> */}
        {/* <RoutePlanner /> */}
        {/* <Feedback /> */}
      </SafeAreaView>
    </GestureHandlerRootView>

    // <NavigationContainer>
    //   <SideDrawer />
    // </NavigationContainer>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  }
})
