import { useState, useEffect, useCallback } from 'react'; // Import missing hooks
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import findNearestStations from '../helpers/stationCalculation';
import { USES_DEFAULT_IMPLEMENTATION } from 'react-native-maps/lib/decorateMapComponent';

import { getAllStations } from '../services/captainapi';

const apiKey = "AIzaSyDRRMtathJaJoAfGPMtQ8dztAZxl2Dl_Vs";

const FindNearestStationButton = ({ onStationUpdate }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [stations, setStationList] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch station data
                const stationData = await getAllStations();
                setStationList(stationData);

                // Request location permissions and get current location
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                if (location && location.coords) {
                    // Only set the location state if it's a valid object with coordinates
                    setLocation(location);
                } else {
                    setErrorMsg('Location data is not available.');
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMsg('Error fetching data.');
            }
        };

        fetchData(); // Call the function immediately

    }, []); // Empty dependency array to run only once on component mount







    const findClosestStation = useCallback(() => {
        if (!location || !location.coords) {
            console.error('Location data is not available.');
            return;
        }


        console.log("closest ", stations)

        console.log(location.coords)

        closest = findNearestStations(location.coords, stations)



        onStationUpdate(closest);


        // let apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${location.coords.latitude},${location.coords.longitude}&destinations=`;
        // stations.forEach((station, index) => {
        //     apiUrl += `${station.latitude},${station.longitude}`;
        //     if (index < stations.length - 1) {
        //         apiUrl += '|';
        //     }
        // });

        // apiUrl += `&key=${apiKey}`;

        // // Fetching distance data from Google Maps API
        // fetch(apiUrl)
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data.rows && data.rows.length > 0 && data.rows[0].elements) {
        //             // Extracting and processing the distance information from the API response
        //             const distances = data.rows[0].elements;

        //             //console.log('API Response:', data);

        //             // Finding the closest station
        //             let closestStation = null;
        //             let minDistance = Infinity;

        //             distances.forEach((distance, index) => {
        //                 if (distance.status === 'OK') {
        //                     if (distance.distance.value < minDistance) {
        //                         minDistance = distance.distance.value;
        //                         closestStation = stations[index];
        //                     }
        //                 }
        //             });

        //             if (closestStation) {

        //                 onStationUpdate(closestStation);
        //             } else {
        //                 console.error('No valid station found.');
        //             }
        //         } else {
        //             console.error('Unexpected API response structure:', data);
        //         }
        //     })
        //     .catch(error => console.error('Error fetching distance data:', error));
    }, [location]);




    return (
        <TouchableOpacity onPress={findClosestStation}>
            <View style={styles.nearestLocStyle}>
                <Image source={require("../../assets/ic_loc.png")} />
                <Text style={styles.label}>Find Nearest Station</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    label: {
        color: "#667080",
        fontSize: 18,
        alignSelf: 'center'


    },
    nearestLocStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 40

    },
})





export default FindNearestStationButton;
