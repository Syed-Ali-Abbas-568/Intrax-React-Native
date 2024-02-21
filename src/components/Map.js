import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import LocationComponent from "./LocationComponent";

export default function Maps() {
  const [userLocation, setUserLocation] = useState({
    latitude: -34.603738,
    longitude: -58.38157,
  });

  const handleLocationChange = (location) => {
    // Update the user's location in the Maps component
    setUserLocation(location);
  };

  return (
    <>
      
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
