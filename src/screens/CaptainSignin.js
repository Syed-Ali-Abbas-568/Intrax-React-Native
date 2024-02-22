// Import necessary components and modules
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Switch // Import Switch component
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { loginCaptain } from "../services/captainapi";

const CaptainSignin = ({navigation}) => {
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Function to handle email change
  const onEmailChange = (text) => {
    setEmail(text);
  };

  // Function to handle password change
  const onPasswordChange = (text) => {
    setPassword(text);
  };

  // Function to toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  // Function to handle captain login
  const loginCaptainDetails = async () => {
    try {
      const response = await loginCaptain(email, password);
      if (response.error !== "No captain found.") {
        navigation.reset({
          index: 0,
          routes: [{ name: 'RoutePlannerCaptain', params:  {responseData: response }}]
        });
      } else {
        setError("Email or Password is incorrect.");
      }
    } catch {
      console.log('Something is wrong.');
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Text style={styles.textStyle}>SignIn</Text>

          <Text style={styles.textStyle}>Hello Captain!</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            placeholder="Enter Email"
            style={styles.inputStyle}
            onChangeText={onEmailChange}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputStyle}>
            <TextInput
              value={password}
              secureTextEntry={!showPassword}
              placeholder="Enter Password"
              style={{ flex: 1 }}
              onChangeText={onPasswordChange}
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
              onPress={toggleShowPassword}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={loginCaptainDetails}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <View style={[{ justifyContent: 'center' }, { alignItems: 'center' }, { marginTop: "5%" }]}>{error && <Text style={{ color: 'red' }}>{error}</Text>}</View>

        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  inputStyle: {
    borderWidth: 2,
    borderColor: "#667080",
    minWidth: 280,
    paddingHorizontal: 13,
    paddingVertical: 13,
    borderRadius: 6,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 30,
    minWidth: 280,
    marginBottom: 20,
  },
  label: {
    color: "#667080",
    fontSize: 14,
    minWidth: 280,
  },
  button: {
    backgroundColor: "#40B59F",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
  },
  buttonText: {
    color: "white",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Align the toggle switch to the right
    alignItems: "center",
    marginBottom: 20,
  },
  toggleLabel: {
    marginRight: 10,
    color: "#667080",
    fontSize: 14,
    minWidth: 50,
  },
});

export default CaptainSignin;
