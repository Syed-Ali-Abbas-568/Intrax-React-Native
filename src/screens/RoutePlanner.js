import React, { useCallback, useRef, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import LocationComponent from "../components/LocationComponent";
import SearchBar from "../components/SearchBar";
import FindNearestStationButton from "../components/FindNearesetStationButton";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ANDRIOD_GOOGLE_API_KEY } from "../../keys";

const App = ({ navigation }) => {
  const [sourceLocation, setSourceLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [toggler, setToggler] = useState('');
  const handleLocationSelection = (location, type) => {
    if (type === "source") {
      setSourceLocation(location);
    } else if (type === "destination") {
      setDestinationLocation(location);
    }
  };

  const [closestStation, setClosestStation] = useState(null);
  const [stationArrivalInfo, setStationArrivalInfo] = useState({ distance: 0, druation: 0 });
  const handleStationUpdate = (station) => {
    setClosestStation(station);
  };

  const handleStationInfo = (stationInfo) => {
    setStationArrivalInfo(stationInfo);

  };


  const [sheetOpen, setSheetOpen] = useState(true)
  // hooks
  const sheetRef = useRef(null);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["20%", "80%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    setSheetOpen(index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    (item) => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );
  ///[{zIndex:1000},{position:"absolute"},{top:10,borderWidth:3}
  return (

    <View style={[{ flex: 1 }, { flexDirection: 'column' }]}>
      <LocationComponent closestStation={closestStation} onStationInfoUpdate={handleStationInfo} />
      <>
        <View style={styles.srcStyle}>
          <GooglePlacesAutocomplete
            placeholder="Source"
            query={{ key: ANDRIOD_GOOGLE_API_KEY }}
            fetchDetails={true}
            onPress={(data, details = null) => { console.log(details.geometry.location.lat, details.geometry.location.lng); setToggler(true) }}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no results')}

          />

        </View>
        {toggler && <View style={styles.dstStyle}>
          <GooglePlacesAutocomplete
            placeholder="Destination"
            query={{ key: ANDRIOD_GOOGLE_API_KEY }}
            fetchDetails={true}
            onPress={(data, details = null) => console.log(details.geometry.location.lat, details.geometry.location.lng)}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no results')}

          />

        </View>}

        <View style={[{ flexDirection: "column" }]}>
          <LocationComponent />
        </View>

        <View style={styles.container}>
          <BottomSheet
            ref={sheetRef}
            index={snapPoints.length - 1} // Set initial index to the last snap point
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            enableContentPanningGesture // Enable dragging the content itself
          >
            <BottomSheetScrollView
              contentContainerStyle={styles.contentContainer}
            >

              <View style={styles.userTab}>
                <Image source={require("../../assets/user2.png")}></Image>
                <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
                  <Text style={styles.nameStyle}>User Name</Text>
                </View>
              </View>



              <FindNearestStationButton onStationUpdate={handleStationUpdate} />



              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("StartRide")}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.arrival} >
                <Text style={styles.buttonText}>Distance to Station: {stationArrivalInfo.distance}km </Text>
                <Text style={styles.buttonText}>Estimated Arrival Time: {stationArrivalInfo.duration}min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.arrival} >
                <Text style={styles.buttonText}>Estimated Bus arrival: 12 Mins</Text>
              </TouchableOpacity>


              <View style={[{ paddingHorizontal: 20 }, { minWidth: '80%' }]}>
                <Text style={styles.recentStyle}>RECENT</Text>

                <View style={[{ flexDirection: "row" }]}>
                  <Image
                    source={require("../../assets/ic_place.png")}
                    style={{ alignSelf: "center" }}
                  ></Image>
                  <View
                    style={[
                      { flexDirection: "column" },
                      { margin: 20 },
                      { minWidth: "80%" },
                    ]}
                  >
                    <Text style={styles.stationStyle}>Railway Station</Text>
                    <Text style={styles.cityStyle}>Lahore</Text>
                  </View>
                </View>

                <View style={[{ flexDirection: "row" }]}>
                  <Image
                    source={require("../../assets/ic_place.png")}
                    style={{ alignSelf: "center" }}
                  ></Image>
                  <View
                    style={[
                      { flexDirection: "column" },
                      { margin: 20 },
                      { minWidth: "80%" },
                    ]}
                  >
                    <Text style={styles.stationStyle}>Railway Station</Text>
                    <Text style={styles.cityStyle}>Lahore</Text>
                  </View>
                </View>

                <View style={[{ flexDirection: "row" }]}>
                  <Image
                    source={require("../../assets/ic_place.png")}
                    style={{ alignSelf: "center" }}
                  ></Image>
                  <View
                    style={[
                      { flexDirection: "column" },
                      { margin: 20 },
                      { minWidth: "80%" },
                    ]}
                  >
                    <Text style={styles.stationStyle}>Railway Station</Text>
                    <Text style={styles.cityStyle}>Lahore</Text>
                  </View>
                </View>

                <View style={[{ flexDirection: "row" }]}>
                  <Image
                    source={require("../../assets/ic_place.png")}
                    style={{ alignSelf: "center" }}
                  ></Image>
                  <View
                    style={[
                      { flexDirection: "column" },
                      { margin: 20 },
                      { minWidth: "80%" },
                    ]}
                  >
                    <Text style={styles.stationStyle}>Railway Station</Text>
                    <Text style={styles.cityStyle}>Lahore</Text>
                  </View>
                </View>

                <View style={[{ flexDirection: "row" }]}>
                  <Image
                    source={require("../../assets/ic_place.png")}
                    style={{ alignSelf: "center" }}
                  ></Image>
                  <View
                    style={[
                      { flexDirection: "column" },
                      { margin: 20 },
                      { minWidth: "80%" },
                    ]}
                  >
                    <Text style={styles.stationStyle}>Railway Station</Text>
                    <Text style={styles.cityStyle}>Lahore</Text>
                  </View>
                </View>
              </View>
            </BottomSheetScrollView>
          </BottomSheet >
        </View >
      </>
    </View>);

};

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
    padding: 4
  },
  dstStyle: {
    zIndex: 1000,
    position: "absolute",
    top: 70,
    borderWidth: 1,
    width: "90%",
    borderColor: "#667080",
    marginLeft: 20,
    borderRadius: 15,
    padding: 4
  },
  container: {
    flex: 1,
    paddingTop: 700,
  },
  contentContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  bottomSheetContainer: {
    flex: 1,
    flexDirection: "row",
    minWidth: "80%",

    shadowColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    height: 125,
    marginBottom: 40,
    borderWidth: 1,
  },
  bottomSheetSubContainer: {
    flexDirection: "row",
    margin: 10,
  },
  label: {
    color: "#667080",
    fontSize: 18,
    alignSelf: "center",
  },
  inputStyle: {
    minWidth: "50%",
    flexDirection: "row",
    fontSize: 18,
    color: "#667080",
  },
  horRule: {
    borderBottomColor: "#667080",
    borderBottomWidth: 1,
    minWidth: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  userTab: {
    flexDirection: "row",
    width: "60%",
    alignSelf: "center",
    height: 36,
    borderColor: "#667080",
    borderWidth: 1,
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "#E5E5E58A",
    borderRadius: 24,
    paddingHorizontal: 10,
  },
  nameStyle: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "500",
  },

  nearestLocStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 40,
  },
  recentStyle: {
    color: "#97ADB6",
    fontSize: 13,
    fontWeight: "700",
    maxWidth: "80%",
    alignSelf: "flex-start",
    marginBottom: 40,
  },
  stationStyle: {
    color: "#352555",
    fontSize: 15,
    fontWeight: "600",
  },
  cityStyle: {
    color: "#97ADB6",
    fontSize: 13,
    fontWeight: "600",
    height: 30,
    borderBottomColor: "#97ADB6",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "#40B59F",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: "80%",
    marginBottom: 40,
  },
  buttonText: {
    color: "white",
  },
  arrival: {
    backgroundColor: "#352555",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: "80%",
    marginBottom: 40,
  },
});

export default App;
