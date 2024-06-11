// /App.js
import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import LocationInput from "../components/LocationInput";
import BottomSheetContent from "../components/BottomSheetContent";
import LocationComponent from "../components/LocationComponent";

const App = ({ navigation }) => {
  const [sourceLocation, setSourceLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [showDestinationInput, setShowDestinationInput] = useState(false);
  const [closestStation, setClosestStation] = useState(null);
  const [stationArrivalInfo, setStationArrivalInfo] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(true);

  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ["30%", "80%"], []);

  const handleSheetChange = useCallback((index) => {
    setSheetOpen(index);
  }, []);

  const handleLocationSelection = (location, type) => {
    if (type === "source") {
      setSourceLocation(location);
    } else if (type === "destination") {
      setDestinationLocation(location);
    }
  };

  const handleStationUpdate = (station) => {
    setClosestStation(station);
  };

  const handleStationInfo = (stationInfo) => {
    setStationArrivalInfo(stationInfo);
  };

  return (
    <View style={[{ flex: 1 }, { flexDirection: 'column' }]}>
      <LocationComponent
        closestStation={closestStation}
        onStationInfoUpdate={handleStationInfo}
        source={sourceLocation}
        destination={destinationLocation}
      />
      <LocationInput
        type="source"
        onLocationSelect={handleLocationSelection}
        showDestinationInput={showDestinationInput}
        setShowDestinationInput={setShowDestinationInput}
        styles={styles}
      />
      {showDestinationInput && (
        <LocationInput
          type="destination"
          onLocationSelect={handleLocationSelection}
          showDestinationInput={showDestinationInput}
          setShowDestinationInput={setShowDestinationInput}
          styles={styles}
        />
      )}
      <View style={styles.container}>
        <BottomSheetContent
          sheetRef={sheetRef}
          snapPoints={snapPoints}
          handleSheetChange={handleSheetChange}
          stationArrivalInfo={stationArrivalInfo}
          handleStationUpdate={handleStationUpdate}
          navigation={navigation}
          styles={styles}
        />
      </View>
    </View>
  );
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