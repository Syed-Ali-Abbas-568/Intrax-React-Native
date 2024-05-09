import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Pressable, Image, ImageBackground } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { useRoute } from '@react-navigation/native';
import { getAssignmentByID, getAllStations, updateBusLocation } from "../services/captainapi";

import * as Location from 'expo-location';

const CaptainStartRide = ({ navigation }) => {

    const route = useRoute();
    // Ref for map view
    const mapViewRef = useRef(null);


    const { responseData } = route.params;
    const [displayRoute, setDisplayRoute] = useState(false)
    const [assignment, setAssignment] = useState(null)
    const [directions, setDirections] = useState(null)
    const [stations, setStations] = useState(null)
    const [bus, setBus] = useState(null)

    //State to manage user locations
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);







    useEffect(() => {

        // Call named function
        getShift();
        getStations();
    }, [])


    async function getShift() {

        try {
            const ass = await getAssignmentByID(responseData.shift)
            // console.log(ass)

            const dir = JSON.parse(ass.assignedRoute.directions)

            console.log(ass.assignedBus)
            setBus(ass.assignedBus)
            setAssignment(ass)
            setDirections(dir)
            setDisplayRoute(true)

        } catch (err) {

            setDisplayRoute(false)
            console.log('Error occured when fetching Shifts:');
        }

    }



    async function getStations() {

        try {
            const stat = await getAllStations()
            //console.log(stat)
            setStations(stat)


        } catch (err) {


            console.log('Error occured when fetching Stations:');
        }
    }




    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let locationSubscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 2000, // Update location every 2 seconds (adjust as needed)
                },
                (newLocation) => {
                    setLocation(newLocation.coords);
                    animateToUserLocation(newLocation.coords);
                    if (displayRoute) {
                        updateBus(newLocation.coords)
                    }


                }
            );

            return () => {
                if (locationSubscription) {
                    locationSubscription.remove();
                }
            };
        })();
    }, []);





    async function updateBus(coords) {

        try {


            const res = await updateBusLocation(bus._id, { latitude: coords.latitude, longitude: coords.longitude })
            console.log(res)
        }
        catch (err) {
            console.log("error updating bus location")
        }

    }


    const animateToUserLocation = (coords) => {
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion({
                latitude: coords.latitude,
                longitude: coords.longitude,

            });
        }



    };












    return (
        <View style={styles.container}>
            {errorMsg ? (
                <Text>{errorMsg}</Text>
            ) : location ? (
                <MapView
                    style={styles.map}
                    ref={mapViewRef}

                    initialRegion={{
                        latitude: 31.481283147811784,
                        longitude: 74.30307372894235,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}


                >


                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title={displayRoute ? `Bus Number: ${bus.busNumber}` : "BusNumber"}
                        description={displayRoute ? `Bus Model: ${bus.licensePlateNumber}` : "BusPlate"}





                    >
                        <Image
                            source={require('../../assets/bus.png')}
                            style={{ width: 30, height: 30 }} // Adjust the width and height as needed
                        />

                    </Marker>






                    {displayRoute &&
                        directions.legs.map((leg, lIndex) => (
                            <React.Fragment key={lIndex}>
                                {leg.steps.map((step, sIndex) => (
                                    <React.Fragment key={sIndex}>
                                        {step.path && (
                                            <Polyline
                                                key={`${lIndex}_${sIndex}`}
                                                coordinates={step.path.map(point => ({
                                                    latitude: point.lat,
                                                    longitude: point.lng
                                                }))}
                                                strokeColor="#FF0000"
                                                strokeWidth={5}
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                    {stations && stations.map((station, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: station.latitude,
                                longitude: station.longitude,
                            }}
                            title={station.name}
                            description={station.description}
                        >
                            {/* Custom bus icon for the marker */}
                            <Image
                                source={require('../../assets/finish.png')}
                                style={{ width: 40, height: 40 }} // Adjust the size as needed
                            />
                        </Marker>
                    ))}
                </MapView>
            ) : (
                <Text>Loading...</Text>
            )}
            {/* Content over the map */}
            <View style={styles.content}>
                <View style={styles.bottomsheet}>
                    <Text>{responseData.name}</Text>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttontext} onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'Feedback' }],
                        })}>Start Ride</Text>
                    </Pressable>
                    <Pressable style={styles.ride}>
                        <Image style={styles.picture} source={require('../../assets/finish.png')} />
                        <Text style={styles.destinationBold}>Next Stop:</Text>
                        <Text style={styles.destinationBold}>Time Left:</Text>
                        <Text style={styles.destinationBold}>Distance Left:</Text>
                        <Text style={styles.destination}> XYZ Station</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    map: {
        flex: 0.80,



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

export default CaptainStartRide;









