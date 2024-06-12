import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import UserDetails from './UserDetails';
import FindNearestStationButton from './FindNearesetStationButton';
import RecentLocations from './RecentLocations';
import StationInfo from './StationInfo';
import FullSteps from './FullSteps';

import { getAllBuses } from '../services/captainapi';




const BottomSheetContent = ({ sheetRef, snapPoints, handleSheetChange, stationArrivalInfo,
    handleStationUpdate, styles, responseData, handleContinue,
    fullRoute, routePath, dataSet, stationID }) => {


    const [b1uses, set1Buses] = useState([]);

    const [buses, setBuses] = useState([]);
    const [message, setMessage] = useState('Fetching bus data...');

    // useEffect(() => {
    //     const fetchBuses = async () => {
    //         try {
    //             // Fetch all buses
    //             const busData = await getAllBuses();

    //             // Filter buses that are heading to the given stationID
    //             const filteredBuses = busData.filter(bus => bus.nextStation === stationID);

    //             // Update state with filtered buses or a message if none are found
    //             if (filteredBuses.length > 0) {
    //                 setBuses(filteredBuses);
    //                 setMessage(''); // Clear the message if buses are found
    //             } else {
    //                 setBuses([]);
    //                 setMessage('No bus available right now');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching bus data:', error);
    //             setMessage('Failed to fetch bus data');
    //         }
    //     };

    //     // Initial fetch
    //     fetchBuses();

    //     // Set interval to fetch data every 3 seconds
    //     const intervalId = setInterval(fetchBuses, 3000);

    //     // Clear interval on component unmount
    //     return () => clearInterval(intervalId);
    // }, [stationID]);




    return (
        <BottomSheet
            ref={sheetRef}
            index={snapPoints.length - 1}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            enableContentPanningGesture
            style={styles.holder}
        >


            <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                <UserDetails styles={styles} responseData={responseData} />
                {!fullRoute && <FindNearestStationButton onStationUpdate={handleStationUpdate} />}

                <StationInfo stationArrivalInfo={stationArrivalInfo} styles={styles} />


                {/*
                <TouchableOpacity style={styles.arrival}>
                    {buses.length > 0 ? (
                        buses.map((bus, index) => (
                            <View key={bus._id || index}>
                                <Text style={styles.buttonText}>Bus {bus.busNumber} will arrive at {bus.timeOfArrival}</Text>
                            </View>
                        ))
                    ) : (
                        <Text>{message}</Text>
                    )}
                </TouchableOpacity> */}




                {fullRoute && dataSet && <>
                    <Text style={[styles.buttonInfoText, { color: 'blue', fontWeight: 'bold' }]}>Source to First Station</Text>
                    <Text style={styles.buttonInfoText}>Time: <Text style={{ fontWeight: 'normal' }}>{Math.round(dataSet.source.time)} min</Text>  Distance: <Text style={{ fontWeight: 'normal' }}>{(dataSet.source.distance).toFixed(1)} km </Text></Text>

                    {dataSet.middle.distance ?
                        (<>
                            <Text style={[styles.buttonInfoText, { color: 'green', fontWeight: 'bold' }]}>Estimated Intermediate Bus Journey Time</Text>
                            <Text style={styles.buttonInfoText}>Time: <Text style={{ fontWeight: 'normal' }}>{Math.round(dataSet.middle.time)} min</Text> Distance: <Text style={{ fontWeight: 'normal' }}>{(dataSet.middle.distance).toFixed(1)} km </Text></Text>
                        </>) : ""}

                    <Text style={[styles.buttonInfoText, { color: 'red', fontWeight: 'bold' }]}>Last Station to Destination</Text>
                    <Text style={styles.buttonInfoText}>Time: <Text style={{ fontWeight: 'normal' }}>{Math.round(dataSet.destination.time)} min</Text> Distance: <Text style={{ fontWeight: 'normal' }}>{(dataSet.destination.distance).toFixed(1)} km </Text></Text>
                </>}


                <TouchableOpacity style={styles.button} onPress={() => //navigation.navigate("StartRide")

                {
                    handleContinue()

                }

                }>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>

                {fullRoute && <FullSteps fullPath={routePath} styles={styles} />}
                {/* {!fullRoute && <RecentLocations styles={styles} />} */}

            </BottomSheetScrollView>
        </BottomSheet>
    );
}

export default BottomSheetContent;