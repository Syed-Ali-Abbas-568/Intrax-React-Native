import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import UserDetails from './UserDetails';
import FindNearestStationButton from './FindNearesetStationButton';
import RecentLocations from './RecentLocations';
import StationInfo from './StationInfo';

const BottomSheetContent = ({ sheetRef, snapPoints, handleSheetChange, stationArrivalInfo, handleStationUpdate, navigation, styles }) => (
    <BottomSheet
        ref={sheetRef}
        index={snapPoints.length - 1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        enableContentPanningGesture
    >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            <UserDetails styles={styles} />
            <FindNearestStationButton onStationUpdate={handleStationUpdate} />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("StartRide")}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <StationInfo stationArrivalInfo={stationArrivalInfo} styles={styles} />
            <TouchableOpacity style={styles.arrival}>
                <Text style={styles.buttonText}>Estimated Bus arrival: 12 Mins</Text>
            </TouchableOpacity>
            <RecentLocations styles={styles} />
        </BottomSheetScrollView>
    </BottomSheet>
);

export default BottomSheetContent;