import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

import { getAllBuses } from '../services/captainapi';

const { width, height } = Dimensions.get('window');

const LocationComponent = ({
  //setStationID,
  liveMode,

  setDataSet,
  onLocationChange,
  closestStation,
  onStationInfoUpdate,
  source,
  destination,
  stationList,
  displayFullRoute,    // New prop for controlling route display
  fullRouteData        // New prop containing route coordinates
}) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [buses, setBuses] = useState({ display: false, busData: null });

  const mapViewRef = useRef(null);
  const apiKey = "AIzaSyDRRMtathJaJoAfGPMtQ8dztAZxl2Dl_Vs";




  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);



  // useEffect(() => {
  //   (async () => {


  //     if (liveMode) {
  //       // Start tracking the user's location in live mode
  //       Location.watchPositionAsync(
  //         {
  //           accuracy: Location.Accuracy.High,
  //           timeInterval: 1000, // Update every second
  //           distanceInterval: 5  // Update every 5 meters
  //         },
  //         newLocation => {
  //           setLocation(newLocation);
  //           updateRouteAndStation(newLocation.coords);
  //         }
  //       );
  //     }
  //   })();
  // }, [liveMode]);




  // const updateRouteAndStation = (userLocation) => {
  //   if (!fullRouteData || fullRouteData.length < 2) return;

  //   const waypoints = fullRouteData.slice(currentStationIndex + 1);
  //   const nextStation = fullRouteData[currentStationIndex + 1];

  //   if (waypoints.length > 0) {
  //     const [currentLat, currentLng] = [userLocation.latitude, userLocation.longitude];
  //     const [nextLat, nextLng] = [nextStation.latitude, nextStation.longitude];
  //     const distanceToNextStation = getDistance(currentLat, currentLng, nextLat, nextLng);

  //     // If the user is within 50 meters of the next station, update to the next one
  //     if (distanceToNextStation < 0.05) {
  //       setCurrentStationIndex(currentStationIndex + 1);
  //       setStationID(nextStation.stationID); // Update the next upcoming station ID
  //     }
  //   }
  // };








  useEffect(() => {
    const intervalId = setInterval(() => {
      getBusData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  async function getBusData() {
    try {
      const busData = await getAllBuses();
      if (JSON.stringify(busData) !== JSON.stringify(buses.busData)) {
        setBuses({ display: true, busData });
      }
    } catch (err) {
      console.log("Error getting bus data", err);
    }
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          ref={mapViewRef}
        >
          {!displayFullRoute && closestStation && (
            <MapViewDirections
              origin={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
              destination={{ latitude: closestStation.station.latitude, longitude: closestStation.station.longitude }}
              apikey={apiKey}
              strokeWidth={3}
              strokeColor="#40B59F"
              onReady={result => {
                onStationInfoUpdate({ distance: result.distance.toFixed(2), duration: result.duration.toFixed(0) });
                mapViewRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: { right: width / 20, bottom: height / 20, left: width / 20, top: height / 20 },
                });
              }}
              onError={errorMessage => console.log('Error:', errorMessage)}
            />
          )}

          {displayFullRoute && fullRouteData && fullRouteData.length > 1 && (
            <>
              {/* Route from source to first waypoint */}
              <MapViewDirections
                origin={fullRouteData[0]}
                destination={fullRouteData[1]} // Set the destination as the first waypoint
                apikey={apiKey}
                strokeWidth={3}
                strokeColor="#00ffff" // Green color for this segment
                onReady={result => {

                  setDataSet(prev => ({ ...prev, source: { distance: result.distance, time: result.duration } }))
                  //console.log(`Route from source to first waypoint - Distance: ${result.distance} km`);
                  //console.log(`Route from source to first waypoint - Duration: ${result.duration} min`);

                  // Fit map to this segment
                  mapViewRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: { right: width / 20, bottom: height / 20, left: width / 20, top: height / 20 },
                  });
                }}
                onError={errorMessage => console.log('Error calculating route from source to first waypoint:', errorMessage)}
              />
              {/* Waypoints */}
              <MapViewDirections
                origin={fullRouteData[1]} // Second index as the source
                destination={fullRouteData[fullRouteData.length - 2]} // Second last index as the destination
                waypoints={fullRouteData.slice(2, -2)} // All the points in between as waypoints
                apikey={apiKey}
                strokeWidth={3}
                strokeColor="#00ff00" // Green color for the route
                onReady={result => {
                  setDataSet(prev => ({
                    ...prev,
                    middle: { distance: result.distance, time: result.duration }
                  }));

                  //  console.log(`Route distance: ${result.distance} km`);
                  // console.log(`Route duration: ${result.duration} min`);

                  mapViewRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: { right: width / 20, bottom: height / 20, left: width / 20, top: height / 20 },
                  });
                }}
                onError={errorMessage => console.log('Error calculating route:', errorMessage)}
              />
              {/* Route from last waypoint to destination */}
              <MapViewDirections
                origin={fullRouteData[fullRouteData.length - 2]} // Set origin as the last but one waypoint
                destination={fullRouteData[fullRouteData.length - 1]} // Set the destination as the actual destination
                apikey={apiKey}
                strokeWidth={3}
                strokeColor="#ff0000" // Red color for this segment
                onReady={result => {
                  // console.log(`Route from last waypoint to destination - Distance: ${result.distance} km`);
                  //console.log(`Route from last waypoint to destination - Duration: ${result.duration} min`);
                  // Fit map to this segment
                  setDataSet(prev => ({
                    ...prev,
                    destination: { distance: result.distance, time: result.duration }
                  }));

                  mapViewRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: { right: width / 20, bottom: height / 20, left: width / 20, top: height / 20 },
                  });
                }}
                onError={errorMessage => console.log('Error calculating route from last waypoint to destination:', errorMessage)}
              />
            </>
          )}


          {stationList && stationList.map((station, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: station.latitude, longitude: station.longitude }}
              title={station.name}
              description={station.description}
            >
              <Image source={require('../../assets/finish.png')} style={{ width: 40, height: 40 }} />
            </Marker>
          ))}

          {source && (
            <Marker coordinate={{ latitude: source.latitude, longitude: source.longitude }} title={source.title} description={source.description}>
              <Image source={require('../../assets/src_dest.gif')} style={{ width: 40, height: 40 }} />
            </Marker>
          )}
          {destination && (
            <Marker coordinate={{ latitude: destination.latitude, longitude: destination.longitude }} title={destination.title} description={destination.description}>
              <Image source={require('../../assets/src_dest.gif')} style={{ width: 40, height: 40 }} />
            </Marker>
          )}

          {buses.display && buses.busData && buses.busData.map(bus => (
            <Marker
              key={bus._id}
              coordinate={{ latitude: bus.latitude, longitude: bus.longitude }}
              title={bus.busNumber}
              description={bus.licensePlateNumber}
            >
              <Image source={require('../../assets/bus.png')} style={{ width: 30, height: 30 }} />
            </Marker>
          ))}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    //flex: 1,
    height: 482
    // marginBottom: "30%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationComponent;
