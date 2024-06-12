import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StarRating from '../components/StarRating';

import { useRoute } from '@react-navigation/native';

import { addFeedBack } from '../services/api';


export default Feedback = ({ navigation }) => {

  const route = useRoute();
  const { responseData } = route.params;



  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0); // Initialize rating state


  const handleSubmit = async () => {
    try {
      const name = responseData.user.name;
      const email = responseData.user.email;

      // Construct feedback object
      const feedbackData = {
        name,
        email,
        feedback,
        rating
      };

      console.log(feedbackData)

      // Call API to submit feedback
      await addFeedBack(feedbackData);

      // Reset navigation to RoutePlanner screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'RoutePlanner', params: { responseData: responseData } }],
      });
    } catch (error) {
      Alert.alert("Error Submitting Feedback!");
    }
  }


  return (
    <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
      <SafeAreaView style={styles.constainerStyle}>
        <Text style={styles.feedbackStyle}>Feedback</Text>
        <Text style={styles.reachDestinationStyle}>Reached the Destination Stop!</Text>
        <Image source={require("../../assets/feedback.png")} style={[{ alignSelf: 'center' }, { marginBottom: 20 }]}></Image>
        <Text style={styles.giveYourfeedbackStyle}>Give your Feedback</Text>
        <TextInput
          style={styles.inputStyle}
          multiline
          numberOfLines={4}
          placeholder="Enter your feedback"
          value={feedback}
          onChangeText={text => setFeedback(text)}
        />


      </SafeAreaView>
      <StarRating rating={rating}
        onChangeRating={setRating} />
      <TouchableOpacity style={[styles.button, { minWidth: 150 }]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  constainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',


  },
  feedbackStyle: {
    color: '#352555',
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 40,
    marginTop: 10
  },
  reachDestinationStyle: {
    color: '#40B59F',
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10
  },
  giveYourfeedbackStyle: {
    color: '#352555',
    fontWeight: "700",
    fontSize: 13,
    marginBottom: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingLeft: '10%'
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#667080",
    minWidth: 280,
    paddingHorizontal: 13,
    paddingVertical: 13,
    borderRadius: 6,
    marginBottom: 18,
    height: '10%',
    width: '80%'

  },
  button: {
    backgroundColor: "#40B59F",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: "80%",
    marginLeft: "10%",
    marginBottom: '10%'
  },
  buttonText: {
    color: "white",
  },



})


