import React,{useState} from 'react'
import {View,Text,Button,StyleSheet,Image,TextInput,TouchableOpacity,ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StarRating from '../components/StarRating';




export default Feedback = ({navigation}) => {


  return (
    <ScrollView style={{backgroundColor:'#FFFFFF'}}>
    <SafeAreaView style={styles.constainerStyle}>
    <Text style={styles.feedbackStyle}>Feedback</Text>
    <Text style={styles.reachDestinationStyle}>Reached the Destination Stop!</Text>
    <Image source={require("../../assets/feedback.png")} style={[{alignSelf:'center'},{marginBottom:20}]}></Image>
    <Text style={styles.giveYourfeedbackStyle}>Give your Feedback</Text>
    <TextInput style={styles.inputStyle}></TextInput>
   
 
  </SafeAreaView>
<StarRating/>
<TouchableOpacity style={[styles.button, { minWidth: 150 }]} onPress={()=>navigation.reset({
 index: 0,
 routes: [{ name: 'RoutePlanner' }],
 })}>
            <Text style={styles.buttonText}>Submit</Text>
</TouchableOpacity>
</ScrollView>
 
  )
}

const styles=StyleSheet.create({
    constainerStyle:{
        justifyContent:'flex-start',
        alignItems:'center',
        

    },
    feedbackStyle:{    
    color:'#352555',
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 40,
    marginTop:10
},
reachDestinationStyle:{
    color:'#40B59F',
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 20,
    marginTop:10
},
giveYourfeedbackStyle:{
    color:'#352555',
    fontWeight: "700",
    fontSize: 13,
    marginBottom: 20,
    marginTop:10,
    alignSelf:'flex-start',
    paddingLeft:'10%'
},
inputStyle: {
    borderWidth: 1,
    borderColor: "#667080",
    minWidth: 280,
    paddingHorizontal: 13,
    paddingVertical: 13,
    borderRadius: 6,
    marginBottom: 18,
    height:'10%',
    width:'80%'

  },
  button: {
    backgroundColor: "#40B59F",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width:"80%",
    marginLeft:"10%",
    marginBottom:'10%'
  },
  buttonText: {
    color: "white",
  },



})


