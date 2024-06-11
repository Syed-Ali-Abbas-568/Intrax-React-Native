import React from 'react';
import { View, Text, Image } from 'react-native';

const UserDetails = ({ styles }) => (
    <View style={styles.userTab}>
        <Image source={require("../../assets/user2.png")}></Image>
        <View style={[{ flex: 1 }, { flexDirection: "column" }]}>
            <Text style={styles.nameStyle}>User Name</Text>
        </View>
    </View>
);

export default UserDetails;