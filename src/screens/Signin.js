import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';
import { loginUser } from "../services/api";

export default Signup = ({ navigation }) => {
  const route = useRoute();
  const { phoneNumber } = route.params;
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onValueChange = (text) => {
    setPassword(text);

  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginUserDetails = async () => {
    try {
      const response = await loginUser(phoneNumber, password);

      if (response.message === "User Found") {
        navigation.reset({
          index: 0,
          routes: [{ name: 'RoutePlanner', params: { responseData: response } }],
        })


      }
      else {
        setError("Phone or Password is incorrect.")
      }

    }
    catch {
      console.log('Something is wrong.')

    }


  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Text style={styles.textStyle}>SignIn</Text>



          <Text style={styles.label}>Password</Text>
          <View style={styles.inputStyle}>
            <TextInput
              value={password}
              secureTextEntry={!showPassword}
              placeholder="Enter Password"
              style={{ flex: 1 }}
              onChangeText={(text) => onValueChange(text)}
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
              onPress={toggleShowPassword}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={loginUserDetails}>
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
