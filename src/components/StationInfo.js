import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const StationInfo = ({ stationArrivalInfo, styles }) => {
    return stationArrivalInfo ? (
        <TouchableOpacity style={styles.arrival}>
            <Text style={styles.buttonText}>Distance to Station: {stationArrivalInfo.distance}km </Text>
            <Text style={styles.buttonText}>Estimated Arrival Time: {stationArrivalInfo.duration}min</Text>
        </TouchableOpacity>
    ) : null;
};

export default StationInfo;