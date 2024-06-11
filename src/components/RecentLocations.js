import React from 'react';
import { View, Text, Image } from 'react-native';

const RecentLocations = ({ styles }) => (
    <View style={[{ paddingHorizontal: 20 }, { minWidth: '80%' }]}>
        <Text style={styles.recentStyle}>RECENT</Text>

        {[...Array(5)].map((_, index) => (
            <View key={index} style={[{ flexDirection: "row" }]}>
                <Image
                    source={require("../../assets/ic_place.png")}
                    style={{ alignSelf: "center" }}
                ></Image>
                <View style={[{ flexDirection: "column" }, { margin: 20 }, { minWidth: "80%" }]}>
                    <Text style={styles.stationStyle}>Railway Station</Text>
                    <Text style={styles.cityStyle}>Lahore</Text>
                </View>
            </View>
        ))}
    </View>
);

export default RecentLocations;