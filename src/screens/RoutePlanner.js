import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import LocationInput from "../components/LocationInput";
import BottomSheetContent from "../components/BottomSheetContent";
import LocationComponent from "../components/LocationComponent";
import { useEffect } from "react";


import { useRoute } from '@react-navigation/native';
import { getAllStations, getAllRoutes } from "../services/captainapi";


import findNearestStations from "../helpers/stationCalculation";
import findPath from "../helpers/hopCalculater";



const App = ({ navigation }) => {
  const route = useRoute();
  const { responseData } = route.params;

  const [sourceLocation, setSourceLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [showDestinationInput, setShowDestinationInput] = useState(false);
  const [closestStation, setClosestStation] = useState(null);
  const [stationArrivalInfo, setStationArrivalInfo] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(true);

  const [staitonID, setStationID] = useState("")

  const [data, setDataSet] = useState({

    source: { distance: 0, time: 0 },
    middle: {
      distance: 0, time: 0
    },
    destination: { distance: 0, time: 0 }


  })

  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ["65%", "65%"], []);

  //State to get station data of all stations instead of dummy
  const [stationList, setStationList] = useState([])

  //States to handle all routes
  const [routes, setRoutes] = useState([])


  //Full Route
  const [fullRoute, setFullRoute] = useState(false)
  const [routePath, setRoutePath] = useState(null)
  const [coordinatePath, setCoordinatePath] = useState(null)




  const handleSheetChange = useCallback((index) => {
    setSheetOpen(index);
  }, []);

  const handleLocationSelection = (location, type) => {
    if (type === "source") {
      setSourceLocation(location);
    } else if (type === "destination") {
      setDestinationLocation(location);


      //console.log("Source", sourceLocation, "Destination", destinationLocation)
    }
  };

  const handleStationUpdate = (station) => {
    setClosestStation(station);
  };

  const handleStationInfo = (stationInfo) => {
    setStationArrivalInfo(stationInfo);
  };


  const handleContinue = () => {

    //We have to find nearest Station to both location and destination
    //console.log("WHy is this workign?")
    const nearestSource = findNearestStations(sourceLocation, stationList)
    const nearestDestination = findNearestStations(destinationLocation, stationList)





    //We have to get all route information 

    const path = findPath(routes, nearestSource.station._id, nearestDestination.station._id)//stations id?

    if (path) {
      setFullRoute(true)
      console.log("Path Found")

      setRoutePath(path)
      //console.log(path)
      //console.log(nearestSource, nearestDestination)
      path.forEach((step, index) => {
        console.log(`Step ${index + 1}: Station ${step.station} ${step.route ? `(Switch to route ${step.route})` : ''}`);
      });



      //step.station ==id

      //stationlist={

      //   {
      //     _id:
      //     name:
      //     lat:
      //     long:

      //   },{ _id:
      //     name:
      //     lat:
      //     long:},

      // }


      // Extract station IDs from the path array
      const pathStationIDs = path.map(item => item.station);


      const fullRouteData = stationList
        .filter(station => pathStationIDs.includes(station._id)) // Filter stations present in path
        .map(station => ({ latitude: station.latitude, longitude: station.longitude })); // Extract latitude and longitude

      //first

      fullRouteData.unshift({ latitude: sourceLocation.latitude, longitude: sourceLocation.longitude })

      //end
      fullRouteData.push({ latitude: destinationLocation.latitude, longitude: destinationLocation.longitude })

      console.log(fullRouteData)
      setCoordinatePath(fullRouteData)


    }
    else {
      alert("No Path Found")
      console.log("No Path Found")
    }





  }







  const getRouteData = async () => {
    try {
      const r = await getAllRoutes();
      setRoutes(r)


    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };


  const handleFeedBack = () => {



    // navigation.navigate({

    //   routes: [{ name: 'Feedback', params: { responseData: responseData } }],
    // })
    setFullRoute(false)
    navigation.navigate('Feedback', { responseData: responseData });
  }





  const getStationData = async () => {
    try {
      const stationData = await getAllStations();
      setStationList(stationData)
      // console.log(stationList)

    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };


  useEffect(() => {

    getRouteData();
    getStationData()

  }, []);



  return (
    <View style={[{ flex: 1 }, { flexDirection: 'column' }]}>
      <LocationComponent
        style={styles.mapStyle}
        closestStation={closestStation}
        onStationInfoUpdate={handleStationInfo}
        source={sourceLocation}
        destination={destinationLocation}
        stationList={stationList}
        displayFullRoute={fullRoute}
        fullRouteData={coordinatePath}
        setDataSet={setDataSet}
      />

      {!fullRoute &&
        <LocationInput
          type="source"
          onLocationSelect={handleLocationSelection}
          showDestinationInput={showDestinationInput}
          setShowDestinationInput={setShowDestinationInput}
          styles={styles}
        />

      }
      {!fullRoute && showDestinationInput && (
        <LocationInput
          type="destination"
          onLocationSelect={handleLocationSelection}
          showDestinationInput={showDestinationInput}
          setShowDestinationInput={setShowDestinationInput}
          styles={styles}
        />
      )}
      <View style={styles.container}>
        {console.log("Station list before", stationList)}
        <BottomSheetContent
          //stationID={stationID}
          dataSet={data}
          responseData={responseData}
          sheetRef={sheetRef}
          snapPoints={snapPoints}
          handleSheetChange={handleSheetChange}
          stationArrivalInfo={stationArrivalInfo}
          handleStationUpdate={handleStationUpdate}
          navigation={navigation}
          styles={styles}

          handleContinue={!fullRoute ? handleContinue : handleFeedBack}
          fullRoute={fullRoute}
          routePath={routePath}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({


  mapStyle: {
    //flex: 0.5,


  }
  ,
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
    //flex: 1,
    bottom: 0,
    left: 0,
    right: 0,



    height: "50%",
    zIndex: -200,

    position: "relative"
  },

  holder: {

    zIndex: 5000,

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
    marginTop: 10
  },


  buttonInfoText: {

    color: "black",
    fontWeight: "600"
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