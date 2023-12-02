import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const App = () => {
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
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
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
    <View>     
    <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
    <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
    <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
    <Button title="Close" onPress={handleClosePress} />
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
          {data.map(renderItem)}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 600,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

export default App;
