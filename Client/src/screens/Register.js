import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableWithoutFeedback } from "react-native-web";


export default Register = () => {
  const [isUserButtonPressed, setUserButtonPressed] = useState(false);
  const [UserarrowColor, setUserArrowColor] = useState("white");

  const handleUserButtonPress = () => {
    setUserButtonPressed(!isUserButtonPressed);
    setUserArrowColor(isUserButtonPressed ? "white" : "#40B59F");
    console.log('Enter Pressed!');
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          source={require('../../assets/regi.png')}
          style={styles.image}
        />
        </View>
        <Text style={styles.label}>Enter your phone</Text>
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/whatsappi.png')} style={styles.whatsappIcon} />
          <TextInput style={styles.inputStyle} placeholder="Your phone number" />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback
            onPressIn={handleUserButtonPress}
            onPressOut={handleUserButtonPress}
          >
            <View
              style={[
                styles.button,
                {
                  backgroundColor: isUserButtonPressed ? "white" : "#40B59F",
                  borderColor: isUserButtonPressed ? "#40B59F" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: isUserButtonPressed ? "#40B59F" : "white" },
                ]}
              >
                Enter
              </Text>
              <TouchableWithoutFeedback onPress={() => console.log("Arrow pressed!")}>
                <Image
                  source={require('../../assets/arrowwhite.png')}
                  style={[styles.smallIcon, { tintColor: UserarrowColor}]}
                />
              </TouchableWithoutFeedback>
              </View> 
      </TouchableWithoutFeedback>
      </View> 
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 430,
    height: 430,
    resizeMode: 'contain',
  },
  label: {
    marginTop: '5%',
    marginLeft: '10%',
    color: '#53BCAA',
    fontSize: 15,
    minWidth: 280,
    paddingBottom:'2%',
  },
  inputContainer: {
    alignSelf:'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#667080',
    minWidth: 280,
    paddingHorizontal: 13,
    paddingVertical: 13,
    borderRadius: 6,
    marginBottom: 18,
    width:'80%',
  },
  whatsappIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    marginVertical: 10,
    width: '85%',
    alignSelf: 'center',
    borderWidth: 2,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    flex: 1,
    marginLeft:'40%',
  },
});
