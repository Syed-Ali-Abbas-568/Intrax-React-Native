import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Pressable, Image, ImageBackground } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { useRoute } from '@react-navigation/native';
import { getAssignmentByID, getAllStations, updateBusLocation, getStationsByID } from "../services/captainapi";

import * as Location from 'expo-location';
import NoShift from "../components/NoShift";
import calculateDistanceAndTime from "../helpers/distanceCalculationAPI";

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


    //States to manage next station
    const [counter, setCounter] = useState(1)
    const [stationList, setStationList] = useState(null)
    const [nextStation, setNextStation] = useState(null)
    const [distanceTime, setDistanceTime] = useState(null)
    const [stationFlag, setStationFlag] = useState(true)

    //Reached Flag

    const [reached, setReached] = useState(0)
    const [isupdated, setIsUpdated] = useState(false)



    //subscrition variables
    const [subscription, setSubscription] = useState(null)



    //State if the user does not have any shift assigned to him
    const [isShiftAssinged, setisShiftAssigned] = useState(false)

    //Button Text: 

    const [buttonatt, setButtonatt] = useState("Start Ride")


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


            //Route Infromation:
            //console.log("This is the station", ass.assignedRoute.stations)


            const statList = await getStationsByID(ass.assignedRoute.stations)
            setStationList(statList)
            setNextStation(statList[1])


            //  console.log(ass.assignedBus)
            setBus(ass.assignedBus)
            setAssignment(ass)
            setDirections(dir)
            setDisplayRoute(true)
            setisShiftAssigned(true)

        } catch (err) {

            setDisplayRoute(false)
            console.log('Error occured when fetching Shifts:');
            setisShiftAssigned(false)
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





    const requestPermissions = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return false;
            }
            return true;
        } catch (error) {
            console.log("Error occurred while getting permissions:", error);
            return false;
        }
    };

    const setupLocationUpdates = async () => {
        try {
            const hasPermission = await requestPermissions();
            if (!hasPermission) return;

            subscription1 = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000, // Update location every 1 second
                },
                async (newLocation) => {
                    let distTime;

                    try {
                        if (!nextStation) return;

                        distTime = await calculateDistanceAndTime(newLocation.coords, { "latitude": nextStation.latitude, "longitude": nextStation.longitude });
                        let arr = distTime.distance.split(" ");

                        if (arr[1] === "m" && arr[0] < 50 && !isupdated) {


                            setIsUpdated(true)

                            if ((counter) < stationList.length) {
                                console.log("counter value:", counter, nextStation.name)

                                if ((counter) < stationList.length) {
                                    setNextStation(() => stationList[counter + 1])
                                }
                                setCounter(prevCounter => prevCounter + 1);
                                console.log(nextStation.name)

                            }


                        } else if (arr[1] === "km" && arr[0] > 1) {
                            setIsUpdated(false);
                        }

                        setDistanceTime(distTime);
                        setLocation(newLocation.coords);
                        animateToUserLocation(newLocation.coords);

                        if (displayRoute && nextStation) {
                            await updateBus(newLocation.coords, distTime.duration, nextStation._id);
                        }
                    } catch (error) {
                        console.log("Error occurred during location update:", error);
                    }
                }
            );

            setSubscription(subscription1)
        } catch (error) {
            console.log("Error occurred while setting up location updates:", error);
        }
    };






    useEffect(() => {


        if (displayRoute) {
            console.log("run")
            setupLocationUpdates();
            console.log()

            // Cleanup on component unmount
            return () => {
                if (subscription) {
                    subscription.remove();
                }
            };
        }
    }, [displayRoute, nextStation]);








    async function updateBus(coords, timeOfArrival, nextStation) {

        try {


            const res = await updateBusLocation(bus._id, { latitude: coords.latitude, longitude: coords.longitude }, timeOfArrival, nextStation)
            //console.log("updated location is : ", coords)
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

        isShiftAssinged ? (

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
                        <Text>Hello Mr. {responseData.name}</Text>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttontext} onPress={() => { setButtonatt("Ride Started") }}>{buttonatt}</Text>
                        </Pressable>
                        <Pressable style={styles.ride}>
                            <Image style={styles.picture} source={require('../../assets/finish.png')} />
                            <Text style={styles.destinationBold}>Next Stop: {counter < stationList.length ? nextStation.name : "Route Completed"}</Text>
                            <Text style={styles.destinationBold}>Time Left:{distanceTime ? distanceTime.duration : "calculating"} </Text>
                            <Text style={styles.destinationBold}>Distance Left:{distanceTime ? distanceTime.distance : "calculating"}</Text>

                        </Pressable>
                    </View>
                </View>


            </View>
        ) : (


            <NoShift name={responseData.name} />
        )




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
        flexDirection: 'column',
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









