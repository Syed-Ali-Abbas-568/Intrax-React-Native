import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addUser } from "../services/api";
import Icon from 'react-native-vector-icons/MaterialIcons';


export default Signup = ({route}) => {

  const { phoneNumber } = route.params;
  console.log("This is No.2",phoneNumber)

  const [user, setUser] = useState({ name: '', email: '', phone:phoneNumber,gender:'',password: '' });

  const onValueChange = (name, value) => {
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    console.log(user); 
  };
  
  const addUserDetails = async () => {
    try{
      const responseStatus=await addUser(user);
      if(responseStatus===201){
        navigation.reset({
          index: 0,
          routes: [{ name: 'RoutePlanner' }],
          })
        console.log(`Client ${user.name}  has been successfully added.`)
  
      }
      
    }
    catch{
      console.log('Error adding user')
    }
    

  };
  const onGenderChange = (value) => {
    setUser((prevUser) => ({ ...prevUser, gender: value }));
    console.log(user);
  };

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.textStyle}>SignUp</Text>

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

        <Text style={styles.label}>User Name</Text>
        <TextInput style={styles.inputStyle} placeholder="User Name"  onChangeText={(text) => onValueChange('name', text)}  />
        <Text style={styles.label} >Email</Text>
        <TextInput style={styles.inputStyle} placeholder="Email"   onChangeText={(text) => onValueChange('email', text)} />
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputStyle}>
          <TextInput
            secureTextEntry={!showPassword}
            placeholder="Enter Password"
            style={{flex:1}}
            onChangeText={(text) => onValueChange('password', text)}
          />
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#aaa"
            onPress={toggleShowPassword}
          />
        </View>
       
      <Text style={styles.label}>Gender</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity style={styles.radioButton} onPress={() => onGenderChange('M')}>
          <Icon
            name={user.gender === 'M' ? 'radio-button-checked' : 'radio-button-unchecked'}
            size={24}
            color="black"
          />
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.radioButton} onPress={() => onGenderChange('F')}>
          <Icon
            name={user.gender === 'F' ? 'radio-button-checked' : 'radio-button-unchecked'}
            size={24}
            color="black"
          />
          <Text>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.radioButton} onPress={() => onGenderChange('NS')}>
          <Icon
            name={user.gender === 'NS' ? 'radio-button-checked' : 'radio-button-unchecked'}
            size={24}
            color="black"
          />
          <Text>Not Say</Text>
        </TouchableOpacity>
      </View>
    

        <TouchableOpacity style={styles.button} onPress={addUserDetails}>
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
    marginTop:"5%"
  },
  buttonText: {
    color: "white",
  },
  authStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

});
