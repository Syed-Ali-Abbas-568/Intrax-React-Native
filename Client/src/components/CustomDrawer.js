import React from 'react'
import { StyleSheet, View, Text, Image, Pressable } from 'react-native'


import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import DriverEditProfile from '../screens/DriverEditProfile';
import { Ionicons } from '@expo/vector-icons';
import Logout from './LogOut';




const CustomDrawer = ({ navigation, ...props }) => {

    const navigateToEditProfile = () => {
        // Close the drawer
        navigation.closeDrawer();
        navigation.navigate('Edit Profile Screen');
        // Navigate to the "Edit Profile" page
        // navigation.navigate(DriverEditProfile); // Change 'EditProfile' to the actual name of your Edit Profile screen
    };


    return (
        <View style={styles.container}>
            <View style={styles.tophalf}>
                <View style={styles.profile}>
                    <Image style={styles.picture}
                        resizeMode='contain'
                        source={require('../../assets/profilepic.png')} />
                    <Text style={styles.subheading}>User</Text>
                    <Text style={styles.emailheading}>user@gmail.com</Text>

                    <Pressable style={styles.button} onPress={navigateToEditProfile}>
                        <Text style={styles.emailheading}>Edit Profile</Text>
                    </Pressable>
                </View>
            </View >
            {/* <DrawerContentScrollView style={styles.drawerstyle}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView> */}

            <View style={styles.drawerstyle}>
                <Pressable style={styles.label}>
                    <Ionicons name="calendar-outline" size={25} color={'#352555'} marginTop={2.5}
                    />
                    <Text style={styles.labelstyle}> History</Text>
                </Pressable>
                <Pressable style={styles.label}>
                    <Ionicons name="settings-outline" size={25} color={'#352555'} marginTop={2.5}
                    />
                    <Text style={styles.labelstyle}> Setting</Text>
                </Pressable>
                <Pressable style={styles.label}>
                    <Ionicons name="shield-checkmark-outline" size={25} color={'#352555'} marginTop={2.5}
                    />
                    <Text style={styles.labelstyle}> Support</Text>
                </Pressable>

            </View>


            <Logout navigation={navigation}/>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        borderRadius: 32,
        flex: 1,
        flexDirection: 'column'


    },
    tophalf: {

        flexDirection: 'column',
        flex: 0.4,
        backgroundColor: '#40B59F',


    },
    profile: {
        flexDirection: 'column',
        paddingVertical: 20,
        justifyContent:'center',
        alignItems:'center'



    },
    picture: {
        alignSelf: 'center',

        borderRadius: 100,
        width: 80,
        height: 80,
    },
    subheading: {

        //fontFamily: "Quicksand",
        fontSize: 20,
        fontWeight: "700",
        fontStyle: "normal",

        textAlign: "center",
        color: "#F7F8F9",
        marginTop: 5
    },
    emailheading: {

        // fontFamily: "Quicksand",

        fontSize: 15,
        fontWeight: "400",
        fontStyle: "normal",
        textAlign: "center",
        color: "#F7F8F9",



    },
    button:
    {
        marginTop: 10,

        height: 25,
        alignContent: 'center',
        borderRadius: 26,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 1.0)",
        justifyContent: 'center',
        width:'40%'
    },
    drawerstyle:
    {
        flexDirection: 'column',
        marginTop: 20,
        flex: 0.70
    },
    label:
    {
        flexDirection: 'row',
        marginLeft: 30,
        marginTop: 30


    },
    logoutView:
    {
        flexDirection: 'row',
        marginLeft: 30,
        flex: 0.10,



    },
    labelstyle:
    {
        //fontFamily: "Quicksand",
        fontSize: 20,
        fontWeight: "700",
        fontStyle: "normal",
        paddingLeft: 20,
        color: "#352555",

    },
    




})
export default CustomDrawer
