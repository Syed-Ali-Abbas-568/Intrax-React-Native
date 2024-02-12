import React, { } from "react";
import { StyleSheet, View, Text, Pressable, Image, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StartRide = ({ navigation }) => {


    return (

        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/active_state.png')}
                style={styles.backgroundImage}
            >

                <View style={styles.bottomsheet}>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttontext} onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'Feedback' }],
                        })}>Start Ride</Text>
                    </Pressable>
                    <Pressable style={styles.ride}>



                        <Image style={styles.picture}
                            source={require('../../assets/finish.png')} />


                        <Text style={styles.destinationBold}>Next Stop:</Text>
                        <Text style={styles.destination}> XYZ Station</Text>

                    </Pressable>

                </View>
            </ImageBackground>


        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "stretch",
        flexDirection: 'column-reverse'


    },
    bottomsheet:
    {
        flex: 0.25,
        borderTopLeftRadius: 32, // Only top-left corner rounded
        borderTopRightRadius: 32, // Only top-right corner rounded

        backgroundColor: "#FFFFFF",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 15,
        shadowOpacity: 1,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: "rgba(151, 173, 182, 0.6)"


    },
    buttontext: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '700',
        justifyContent: 'center',
        textAlign: 'center',
        marginVertical: 8

    },
    button: {
        marginTop: 35,
        backgroundColor: '#40B59F',
        borderRadius: 10,
        marginHorizontal: 40,
        height: 40,
    },
    ride:
    {

        flexDirection: 'row',
        justifyContent: 'center', // Adjust as needed (space-around, space-evenly, etc.)
        width: '70%', // Adjust the width of the row as needed
        alignItems: 'center',
        alignSelf: 'center'



    },
    destinationBold:
    {
        fontSize: 16,
        fontWeight: 'bold',

    },
    destination:
    {
        fontSize: 16,
    },
    picture:
    {
        marginTop: 5
    }


});

export default StartRide;
