import React from 'react';
import { View, Alert,StyleSheet,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Logout = ({navigation}) => {
  const handleLogout = () => {
    // Display an alert for confirmation
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
           navigation.reset({
                index: 0,
                routes: [{ name: 'Role' }],
                })
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
   
      <Ionicons name="exit"  size={35} color="#40B59F" onPress={handleLogout} />
      <Text style={[{fontWeight:"700"},{fontStyle:"normal"}]}>Log Out</Text>
    </View>
  );
};
const styles=StyleSheet.create({

    container:{
    flexDirecion:'row',
    justifyContent: "center",
    alignItems: "center",
    marginBottom:20
}
})

export default Logout;
