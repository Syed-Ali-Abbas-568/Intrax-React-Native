import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Maps from "../components/MapsToBeDeleted";
import SearchBar from "../components/SearchBar";


const App = ({ navigation }) => {


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
  const snapPoints = useMemo(() => ["45%", "90%"], []);

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

  return (
    <View>
      <View style={[{ flex: 1 }, { flexDirection: 'column' }]}>
        <Maps />
      </View>


      <View style={styles.container}>

        <BottomSheet
          ref={sheetRef}
          index={snapPoints.length - 1} // Set initial index to the last snap point
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enableContentPanningGesture // Enable dragging the content itself
        >
          <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>


            {sheetOpen ? <><View style={styles.userTab}>
              <Image source={require("../../assets/user2.png")} ></Image>
              <View style={[{ flex: 1 }, { flexDirection: 'column' }]}>
                <Text style={styles.nameStyle}>User Name</Text>
              </View>
            </View>
              <View style={[styles.bottomSheetContainer]}>

                <Image source={require("../../assets/from_to.png")} style={{ alignSelf: 'center' }}></Image>
                <View style={[{ flexDirection: 'column' }]}>
                  <View style={styles.bottomSheetSubContainer}>



                    <Text style={styles.label}>From : </Text>
                    <BottomSheetTextInput style={styles.inputStyle} />
                  </View>
                  <View style={styles.horRule} />
                  <View style={styles.bottomSheetSubContainer}>

                    <Text style={styles.label}>To :      </Text>
                    <BottomSheetTextInput style={styles.inputStyle} />
                  </View>
                </View>


              </View></> : <SearchBar />}

            <View style={styles.nearestLocStyle} >
              <Image source={require("../../assets/ic_loc.png")} ></Image>
              <View  >
                <Text style={styles.label}>Find Nearest Station</Text>
              </View>
            </View>



            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StartRide')}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.arrival} >
              <Text style={styles.buttonText}>Estimated Bus arrival: 12 Mins</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.arrival} >
              <Text style={styles.buttonText}>Estimated Bus arrival: 12 Mins</Text>
            </TouchableOpacity>

            <View style={[{ paddingHorizontal: 20 }, { minWidth: '80%' }]}>
              <Text style={styles.recentStyle}>RECENT</Text>

              <View style={[{ flexDirection: 'row' }]}>
                <Image source={require("../../assets/ic_place.png")} style={{ alignSelf: 'center' }}></Image>
                <View style={[{ flexDirection: 'column' }, { margin: 20 }, { minWidth: '80%' }]}>
                  <Text style={styles.stationStyle}>Railway Station</Text>
                  <Text style={styles.cityStyle}>Lahore</Text>
                </View>
              </View>

              <View style={[{ flexDirection: 'row' }]}>
                <Image source={require("../../assets/ic_place.png")} style={{ alignSelf: 'center' }}></Image>
                <View style={[{ flexDirection: 'column' }, { margin: 20 }, { minWidth: '80%' }]}>
                  <Text style={styles.stationStyle}>Railway Station</Text>
                  <Text style={styles.cityStyle}>Lahore</Text>
                </View>
              </View>

              <View style={[{ flexDirection: 'row' }]}>
                <Image source={require("../../assets/ic_place.png")} style={{ alignSelf: 'center' }}></Image>
                <View style={[{ flexDirection: 'column' }, { margin: 20 }, { minWidth: '80%' }]}>
                  <Text style={styles.stationStyle}>Railway Station</Text>
                  <Text style={styles.cityStyle}>Lahore</Text>
                </View>
              </View>


              <View style={[{ flexDirection: 'row' }]}>
                <Image source={require("../../assets/ic_place.png")} style={{ alignSelf: 'center' }}></Image>
                <View style={[{ flexDirection: 'column' }, { margin: 20 }, { minWidth: '80%' }]}>
                  <Text style={styles.stationStyle}>Railway Station</Text>
                  <Text style={styles.cityStyle}>Lahore</Text>
                </View>
              </View>

              <View style={[{ flexDirection: 'row' }]}>
                <Image source={require("../../assets/ic_place.png")} style={{ alignSelf: 'center' }}></Image>
                <View style={[{ flexDirection: 'column' }, { margin: 20 }, { minWidth: '80%' }]}>
                  <Text style={styles.stationStyle}>Railway Station</Text>
                  <Text style={styles.cityStyle}>Lahore</Text>
                </View>
              </View>

            </View>


          </BottomSheetScrollView>
        </BottomSheet>
      </View>
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
  }
});

export default App;
/**
 ,{borderWidth:1},{borderColor:'black'}
 */