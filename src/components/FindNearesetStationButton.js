import { useState, useEffect, useCallback } from 'react'; // Import missing hooks
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';

const apiKey = "AIzaSyDRRMtathJaJoAfGPMtQ8dztAZxl2Dl_Vs";

const FindNearestStationButton = ({ onStationUpdate }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const stations = [
        {

            latitude: 31.49286009926777,
            longitude: 74.32987538265394,
            title: 'Model Town Station',
            description: 'Station located in Model Town',
        },
        {

            latitude: 31.486256771794142,
            longitude: 74.29433637403777,
            title: 'Jinnah Hospital Station',
            description: 'Station near Jinnah Hospital',
        },
        {

            latitude: 31.502332130369904,
            longitude: 74.3691724325911,
            title: 'Cavalry Road Station',
            description: 'Station near Cavalry Road',
        },
        {

            latitude: 31.445882493123456,
            longitude: 74.30692618251891,
            title: 'Masjed Stop Station',
            description: 'Station in Township near Masjed Stop',
        },

        {

            latitude: 31.451892894123183,
            longitude: 74.29829123687864,
            title: 'UMT StopStation',
            description: 'Station near UMT University',
        },

        {

            latitude: 31.559295723326283,
            longitude: 74.3886449926254,
            title: 'Ghaziabad Staiton',
            description: 'Station near Ghaziabad',
        },

    ];


    const findClosestStation = useCallback(() => {
        if (!location || !location.coords) {
            console.error('Location data is not available.');
            return;
        }

        let apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${location.coords.latitude},${location.coords.longitude}&destinations=`;
        stations.forEach((station, index) => {
            apiUrl += `${station.latitude},${station.longitude}`;
            if (index < stations.length - 1) {
                apiUrl += '|';
            }
        });

        apiUrl += `&key=${apiKey}`;

        // Fetching distance data from Google Maps API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.rows && data.rows.length > 0 && data.rows[0].elements) {
                    // Extracting and processing the distance information from the API response
                    const distances = data.rows[0].elements;

                    //console.log('API Response:', data);

                    // Finding the closest station
                    let closestStation = null;
                    let minDistance = Infinity;

                    distances.forEach((distance, index) => {
                        if (distance.status === 'OK') {
                            if (distance.distance.value < minDistance) {
                                minDistance = distance.distance.value;
                                closestStation = stations[index];
                            }
                        }
                    });

                    if (closestStation) {
                        // console.log('Closest Station:', closestStation);
                        onStationUpdate(closestStation);
                    } else {
                        console.error('No valid station found.');
                    }
                } else {
                    console.error('Unexpected API response structure:', data);
                }
            })
            .catch(error => console.error('Error fetching distance data:', error));
    }, [location]);


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            try {
                let location = await Location.getCurrentPositionAsync({});
                if (location && location.coords) {
                    // Only set the location state if it's a valid object with coordinates
                    setLocation(location);
                } else {
                    setErrorMsg('Location data is not available.');
                }
            } catch (error) {
                console.error('Error getting location:', error);
                setErrorMsg('Error getting location.');
            }
        })();
    }, []);

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
