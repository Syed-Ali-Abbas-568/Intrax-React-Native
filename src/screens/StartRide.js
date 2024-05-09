import React, { } from "react";
import { StyleSheet, View, Text, Pressable, Image, ImageBackground } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const StartRide = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* MapView as background */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 31.481283147811784,
                    longitude: 74.30307372894235,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            />


            {/* Content over the map */}
            <View style={styles.content}>
                <View style={styles.bottomsheet}>
                    <Text>Display me</Text>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttontext} onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'Feedback' }],
                        })}>Start Ride</Text>
                    </Pressable>
                    <Pressable style={styles.ride}>
                        <Image style={styles.picture} source={require('../../assets/finish.png')} />
                        <Text style={styles.destinationBold}>Next Stop:</Text>
                        <Text style={styles.destination}> XYZ Station</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    map: {
        flex: 0.80,
        //...StyleSheet.absoluteFillObject,


    },
    content: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomsheet: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 30,
        width: "100%",
        height: "100%"



    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttontext: {
        color: 'white',
        textAlign: 'center',
    },
    ride: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    picture: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    destinationBold: {
        fontWeight: 'bold',
    },
    destination: {
        marginLeft: 5,
    },
});

export default StartRide;









