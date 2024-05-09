import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Switch } from "react-native";
import BottomSheet, { BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
//import Maps from "../components/Maps";
import SearchBar from "../components/SearchBar";
import LocationComponent from "../components/LocationComponent";


const App = ({ route, navigation, responseData }) => {

  // const response = route.params.responseData
  // const [sheetOpen, setSheetOpen] = useState(true)
  // const [isActive, setIsActive] = useState(false); // State variable for toggle switch
  // // hooks
  // const sheetRef = useRef(null);

  // // variables
  // const data = useMemo(
  //   () =>
  //     Array(50)
  //       .fill(0)
  //       .map((_, index) => `index-${index}`),
  //   []
  // );
  // const snapPoints = useMemo(() => ["45%", "90%"], []);

  // // callbacks
  // const handleSheetChange = useCallback((index) => {
  //   setSheetOpen(index);
  // }, []);
  // const handleSnapPress = useCallback((index) => {
  //   sheetRef.current?.snapToIndex(index);
  // }, []);
  // const handleClosePress = useCallback(() => {
  //   sheetRef.current?.close();
  // }, []);

  // // render
  // const renderItem = useCallback(
  //   (item) => (
  //     <View key={item} style={styles.itemContainer}>
  //       <Text>{item}</Text>
  //     </View>
  //   ),
  //   []
  // );

  // // Function to handle toggle switch change
  // const toggleSwitch = () => {
  //   setIsActive(previousState => !previousState); // Toggle isActive state
  // };




  return (
    <View>

      <Text>response.data</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 700,

  },
  contentContainer: {
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  bottomSheetContainer: {
    flex: 1,
    flexDirection: 'row',
    minWidth: "80%",

    shadowColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: 125,
    marginBottom: 40,
    borderWidth: 1
  },
  bottomSheetSubContainer: {
    flexDirection: 'row',
    margin: 10

  },
  label: {
    color: "#667080",
    fontSize: 18,
    alignSelf: 'center'


  },
  inputStyle: {


    minWidth: '50%',
    flexDirection: "row",
    fontSize: 18,
    color: '#667080'


  },
  horRule: {
    borderBottomColor: "#667080",
    borderBottomWidth: 1,
    minWidth: '70%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userTab: {
    flexDirection: 'row',
    width: "60%",
    alignSelf: 'center',
    height: 36,
    borderColor: "#667080",
    borderWidth: 1,
    marginBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: '#E5E5E58A',
    borderRadius: 24,
    paddingHorizontal: 10

  },
  nameStyle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500'
  },

  nearestLocStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 40

  },
  recentStyle: {
    color: '#97ADB6',
    fontSize: 13,
    fontWeight: '700',
    maxWidth: '80%',
    alignSelf: 'flex-start',
    marginBottom: 40

  },
  stationStyle: {
    color: '#352555',
    fontSize: 15,
    fontWeight: '600'

  },
  cityStyle: {
    color: '#97ADB6',
    fontSize: 13,
    fontWeight: '600',
    height: 30,
    borderBottomColor: '#97ADB6',
    borderBottomWidth: 1,

  },
  button: {
    backgroundColor: "#40B59F",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: "80%",
    marginBottom: 40
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
    marginBottom: 40
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Align to the right
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  toggleLabel: {
    fontSize: 18,
    marginRight: 10, // Add some margin to separate the label and the switch
  },
});

export default App;
