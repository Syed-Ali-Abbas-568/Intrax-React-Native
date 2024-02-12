import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import StartRide from '../screens/StartRide';
import DriverEditProfile from '../screens/DriverEditProfile';
import CustomDrawer from './CustomDrawer';
import { Ionicons } from '@expo/vector-icons';




const Drawer = createDrawerNavigator();
const SideDrawer = () => {

    return (


        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerType: "slide",
                headerShown: false,
                drawerActiveBackgroundColor: '#40B59F',



            }}>
            <Drawer.Screen name="Start Ride" component={StartRide} />
            <Drawer.Screen name="Edit Profile Screen" component={DriverEditProfile} />
        </Drawer.Navigator >


    );
}


export default SideDrawer