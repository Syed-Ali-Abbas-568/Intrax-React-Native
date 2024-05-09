import React from 'react'
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CaptainStartRide from '../screens/CaptainStartRide';
import CaptainEditProfile from '../screens/CaptainEditProfile';

import CustomDrawer from './CustomDrawer';



import { useRoute } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const SideDrawerCaptain = () => {
    const route = useRoute();
    const { responseData } = route.params;

    // Now you can use responseData in your component
    return (

        <Drawer.Navigator

            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerType: "slide",
                headerShown: false,
                drawerActiveBackgroundColor: '#40B59F',


            }}>
            <Drawer.Screen name="Start Ride" component={CaptainStartRide} initialParams={{ responseData }} />
            <Drawer.Screen name="Edit Profile Screen" component={CaptainEditProfile} initialParams={{ responseData }} />
        </Drawer.Navigator >
    );
}


export default SideDrawerCaptain