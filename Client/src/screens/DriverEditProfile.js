import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text, Image, TouchableOpacity, Pressable, ScrollView, Animated } from "react-native";
import { Poppins_600SemiBold } from "@expo-google-fonts/dev";
import CustomInput from "../components/CustomInput";





// Read fonts later
const { height } = Dimensions.get("window");


const DriverEditProfile = () => {
    const boxHeight = height * 0.23;


    return (
        <ScrollView>

            <View style={[styles.topHalf, { height: boxHeight }]}>

                <Text style={[styles.heading, { paddingTop: height * 0.0665 }]}>Edit Profile</Text>
                <TouchableOpacity style={styles.picture}>
                    <Image
                        source={require('../../assets/profilepic.png')} />
                </TouchableOpacity>
            </View>

            <CustomInput
                labeltext={'Username'}
                displaytext={'John Doe'}
            />
            <CustomInput
                labeltext={'Email'}
                displaytext={'John@Doe.com'}
            />
            <CustomInput
                labeltext={'Phone Number'}
                displaytext={'12345678'}
            />
            <CustomInput
                labeltext={'Password'}
                displaytext={'Secret'}
                showPassword={true}
            />
            <Pressable style={styles.button}
                onPressIn={fadeOut} onPressOut={fadeIn}
            >
                <Text style={styles.buttontext}>Update</Text>
            </Pressable>
        </ScrollView>


    );
}

const styles = StyleSheet.create({

    topHalf: {
        flexDirection: 'column',
        backgroundColor: '#40B59F',
        marginBottom: 110
    },
    heading: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
    },
    picture: {
        alignItems: 'center',
        paddingVertical: 40,

    },
    buttontext: {
        color: '#FFF',
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 8

    },
    button: {
        marginTop: 35,
        backgroundColor: '#40B59F',
        borderRadius: 10,
        marginHorizontal: 40,
        height: 40,
    }

});




const fadeIn = () => {
    Animated.timing(animated, {
        toValue: 0.1,
        duration: 100,
        useNativeDriver: true,
    }).start();
};
const fadeOut = () => {
    Animated.timing(animated, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
    }).start();
};
const animated = new Animated.Value(1);
export default DriverEditProfile;
