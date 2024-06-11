import React from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ANDRIOD_GOOGLE_API_KEY } from '../../keys';

const LocationInput = ({ type, onLocationSelect, showDestinationInput, setShowDestinationInput, styles }) => {
    return (
        <View style={type === 'source' ? styles.srcStyle : styles.dstStyle}>
            <GooglePlacesAutocomplete
                placeholder={type === 'source' ? "Source" : "Destination"}
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
        </View>
    );
};

export default LocationInput;