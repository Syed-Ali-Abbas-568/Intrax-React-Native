import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.textStyle}>SignIn</Text>

        <View style={styles.horRule} />

        <View style={styles.authStyle}>
          <TouchableOpacity style={[styles.button, { minWidth: 150 }]}>
            <Text style={styles.buttonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { minWidth: 150 }]}>
            <Text style={styles.buttonText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.horRule} />


        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.inputStyle} placeholder="Email" />
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputStyle}>
          <TextInput
            secureTextEntry={!showPassword}
            placeholder="Enter Password"
            style={{flex:1}}
          />
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#aaa"
            onPress={toggleShowPassword}
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
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
    justifyContent:'space-between'

  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 30,
    minWidth: 280,
    marginBottom: 20,
  },
  horRule: {
    borderBottomColor: "#667080",
    borderBottomWidth: 2,
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
  authStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
