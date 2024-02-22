import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableWithoutFeedback, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default LoginAs = ({navigation}) => {
  const [isUserButtonPressed, setUserButtonPressed] = useState(false);
  const [isCaptainButtonPressed, setCaptainButtonPressed] = useState(false);
  const [userIconColor, setUserIconColor] = useState("white");
  const [captainIconColor, setCaptainIconColor] = useState("#40B59F");
  const [UserarrowColor, setUserArrowColor] = useState("white");
  const [CaptainarrowColor, setCaptainArrowColor] = useState("#40B59F");

  const handleUserButtonPress = () => {
    setUserButtonPressed(!isUserButtonPressed);
    setCaptainButtonPressed(false);
    setUserIconColor(isUserButtonPressed ? "white" : "#40B59F");
    setUserArrowColor(isUserButtonPressed ? "white" : "#40B59F");
    console.log('User Button Pressed!');
    navigation.navigate('Register')
  };

  const handleCaptainButtonPress = () => {
    setUserButtonPressed(false);
    setCaptainButtonPressed(!isCaptainButtonPressed);
    setCaptainIconColor(isCaptainButtonPressed ? "#40B59F" : "white");
    setCaptainArrowColor(isCaptainButtonPressed ? "#40B59F" : "white");
    console.log('Captain Button Pressed!');
    navigation.navigate('CaptainSignin')
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <ImageBackground
            source={require('../../assets/LoginAsi.png')}
            style={styles.backgroundImage}
          >

            <View style={styles.overlayContent}>
            </View>
          </ImageBackground>
          <Text style={styles.amText}>I am a</Text>

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
                <Image
                  source={require('../../assets/user.png')}
                  style={[styles.icon, { tintColor: userIconColor }]}
                />
                <Text
                  style={[
                    styles.buttonText,
                    { color: isUserButtonPressed ? "#40B59F" : "white" },
                  ]}
                >
                  User
                </Text>
                <TouchableWithoutFeedback onPress={() => console.log("Arrow pressed!")}>
                  <Image
                    source={require('../../assets/arrowwhite.png')}
                    style={[styles.smallIcon, { tintColor: UserarrowColor }]}
                  />
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPressIn={handleCaptainButtonPress}
              onPressOut={handleCaptainButtonPress}
            >
              <View
                style={[
                  styles.button,
                  {
                    backgroundColor: isCaptainButtonPressed ? "#40B59F" : "white",
                    borderColor: isCaptainButtonPressed ? "#40B59F" : "#40B59F",
                  },
                ]}
              >
                <Image
                  source={require('../../assets/captain.png')}
                  style={[styles.icon, { tintColor: captainIconColor }]}
                />
                <Text
                  style={[
                    styles.buttonText,
                    { color: isCaptainButtonPressed ? "white" : "#40B59F" },
                  ]}
                >
                  Captain
                </Text>
                <TouchableWithoutFeedback onPress={() => console.log("Arrow pressed!")}>
                  <Image
                    source={require('../../assets/arrowgreen.png')}
                    style={[styles.smallIcon, { tintColor: CaptainarrowColor }]}
                  />
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: '5%',
  },
  backgroundImage: {
    flex: 1,
  },
  overlayContent: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '115%',
  },
  amText: {
    fontStyle: 'italic',
    color: '#352555',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
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
    width: '70%',
    alignSelf: 'center',
    borderWidth: 2,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    flex: 1,
    marginLeft: '20%',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  smallIcon: {
    width: 10,
    height: 10,
  },
});
