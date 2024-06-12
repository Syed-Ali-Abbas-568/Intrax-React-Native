
import axios from "axios";

const URL = 'http://192.168.0.112:8001';

export const addUser = async (newUserData) => {
  console.log('i am called');
  try {
    const response = await axios.post(`${URL}/user/add`, newUserData);
    return response.status; // Return the data from the response instead of status alone

  } catch (error) {
    console.error('Error adding user:', error);
    throw error.response.data
    // Rethrow the error to handle it in the calling code
  }
};


export const findUser = async (phoneNumber) => {
  try {

    const response = await axios.get(`${URL}/user/find`, {
      params: { phone: phoneNumber },
      withCredentials: true
    });

    return response.data.message;  // Assuming the server responds with data
  } catch (error) {
    //console.error("Error while calling findUserByPhoneNumber API ", error.message);
    return "Not Found"
  }
};

export const loginUser = async (phoneNumber, password) => {
  try {

    const response = await axios.get(`${URL}/user/login`, {
      params: {
        phone: phoneNumber,
        password: password
      },
      withCredentials: true
    });
    console.log(response.data.message)
    return response.data;  // Assuming the server responds with data
  } catch (error) {
    //console.error("Error while calling findUserByPhoneNumber API ", error.message);
    return "Not Found"
  }
};







export const addFeedBack = async (newFeedback) => {

  try {
    const response = await axios.post(`${URL}/feedback/add`, newFeedback);
    return response.data; // Return the data from the response instead of status alone

  } catch (error) {
    console.error('Error adding feedback:', error);
    throw error.response.data
    // Rethrow the error to handle it in the calling code
  }
};