import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

const LocationComponent = ({ onLocationChange, closestStation, onStationInfoUpdate,source,destination }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [previousDest, setPreviousDest] = useState(null);

  useEffect(() => {
    if (destination !== undefined&&destination !== null) {
      // Update previousDest only if destination is defined
      setPreviousDest(destination);
    } 
  }, [destination]);
 


  const [stationInfo, setStationInfo] = useState(null);
  const apiKey = "AIzaSyDRRMtathJaJoAfGPMtQ8dztAZxl2Dl_Vs";

 


  //Hardcoded List of Stations this will be changed to to reterive stations form databases

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

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          ref={c => this.mapView = c}
        >
          {closestStation && (
            <MapViewDirections
              origin={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
              destination={{ latitude: closestStation.latitude, longitude: closestStation.longitude }}
              apikey={apiKey}
              strokeWidth={3}
              strokeColor="#40B59F"

              onReady={result => {
                console.log(`Distance: ${result.distance} km`)
                console.log(`Duration: ${result.duration} min.`)

                onStationInfoUpdate({ distance: result.distance.toFixed(2), duration: result.duration.toFixed(0) })

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (width / 20),
                    bottom: (height / 20),
                    left: (width / 20),
                    top: (height / 20),
                  }
                });
              }}
              onError={(errorMessage) => {
                console.log('GOT AN ERROR');
              }}

            />
          )}

          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            description="You are here!"
          />

          {stations.map((station, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: station.latitude,
                longitude: station.longitude,
              }}
              title={station.title}
              description={station.description}
            >
              {/* Custom bus icon for the marker */}
              <Image
                source={require('../../assets/finish.png')}
                style={{ width: 40, height: 40 }} // Adjust the size as needed
              />
            </Marker>
          ))}

          {/*Source Destination Plot*/}
        
           { source&&(<Marker
              coordinate={{
                latitude: source.latitude,
                longitude: source.longitude,
              }}
              title={source.title}
              description={source.description}
            >
             
              <Image
                source={require('../../assets/src_dest.png')}
                style={{ width: 40, height: 40 }} // Adjust the size as needed
              />
            </Marker>)
          }
          {console.log("This is child destination",previousDest)}
          {previousDest&&(<Marker
              coordinate={{
                latitude: previousDest.latitude,
                longitude: previousDest.longitude,
              }}
              title={previousDest.title}
              description={`previousDest.description+${previousDest.latitude}`}
            >
             
              <Image
                source={require('../../assets/src_dest.png')}
                style={{ width: 40, height: 40 }} // Adjust the size as needed
              />
            </Marker>)
          }
         { /*<Marker
              coordinate={{
                latitude: 31.4216463,
                longitude: 74.3653453,
              }}
              title= "Destination"
              description= "This is your destination location."
            >
             
              <Image
                source={require('../../assets/src_dest.png')}
                style={{ width: 40, height: 40 }} // Adjust the size as needed
              />
            </Marker>*/
}
         

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
    height: 500,
    width: 500

  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationComponent;
