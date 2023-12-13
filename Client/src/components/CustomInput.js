import React from "react";

import { Text, View, TextInput, StyleSheet } from "react-native";


const CustomInput = ({ labeltext, displaytext }) => {

    return (

        <View style={styles.container}>
            <Text style={styles.heading}>{labeltext}</Text>
            <TextInput
                style={styles.input}
                placeholder={displaytext}
            />
        </View>

    )

}




const styles = StyleSheet.create({

    container: {
        flexDirection: "column",
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 19
    },
    input: {
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#A9A9A9',
        padding: 10,
        fontSize: 14
    },
    heading:
    {
        fontSize: 14,
        color: '#000',
        paddingBottom: 2,
        fontWeight: 'bold'
    }
})

export default CustomInput