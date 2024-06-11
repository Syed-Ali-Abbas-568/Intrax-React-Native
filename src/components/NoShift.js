import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoShift = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.boldGreen}>Hello Mr. <Text style={styles.italic}>{props.name}</Text></Text>
            <Text style={styles.normalText}>Currently you have not been assigned a shift. Please wait patiently and the administrator will assign you one.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
    },
    boldGreen: {
        fontWeight: 'bold',
        color: 'limegreen',
        fontSize: 24, // h2 size
    },
    normalText: {
        fontSize: 18, // h4 size
    },
    italic: {
        fontStyle: 'italic',
        marginRight: 4, // Add spacing between name and surrounding text
    },
});

export default NoShift;
