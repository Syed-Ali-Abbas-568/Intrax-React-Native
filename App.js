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
import CaptainSignin from './src/screens/CaptainSignin';
import RoutePlanner from './src/screens/RoutePlanner';
import RoutePlannerCaptain from './src/screens/RoutePlannerCaptain';
import DriverEditProfile from './src/screens/DriverEditProfile';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
//import Maps from './src/components/MapsToBeDeleted';
import Feedback from './src/screens/Feedback';
import StartRide from './src/screens/StartRide';
import SideDrawer from "./src/components/SideDrawer";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Logout from './src/components/LogOut';
import axios from 'axios';
import Maps from './src/components/Map';
import LocationComponent from './src/components/LocationComponent';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ANDRIOD_GOOGLE_API_KEY } from "./keys"


axios.defaults.withCredentials = true;

const Stack = createNativeStackNavigator();


export default function App() {

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer >
        <Stack.Navigator >
{/* 
//           <Stack.Screen name="Role" component={LoginAs} />
//           <Stack.Screen name="Register" component={Register} />
//           <Stack.Screen name="Signup" component={Signup} options={{ title: '' }} />
//           <Stack.Screen name="StartRide" component={SideDrawer} />
//           <Stack.Screen name="Signin" component={Signin} options={{ title: '' }} />
//           <Stack.Screen name="CaptainSignin" component={CaptainSignin} options={{ title: '' }} /> */}

          <Stack.Screen name="RoutePlanner" component={RoutePlanner} />
           {/* <Stack.Screen name="RoutePlannerCaptain" component={RoutePlannerCaptain} />
//           <Stack.Screen name="Feedback" component={Feedback} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
     </NavigationContainer>
     </GestureHandlerRootView>


   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  }
})





