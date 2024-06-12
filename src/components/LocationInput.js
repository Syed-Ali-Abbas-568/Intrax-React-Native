import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location'; // Import expo-location
import { ANDRIOD_GOOGLE_API_KEY } from '../../keys';
import { getAllBuses } from '../services/captainapi';


const LocationInput = ({ type, onLocationSelect, showDestinationInput, setShowDestinationInput }) => {



    //
    [selectedCurrent, setSelectedCurrent] = useState(false)
    // Function to handle fetching the current location
    const handleCurrentLocation = async () => {

        try {
            setSelectedCurrent(true)
            // Request permission to access location
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission Denied", "Permission to access location was denied.");
                return;
            }

            // Fetch the current location
            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            const { latitude, longitude } = location.coords;

            // Create location object
            const currentLocation = {
                latitude,
                longitude,
                title: "Current Selected Source",
                description: "This is your current selected location."
            };

            // Update location selection
            onLocationSelect(currentLocation, type);
            setShowDestinationInput(true)

        } catch (error) {
            setSelectedCurrent(false)
            setShowDestinationInput(false)
            console.error(error);
            Alert.alert("Error", "Unable to fetch your current location. Please try again.");
        }
    };

    return (
        <View style={type === 'source' ? styles.srcStyle : styles.dstStyle}>
            <GooglePlacesAutocomplete
                placeholder={type === 'source' ? (selectedCurrent ? "Current Location Selected" : "Source") : "Destination"}
                query={{ key: ANDRIOD_GOOGLE_API_KEY }}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    if (details) {
                        const location = {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            title: type === 'source' ? "Source" : "Destination",
                            description: `This is your ${type === 'source' ? 'Source' : 'Destination'} location.`
                        };
                        onLocationSelect(location, type);
                    }
                }}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('no results')}
                textInputProps={{
                    onFocus: () => type === 'source' && setShowDestinationInput(false),
                    onBlur: () => type === 'source' && setShowDestinationInput(true)
                }}
            />

            {type === 'source' && (
                <TouchableOpacity style={styles.currentLocationButton} onPress={handleCurrentLocation}>
                    <Text style={styles.currentLocationText}>Use Current Location</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default LocationInput;

// Styles (you can add these to your styles or modify as needed)
const styles = StyleSheet.create({
    srcStyle: {
        zIndex: 1000,
        position: "absolute",
        top: 5,
        borderWidth: 1,
        width: "90%",
        borderColor: "#667080",
        marginLeft: 20,
        borderRadius: 15,
        padding: 4,

    },
    dstStyle: {
        zIndex: 800,
        position: "absolute",
        top: 130,
        borderWidth: 1,
        width: "90%",
        borderColor: "#667080",
        marginLeft: 20,
        borderRadius: 15,
        padding: 4
    },
    currentLocationButton: {
        backgroundColor: '#40B59F',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    currentLocationText: {
        color: 'white',
        fontSize: 16
    }
});
